"use client";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useStudentStore } from "../../store/studentStore";
import { GraduationCap, User, UserCircle } from "lucide-react";
import StudentReceipt from "./StudentReceipt";

const StudentManagement = () => {
  const {
    students,
    fetchStudents,
    createStudent,
    deleteStudent,
    loading,
    error,
  } = useStudentStore();

  const [formData, setFormData] = useState({
    studentName: "",
    fatherName: "",
    motherName: "",
    contactNo: "",
    dateOfBirth: "",
    sex: "",
    profilePic: "",
    address: { villPara: "", po: "", ps: "" },
    courseDetails: {
      courseName: "",
      coursePeriod: "",
      dateOfAdmission: "",
      courseFees: "",
      regFees: "",
    },
  });
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showStudent, setShowStudent] = useState(null);
  const [showReceipt, setShowReceipt] = useState(false);

  const handlePrint = (student) => {
    setSelectedStudent(student);
    setShowReceipt(true);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Handle nested fields
    if (name.startsWith("address.")) {
      const field = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        address: { ...prev.address, [field]: value },
      }));
    } else if (name.startsWith("courseDetails.")) {
      const field = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        courseDetails: { ...prev.courseDetails, [field]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createStudent(formData);
      toast.success("Student added successfully!");
      setFormData({
        studentName: "",
        fatherName: "",
        motherName: "",
        contactNo: "",
        dateOfBirth: "",
        sex: "",
        address: { villPara: "", po: "", ps: "" },
        courseDetails: {
          courseName: "",
          coursePeriod: "",
          dateOfAdmission: "",
          courseFees: "",
          regFees: "",
        },
      });
      setIsModalOpen(false);
    } catch (err) {
      toast.error("Failed to create student");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      await deleteStudent(id);
      toast.success("Student deleted!");
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl flex items-center justify-center gap-2 font-bold">
          <GraduationCap size={30} /> Student Management
        </h1>
        <button
          className="btn btn-primary"
          onClick={() => setIsModalOpen(true)}
        >
          + Add Student
        </button>
      </div>

      {/* Student Table */}
      <div className="overflow-x-auto shadow-sm rounded-lg border border-base-300 mt-6">
        <table className="table table-zebra w-full">
          <thead>
            <tr className="bg-primary text-primary-content">
              <th>#</th>
              <th>Profile</th>
              <th>Name & Gender</th>
              <th>Contact</th>
              <th>Address</th>
              <th>Course</th>
              <th>Fees</th>
              <th>Admission</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="9" className="text-center py-4">
                  <span className="loading loading-spinner text-primary"></span>
                </td>
              </tr>
            ) : students.length > 0 ? (
              students.map((student, index) => (
                <tr
                  key={student._id}
                  className="hover:bg-base-200 transition-colors duration-150"
                >
                  <td className="font-semibold">{index + 1}</td>

                  {/* Profile Pic */}
                  <td>
                    <div className="avatar">
                      <div className="w-12 h-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                        {student.profilePic ? (
                          <img
                            src={student.profilePic}
                            alt={student.studentName}
                            className="w-12 h-12 rounded-full"
                          />
                        ) : (
                          <UserCircle className="text-gray-400" size={48} />
                        )}
                      </div>
                    </div>
                  </td>

                  {/* Name + Gender */}
                  <td>
                    <div className="flex flex-col">
                      <span className="font-semibold text-base">
                        {student.studentName}
                      </span>
                      <span className="text-sm text-gray-500">
                        {student.sex || "—"}
                      </span>
                    </div>
                  </td>

                  {/* Contact */}
                  <td>
                    <div className="flex flex-col">
                      <span>{student.contactNo}</span>
                      <span className="text-xs text-gray-500">
                        DOB:{" "}
                        {new Date(student.dateOfBirth).toLocaleDateString(
                          "en-IN"
                        )}
                      </span>
                    </div>
                  </td>

                  {/* Address */}
                  <td>
                    <div
                      className="tooltip"
                      data-tip={`${student.address.po}, ${student.address.ps}`}
                    >
                      <span className="truncate max-w-[120px] block">
                        {student.address.villPara || "—"}
                      </span>
                    </div>
                  </td>

                  {/* Course */}
                  <td>
                    <div className="flex flex-col">
                      <span className="font-medium text-sm">
                        {student.courseDetails?.courseName}
                      </span>
                      <span className="text-xs text-gray-500">
                        {student.courseDetails?.coursePeriod || ""}
                      </span>
                    </div>
                  </td>

                  {/* Fees */}
                  <td>
                    <div className="flex flex-col">
                      <span>₹ {student.courseDetails?.courseFees}</span>
                      <span className="text-xs text-gray-500">
                        Reg: ₹ {student.courseDetails?.regFees}
                      </span>
                    </div>
                  </td>

                  {/* Admission Date */}
                  <td>
                    {new Date(
                      student.courseDetails?.dateOfAdmission
                    ).toLocaleDateString("en-IN")}
                  </td>

                  {/* Actions */}
                  <td>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleDelete(student._id)}
                        className="btn btn-xs btn-outline btn-error"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => handlePrint(student)}
                        className="btn btn-xs btn-outline btn-success"
                      >
                        Print
                      </button>
                      <button
                        onClick={() => setShowStudent(student)}
                        className="btn btn-xs btn-outline btn-primary"
                      >
                        View
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="text-center py-6 text-gray-500">
                  No students found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <dialog open className="modal modal-bottom sm:modal-middle">
          <form
            onSubmit={handleSubmit}
            className="modal-box max-w-6xl bg-base-100 shadow-xl rounded-2xl p-6"
          >
            <h3 className="text-2xl font-bold text-center mb-6 text-primary">
              🎓 Register New Student
            </h3>

            {/* Profile Section */}
            <div className="flex flex-col md:flex-row items-center gap-6 mb-6 bg-base-200 p-4 rounded-lg">
              <div className="avatar">
                <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  {formData.profilePic ? (
                    <img src={formData.profilePic} alt="Profile preview" />
                  ) : (
                    <UserCircle className="text-gray-400" size={96} />
                  )}
                </div>
              </div>

              <div className="flex flex-col items-center md:items-start gap-3">
                <label className="font-semibold text-sm text-gray-600">
                  Upload Profile Picture
                </label>
                <input
                  type="file"
                  accept="image/*"
                  className="file-input file-input-bordered file-input-primary w-full max-w-xs"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setFormData((prev) => ({
                          ...prev,
                          profilePic: reader.result,
                        }));
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </div>
            </div>

            {/* Personal Details */}
            <div className="bg-base-200 p-4 rounded-lg mb-6">
              <h4 className="text-lg font-semibold mb-4 border-b border-base-300 pb-2">
                👤 Personal Details
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="studentName"
                  placeholder="Student Name"
                  value={formData.studentName}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  required
                />
                <input
                  type="text"
                  name="fatherName"
                  placeholder="Father's Name"
                  value={formData.fatherName}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  required
                />
                <input
                  type="text"
                  name="motherName"
                  placeholder="Mother's Name"
                  value={formData.motherName}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  required
                />
                <input
                  type="text"
                  name="contactNo"
                  placeholder="Contact No."
                  value={formData.contactNo}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  required
                />

                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  required
                />

                <select
                  name="sex"
                  value={formData.sex}
                  onChange={handleChange}
                  className="select select-bordered w-full"
                  required
                >
                  <option value="">Select Gender</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>
            </div>

            {/* Address Section */}
            <div className="bg-base-200 p-4 rounded-lg mb-6">
              <h4 className="text-lg font-semibold mb-4 border-b border-base-300 pb-2">
                🏡 Address Details
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                  type="text"
                  name="address.villPara"
                  placeholder="Village/Para"
                  value={formData.address.villPara}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                />
                <input
                  type="text"
                  name="address.po"
                  placeholder="Post Office"
                  value={formData.address.po}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                />
                <input
                  type="text"
                  name="address.ps"
                  placeholder="Police Station"
                  value={formData.address.ps}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                />
              </div>
            </div>

            {/* Course Section */}
            <div className="bg-base-200 p-4 rounded-lg mb-6">
              <h4 className="text-lg font-semibold mb-4 border-b border-base-300 pb-2">
                📘 Course Details
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="courseDetails.courseName"
                  placeholder="Course Name"
                  value={formData.courseDetails.courseName}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  required
                />
                <input
                  type="text"
                  name="courseDetails.coursePeriod"
                  placeholder="Course Period"
                  value={formData.courseDetails.coursePeriod}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                />
                <input
                  type="date"
                  name="courseDetails.dateOfAdmission"
                  value={formData.courseDetails.dateOfAdmission}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  required
                />
                <input
                  type="number"
                  name="courseDetails.courseFees"
                  placeholder="Course Fees"
                  value={formData.courseDetails.courseFees}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  required
                />
                <input
                  type="number"
                  name="courseDetails.regFees"
                  placeholder="Registration Fees"
                  value={formData.courseDetails.regFees}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  required
                />
              </div>
            </div>

            {/* Actions */}
            <div className="modal-action flex justify-between">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="btn btn-outline"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary px-6 text-white hover:scale-105 transition-transform"
              >
                💾 Save Student
              </button>
            </div>
          </form>
        </dialog>
      )}
      {showStudent && (
        <dialog open className="modal modal-bottom sm:modal-middle">
          <div className="modal-box bg-base-100 rounded-2xl shadow-2xl border border-base-300 max-w-4xl">
            {/* Header */}
            <div className="flex justify-between items-center mb-4 border-b border-base-300 pb-2">
              <h3 className="text-2xl font-bold text-primary flex items-center gap-2">
                <GraduationCap className="text-primary" size={26} />
                {showStudent.studentName}
              </h3>
              <button
                className="btn btn-sm btn-circle btn-ghost"
                onClick={() => setShowStudent(null)}
              >
                ✕
              </button>
            </div>

            {/* Main Content */}
            <div className="flex flex-col md:flex-row gap-8">
              {/* Left: Profile Section */}
              <div className="flex flex-col items-center md:items-start gap-3 bg-base-200 p-4 rounded-xl w-full md:w-1/3">
                <div className="avatar self-center">
                  <div className="w-32 h-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 overflow-hidden">
                    <img
                      src={
                        showStudent.profilePic ||
                        "https://via.placeholder.com/150?text=No+Image"
                      }
                      alt={showStudent.studentName}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>

                <div className="text-center md:text-left space-y-1">
                  <h4 className="text-lg font-semibold">
                    {showStudent.studentName}
                  </h4>
                  <p className="text-sm text-gray-500">{showStudent.sex}</p>
                  <p className="text-sm text-gray-500">
                    DOB:{" "}
                    {new Date(showStudent.dateOfBirth).toLocaleDateString(
                      "en-IN"
                    )}
                  </p>
                  <p className="text-sm font-medium text-primary">
                    📞 {showStudent.contactNo}
                  </p>
                </div>
              </div>

              {/* Right: Details Section */}
              <div className="flex-1 space-y-6">
                {/* Personal Details */}
                <div className="bg-base-200 p-4 rounded-xl">
                  <h4 className="font-semibold text-lg mb-2 flex items-center gap-2">
                    👤 Personal Details
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                    <p>
                      <b>Father:</b> {showStudent.fatherName}
                    </p>
                    <p>
                      <b>Mother:</b> {showStudent.motherName}
                    </p>
                    <p>
                      <b>Gender:</b> {showStudent.sex}
                    </p>
                    <p>
                      <b>DOB:</b>{" "}
                      {new Date(showStudent.dateOfBirth).toLocaleDateString(
                        "en-IN"
                      )}
                    </p>
                    <p className="col-span-2">
                      <b>Contact:</b> {showStudent.contactNo}
                    </p>
                  </div>
                </div>

                {/* Address */}
                <div className="bg-base-200 p-4 rounded-xl">
                  <h4 className="font-semibold text-lg mb-2 flex items-center gap-2">
                    🏡 Address
                  </h4>
                  <p className="text-sm text-gray-700">
                    {showStudent.address.villPara}, {showStudent.address.po},{" "}
                    {showStudent.address.ps}
                  </p>
                </div>

                {/* Course Details */}
                <div className="bg-base-200 p-4 rounded-xl">
                  <h4 className="font-semibold text-lg mb-2 flex items-center gap-2">
                    🎓 Course Details
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                    <p>
                      <b>Course:</b> {showStudent.courseDetails.courseName}
                    </p>
                    <p>
                      <b>Period:</b> {showStudent.courseDetails.coursePeriod}
                    </p>
                    <p>
                      <b>Admission Date:</b>{" "}
                      {new Date(
                        showStudent.courseDetails.dateOfAdmission
                      ).toLocaleDateString("en-IN")}
                    </p>
                    <p>
                      <b>Course Fees:</b> ₹
                      {showStudent.courseDetails.courseFees}
                    </p>
                    <p>
                      <b>Reg. Fees:</b> ₹{showStudent.courseDetails.regFees}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="modal-action mt-6 flex justify-end">
              <button
                onClick={() => setShowStudent(null)}
                className="btn btn-primary px-6 text-white hover:scale-105 transition-transform"
              >
                Close
              </button>
            </div>
          </div>
        </dialog>
      )}

      {showReceipt && (
        <StudentReceipt
          student={selectedStudent}
          onClose={() => setShowReceipt(false)}
        />
      )}
    </div>
  );
};

export default StudentManagement;

"use client";
import React, { useState } from "react";
import { axiosInstance } from "../lib/axois";
import { toast } from "react-hot-toast";

const StudentRegister = () => {
  const [formData, setFormData] = useState({
    studentName: "",
    fatherName: "",
    motherName: "",
    contactNo: "",
    dateOfBirth: "",
    sex: "",
    villPara: "",
    po: "",
    ps: "",
    courseName: "",
    coursePeriod: "",
    dateOfAdmission: "",
    courseFees: "",
    regFees: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axiosInstance.post("/auth/student/register", formData, {
        withCredentials: true,
      });
      toast.success(res.data?.message || "Student details submitted successfully!");
      console.log(res.data);
      setFormData({
        studentName: "",
        fatherName: "",
        motherName: "",
        contactNo: "",
        dateOfBirth: "",
        sex: "",
        villPara: "",
        po: "",
        ps: "",
        courseName: "",
        coursePeriod: "",
        dateOfAdmission: "",
        courseFees: "",
        regFees: "",
      });
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Submission failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen w-full grid place-items-center bg-base-300 pt-20">
      <div className="max-w-5xl mx-auto p-6 bg-base-200 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6">
          Student Registration
        </h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* PERSONAL DETAILS */}
          <section>
            <h2 className="text-xl font-semibold mb-4">Personal Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                name="studentName"
                placeholder="Student Name"
                value={formData.studentName}
                onChange={handleChange}
                className="input input-bordered w-full"
                required
              />
              <input
                name="fatherName"
                placeholder="Father's Name"
                value={formData.fatherName}
                onChange={handleChange}
                className="input input-bordered w-full"
                required
              />
              <input
                name="motherName"
                placeholder="Mother's Name"
                value={formData.motherName}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
              <input
                name="contactNo"
                placeholder="Contact No."
                value={formData.contactNo}
                onChange={handleChange}
                className="input input-bordered w-full"
                required
              />
              <input
                name="dateOfBirth"
                type="date"
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
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </section>

          {/* ADDRESS DETAILS */}
          <section>
            <h2 className="text-xl font-semibold mb-4">Address Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                name="villPara"
                placeholder="Village / Para"
                value={formData.villPara}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
              <input
                name="po"
                placeholder="Post Office"
                value={formData.po}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
              <input
                name="ps"
                placeholder="Police Station"
                value={formData.ps}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
            </div>
          </section>

          {/* COURSE DETAILS */}
          <section>
            <h2 className="text-xl font-semibold mb-4">Course Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                name="courseName"
                placeholder="Course Name"
                value={formData.courseName}
                onChange={handleChange}
                className="input input-bordered w-full"
                required
              />
              <input
                name="coursePeriod"
                placeholder="Course Period"
                value={formData.coursePeriod}
                onChange={handleChange}
                className="input input-bordered w-full"
                required
              />
              <input
                name="dateOfAdmission"
                type="date"
                value={formData.dateOfAdmission}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
              <input
                name="courseFees"
                placeholder="Course Fees"
                value={formData.courseFees}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
              <input
                name="regFees"
                placeholder="Registration Fees"
                value={formData.regFees}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
            </div>
          </section>

          {/* SUBMIT BUTTON */}
          <div className="text-center mt-8">
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-1/2"
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default StudentRegister;

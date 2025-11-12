import React, { useRef } from "react";

const StudentReceipt = ({ student, onClose }) => {
  const printRef = useRef();

  const handlePrint = () => {
    window.print();
  };

  if (!student) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 print:bg-white">
      <div
        ref={printRef}
        className="print-area bg-white p-8 rounded-xl shadow-xl max-w-lg w-full"
      >
        {/* Header */}
        <div className="text-center border-b-2 border-primary pb-3 mb-4">
          <h1 className="text-2xl font-bold text-primary uppercase">
            Anjusa Art & Computer Academy
          </h1>
          <p className="text-sm text-gray-600">Official Admission Receipt</p>
        </div>

        {/* Student Info */}
        <div className="flex justify-between items-start mb-6">
          <div className="text-sm space-y-1">
            <p>
              <span className="font-semibold">Name:</span> {student.studentName}
            </p>
            <p>
              <span className="font-semibold">Father’s Name:</span>{" "}
              {student.fatherName}
            </p>
            <p>
              <span className="font-semibold">Mother’s Name:</span>{" "}
              {student.motherName}
            </p>
            <p>
              <span className="font-semibold">Gender:</span> {student.sex}
            </p>
            <p>
              <span className="font-semibold">Date of Birth:</span>{" "}
              {new Date(student.dateOfBirth).toLocaleDateString()}
            </p>
          </div>
          <div className="avatar">
            <div className="w-24 rounded-md ring ring-primary ring-offset-base-100 ring-offset-2">
              <img
                src={
                  student.profilePic ||
                  "https://via.placeholder.com/100?text=Photo"
                }
                alt="Student"
              />
            </div>
          </div>
        </div>

        {/* Address */}
        <div className="mb-6">
          <h3 className="font-semibold border-b border-base-300 pb-1 mb-2">
            Address
          </h3>
          <p className="text-sm">
            {student.address?.villPara}, P.O. {student.address?.po}, P.S.{" "}
            {student.address?.ps}
          </p>
        </div>

        {/* Course Details */}
        <div className="mb-6">
          <h3 className="font-semibold border-b border-base-300 pb-1 mb-2">
            Course Details
          </h3>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <p>
              <span className="font-semibold">Course Name:</span>{" "}
              {student.courseDetails?.courseName}
            </p>
            <p>
              <span className="font-semibold">Admission Date:</span>{" "}
              {new Date(
                student.courseDetails?.dateOfAdmission
              ).toLocaleDateString()}
            </p>
            <p>
              <span className="font-semibold">Course Period:</span>{" "}
              {student.courseDetails?.coursePeriod}
            </p>
            <p>
              <span className="font-semibold">Course Fees:</span> ₹{" "}
              {student.courseDetails?.courseFees}
            </p>
            <p>
              <span className="font-semibold">Registration Fees:</span> ₹{" "}
              {student.courseDetails?.regFees}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-base-300 pt-4 text-sm flex justify-between">
          <p>Date: {new Date().toLocaleDateString()}</p>
          <p className="font-semibold">Authorized Signature</p>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-6 print:hidden">
          <button onClick={handlePrint} className="btn btn-primary btn-sm">
            🖨️ Print
          </button>
          <button onClick={onClose} className="btn btn-outline btn-sm">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentReceipt;

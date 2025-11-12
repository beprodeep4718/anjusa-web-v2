import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  profilePic: {
    type: String,
    trim: true,
  },
  studentName: {
    type: String,
    required: true,
    trim: true,
  },
  fatherName: {
    type: String,
    required: true,
    trim: true,
  },
  motherName: {
    type: String,
    required: true,
    trim: true,
  },
  contactNo: {
    type: String,
    required: true,
    trim: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  sex: {
    type: String,
    enum: ["Male", "Female", "Other"],
    required: true,
  },
  address: {
    villPara: { type: String, required: true, trim: true },
    po: { type: String, required: true, trim: true },
    ps: { type: String, required: true, trim: true },
  },
  courseDetails: {
    courseName: { type: String, required: true, trim: true },
    coursePeriod: { type: String, trim: true },
    dateOfAdmission: { type: Date, required: true },
    courseFees: { type: Number, required: true },
    regFees: { type: Number, required: true },
    date: { type: Date, default: Date.now },
  },
});

export default mongoose.model("Student", studentSchema);

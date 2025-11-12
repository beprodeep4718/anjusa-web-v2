import cloudinary from "../config/cloudinary.js";
import Student from "../models/student.model.js";

/* -------------------- CREATE STUDENT -------------------- */
export const createStudent = async (req, res) => {
  try {
    const {
      studentName,
      fatherName,
      motherName,
      contactNo,
      dateOfBirth,
      sex,
      address,
      courseDetails,
      profilePic
    } = req.body;

    if (!studentName || !fatherName || !motherName || !contactNo || !dateOfBirth || !sex) {
      return res.status(400).json({ message: "Missing required personal details." });
    }

    if (!address || !address.villPara || !address.po || !address.ps) {
      return res.status(400).json({ message: "Incomplete address details." });
    }

    if (
      !courseDetails ||
      !courseDetails.courseName ||
      !courseDetails.dateOfAdmission ||
      !courseDetails.courseFees ||
      !courseDetails.regFees
    ) {
      return res.status(400).json({ message: "Incomplete course details." });
    }
    let profileImageUrl = "";
    if (profilePic && profilePic.startsWith("data:image")) {
      const uploadResponse = await cloudinary.uploader.upload(profilePic, {
        folder: "anjusa/students",
      });
      profileImageUrl = uploadResponse.secure_url;
    } else if (profilePic && profilePic.startsWith("https://res.cloudinary.com")) {
      // Already uploaded via Cloudinary widget
      profileImageUrl = profilePic;
    }

    const student = new Student({
      studentName,
      fatherName,
      motherName,
      contactNo,
      dateOfBirth,
      profilePic: profileImageUrl,
      sex,
      address,
      courseDetails,
    });

    await student.save();
    res.status(201).json({ message: "Student registered successfully.", student });
  } catch (error) {
    console.error("Error creating student:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

/* -------------------- READ ALL STUDENTS -------------------- */
export const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find().sort({ "courseDetails.dateOfAdmission": -1 });
    res.status(200).json(students);
  } catch (error) {
    console.error("Fetch Error:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

/* -------------------- READ SINGLE STUDENT -------------------- */
export const getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.status(200).json(student);
  } catch (error) {
    console.error("Fetch One Error:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

/* -------------------- UPDATE STUDENT -------------------- */
export const updateStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.status(200).json({ message: "Student updated successfully", student });
  } catch (error) {
    console.error("Update Error:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

/* -------------------- DELETE STUDENT -------------------- */
export const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    console.error("Delete Error:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

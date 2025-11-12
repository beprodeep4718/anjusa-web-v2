import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { username, password, email, phone, role } = req.body;
  try {
    const user = new User({
      username,
      password,
      email,
      phone,
      role: role || "user",
    });
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    if (!username || !password || !email || !phone) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long" });
    }
    await user.save();
    res
      .status(201)
      .json({
        message: "User created",
        user: {
          username: user.username,
          email: user.email,
          phone: user.phone,
          role: user.role,
        },
      });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });
    const isMatch = await user.comparePassword(password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });
    res.json({
      token,
      user: {
        username: user.username,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "none",
  });
  res.json({ message: "Logged out successfully" });
};

export const studentRegister = async (req, res) => {
  try {
    const {
      studentName,
      fatherName,
      motherName,
      contactNo,
      dateOfBirth,
      sex,
      villPara,
      po,
      ps,
      courseName,
      coursePeriod,
      dateOfAdmission,
      courseFees,
      regFees,
    } = req.body;

    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.profile = {
      studentName,
      fatherName,
      motherName,
      contactNo,
      dateOfBirth,
      sex,
      address: { villPara, po, ps },
      courseDetails: {
        courseName,
        coursePeriod,
        dateOfAdmission,
        courseFees,
        regFees,
      },
    };

    // Role stays 'user' until admin verifies
    user.role = "pending_artist";
    await user.save();

    return res.status(200).json({ message: "Student profile submitted for verification" });
  } catch (error) {
    console.error("Error in studentRegister:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


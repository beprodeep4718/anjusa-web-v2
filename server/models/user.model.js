import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 30
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: /.+\@.+\..+/
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  phone: {
    type: String,
    trim: true,
    match: /^\+?[1-9]\d{1,14}$/
  },
  role: {
    type: String,
    enum: ["admin", "user", "artist", "pending_artist"],
    default: "user"
  },
  profile: {
    studentName: { type: String, trim: true },
    fatherName: { type: String, trim: true },
    motherName: { type: String, trim: true },
    contactNo: { type: String, trim: true },
    dateOfBirth: { type: Date },
    sex: { type: String, enum: ["Male", "Female", "Other"] },

    address: {
      villPara: { type: String, trim: true },
      po: { type: String, trim: true },
      ps: { type: String, trim: true },
    },

    courseDetails: {
      courseName: { type: String, trim: true },
      coursePeriod: { type: String, trim: true },
      dateOfAdmission: { type: Date },
      courseFees: { type: Number },
      regFees: { type: Number },
    },
  },
  artworks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Artwork"
  }],
  isVerified: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare password
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model("User", userSchema);

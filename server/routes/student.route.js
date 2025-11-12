import express from "express";
import {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
} from "../controllers/student.controller.js";

const router = express.Router();
import {authenticate, authorize} from "../middlewares/auth.middleware.js";

// CREATE
router.post("/", authenticate, authorize("admin"), createStudent);

// READ
router.get("/", authenticate, authorize("admin"), getAllStudents);
router.get("/:id", authenticate, authorize("admin"), getStudentById);
// UPDATE
router.put("/:id", authenticate, authorize("admin"), updateStudent);
// DELETE
router.delete("/:id", authenticate, authorize("admin"), deleteStudent);
export default router;

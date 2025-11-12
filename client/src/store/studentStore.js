import { create } from "zustand";
import { axiosInstance } from "../lib/axois";

export const useStudentStore = create((set) => ({
  students: [],
  student: null,
  loading: false,
  error: null,

  // CREATE Student
  createStudent: async (studentData) => {
    set({ loading: true, error: null });
    try {
      const res = await axiosInstance.post("/students", studentData);
      const newStudent = res.data.student;
      set((state) => ({
        students: [...state.students, newStudent],
        loading: false,
      }));
      return newStudent;
    } catch (error) {
      set({
        loading: false,
        error: error.response?.data?.message || "Failed to create student",
      });
      throw error;
    }
  },

  // GET all students
  fetchStudents: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axiosInstance.get("/students");
      set({ students: res.data, loading: false });
    } catch (error) {
      set({
        loading: false,
        error: error.response?.data?.message || "Failed to fetch students",
      });
    }
  },

  // GET single student by ID
  fetchStudentById: async (id) => {
    set({ loading: true, error: null });
    try {
      const res = await axiosInstance.get(`/students/${id}`);
      set({ student: res.data, loading: false });
      return res.data;
    } catch (error) {
      set({
        loading: false,
        error: error.response?.data?.message || "Failed to fetch student",
      });
    }
  },

  // UPDATE student
  updateStudent: async (id, updatedData) => {
    set({ loading: true, error: null });
    try {
      const res = await axiosInstance.put(`/students/${id}`, updatedData);
      const updatedStudent = res.data;
      set((state) => ({
        students: state.students.map((s) =>
          s._id === id ? updatedStudent : s
        ),
        student: updatedStudent,
        loading: false,
      }));
      return updatedStudent;
    } catch (error) {
      set({
        loading: false,
        error: error.response?.data?.message || "Failed to update student",
      });
    }
  },

  // DELETE student
  deleteStudent: async (id) => {
    set({ loading: true, error: null });
    try {
      await axiosInstance.delete(`/students/${id}`);
      set((state) => ({
        students: state.students.filter((s) => s._id !== id),
        loading: false,
      }));
    } catch (error) {
      set({
        loading: false,
        error: error.response?.data?.message || "Failed to delete student",
      });
    }
  },
}));

import { create } from "zustand";
import { axiosInstance } from "../lib/axois";

const useNoticeStore = create((set) => ({
  notices: [],
  isFetchingNotices: false,
  fetchNotices: async () => {
    set({ isFetchingNotices: true });
    try {
      const response = await axiosInstance.get("/notice");
      set({ notices: response.data.notices || [] });
    } catch (error) {
      console.error("Error fetching notices:", error);
    } finally {
      set({ isFetchingNotices: false });
    }
  },
  createNotice: async (noticeData) => {
    set({ isFetchingNotices: true });
    try {
      const response = await axiosInstance.post("/notice", noticeData);
      const newNotice = response.data.notice;
      set((state) => ({
        notices: [...state.notices, newNotice],
      }));
    } catch (error) {
      console.error("Error creating notice:", error);
    } finally {
      set({ isFetchingNotices: false });
    }
  },
  deleteNotice: async (noticeId) => {
    set({ isFetchingNotices: true });
    try {
      await axiosInstance.delete(`/notice/${noticeId}`);
      set((state) => ({
        notices: state.notices.filter((notice) => notice._id !== noticeId),
      }));
    } catch (error) {
      console.error("Error deleting notice:", error);
    } finally {
      set({ isFetchingNotices: false });
    }
  },
  updateNotice: async (noticeId, noticeData) => {
    set({ isFetchingNotices: true });
    try {
      const response = await axiosInstance.put(`/notice/${noticeId}`, noticeData);
      const updatedNotice = response.data.notice;
      set((state) => ({
        notices: state.notices.map((notice) => 
          notice._id === noticeId ? updatedNotice : notice
        ),
      }));
    } catch (error) {
      console.error("Error updating notice:", error);
    } finally {
      set({ isFetchingNotices: false });
    }
  },
}));

export default useNoticeStore;

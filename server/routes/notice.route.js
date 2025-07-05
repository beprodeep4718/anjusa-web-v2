import express from 'express';
const router = express.Router();

import { createNotice, getNotices, updateNotice, deleteNotice } from '../controllers/notice.controller.js';
import { authenticate, authorize } from '../middlewares/auth.middleware.js';

router.post("/", authenticate, authorize("admin"), createNotice);
router.get("/", getNotices);
router.put("/:id", authenticate, authorize("admin"), updateNotice);
router.delete("/:id", authenticate, authorize("admin"), deleteNotice);

export default router;
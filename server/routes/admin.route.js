import express from 'express';
const router = express.Router();
import { authenticate, authorize } from '../middlewares/auth.middleware.js';
import {
  getPendingArtworks,
  approveArtwork,
  rejectArtwork,
  getAllUsers,
  updateUserRole,
  getPendingArtists
} from '../controllers/admin.controller.js';

// GET /artworks/pending - Get pending artworks
router.get('/artworks/pending', authenticate, authorize('admin'), getPendingArtworks);

// PUT /artworks/:id/approve - Approve artwork
router.put('/artworks/:id/approve', authenticate, authorize('admin'), approveArtwork);

// PUT /artworks/:id/reject - Reject artwork
router.put('/artworks/:id/reject', authenticate, authorize('admin'), rejectArtwork);

// GET /users - Get all users
router.get('/users', authenticate, authorize('admin'), getAllUsers);

// GET /users/pending_artist - Get all pending artists
router.get('/users/', authenticate, authorize('admin'), getPendingArtists);

// PUT /users/:id/role - Update user role
router.put('/users/:id/role', authenticate, authorize('admin'), updateUserRole);

export default router;

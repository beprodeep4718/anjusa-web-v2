import express from "express";
const router = express.Router();
import { authenticate, authorize } from "../middlewares/auth.middleware.js";

import {
  getAllApprovedArtworks,
  getArtworksByArtist,
  getSingleArtwork,
  createArtwork,
  updateArtwork,
  deleteArtwork,
} from "../controllers/artwork.controller.js";

// Middleware for authentication/authorization (implement as needed)

// GET / - Get all approved artworks (public)
router.get("/", getAllApprovedArtworks);

// GET /artist/:artistId - Get artworks by artist
router.get("/artist/:artistId", getArtworksByArtist);

// GET /:id - Get single artwork
router.get("/:id", getSingleArtwork);

// POST / - Create artwork (artist only)
router.post("/", authenticate, authorize("artist", "admin"), createArtwork);

// PUT /:id - Update artwork (artist/admin)
router.put("/:id", authenticate, authorize("artist", "admin"), updateArtwork);

// DELETE /:id - Delete artwork (artist/admin)
router.delete(
  "/:id",
  authenticate,
  authorize("artist", "admin"),
  deleteArtwork
);

export default router;

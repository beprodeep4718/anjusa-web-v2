import artworkModel from "../models/artwork.model.js";
import userModel from "../models/user.model.js";
import cloudinary from "../config/cloudinary.js";

export const getAllApprovedArtworks = async (req, res) => {
  try {
    const artworks = await artworkModel.find({ status: "approved" });
    res.status(200).json(artworks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching artworks" });
  }
};

export const getArtworksByArtist = async (req, res) => {
  // Implementation
  const { artistId } = req.params;
  try {
    const artworks = await artworkModel.find({ artist: artistId });
    res.status(200).json(artworks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching artworks by artist" });
  }
};

export const getSingleArtwork = async (req, res) => {
  const { id } = req.params;
  try {
    const artwork = await artworkModel.findById(id);
    if (!artwork) {
      return res.status(404).json({ message: "Artwork not found" });
    }
    res.status(200).json(artwork);
  } catch (error) {
    res.status(500).json({ message: "Error fetching artwork" });
  }
};

export const createArtwork = async (req, res) => {
  const { title, imageUrl, description, price, height, width } = req.body;
  // assign artist from authenticated user first
  const artist = req.user?.id;
  if (!title || !artist || !imageUrl || !description || !price || !height || !width) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const artistExists = await userModel.findById(artist);
  if (!artistExists) {
    return res.status(401).json({ message: "Unauthorized: Artist not found" });
  }
  try {
    // imageUrl may be an external URL or a data URL (data:image/...;base64,...)
    const result = await cloudinary.uploader.upload(imageUrl, {
      folder: "artworks",
    });

    const newArtwork = new artworkModel({
      title,
      artist,
      image: { secureUrl: result.secure_url, publicId: result.public_id },
      description,
      price,
      dimensions: { height, width },
      status: "pending",
    });
    await newArtwork.save();
    await userModel.findByIdAndUpdate(artist, {
      $push: { artworks: newArtwork._id },
    });
    res.status(201).json(newArtwork);
  } catch (error) {
    console.error("Error creating artwork:", error);
    res.status(500).json({ message: "Error creating artwork" });
  }
};

export const updateArtwork = async (req, res) => {
  // Implementation
  const { id } = req.params;
  const { title, description, price, dimensions } = req.body;
  try {
    const updatedArtwork = await artworkModel.findByIdAndUpdate(
      id,
      {
        title,
        description,
        price,
        dimensions,
      },
      { new: true }
    );
    res.status(200).json(updatedArtwork);
  } catch (error) {
    res.status(500).json({ message: "Error updating artwork" });
  }
};

export const deleteArtwork = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedArtwork = await artworkModel.findByIdAndDelete(id);
    if (!deletedArtwork) {
      return res.status(404).json({ message: "Artwork not found" });
    }
    await cloudinary.uploader.destroy(deletedArtwork.image.publicId);
    await userModel.findByIdAndUpdate(deletedArtwork.artist, {
      $pull: { artworks: deletedArtwork._id },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Error deleting artwork" });
  }
};

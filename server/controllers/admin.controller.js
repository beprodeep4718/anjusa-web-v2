import Artwork from '../models/artwork.model.js';
import User from '../models/user.model.js';

export const getPendingArtworks = async (req, res) => {
  try {
    const artworks = await Artwork.find({ status: 'pending' }).populate('artist', 'username email profilePicture');
    res.status(200).json(artworks);
  } catch (error) {
    console.error("Error fetching pending artworks:", error);
    res.status(500).json({ message: 'Error fetching pending artworks' });
  }
};

export const approveArtwork = async (req, res) => {
  const { id } = req.params;
  try {
    const updated = await Artwork.findByIdAndUpdate(id, { status: 'approved' }, { new: true });
    if (!updated) return res.status(404).json({ message: 'Artwork not found' });
    res.status(200).json(updated);
  } catch (error) {
    console.error("Error approving artwork:", error);
    res.status(500).json({ message: 'Error approving artwork' });
  }
};

export const rejectArtwork = async (req, res) => {
  const { id } = req.params;
  const { reason } = req.body;
  try {
    const updated = await Artwork.findByIdAndUpdate(id, { status: 'rejected', rejectionReason: reason || '' }, { new: true });
    if (!updated) return res.status(404).json({ message: 'Artwork not found' });
    res.status(200).json(updated);
  } catch (error) {
    console.error("Error rejecting artwork:", error);
    res.status(500).json({ message: 'Error rejecting artwork' });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password').lean();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: 'Error fetching users' });
  }
};

export const getPendingArtists = async (req, res) => {
  try {
    const users = await User.find({ role: 'pending_artist' }).select('-password').lean();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching pending artists:", error);
    res.status(500).json({ message: 'Error fetching pending artists' });
  }
};

export const updateUserRole = async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;
  if (!role) return res.status(400).json({ message: 'Role is required' });
  try {
    const updated = await User.findByIdAndUpdate(id, { role }, { new: true }).select('-password');
    if (!updated) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(updated);
  } catch (error) {
    console.error("Error updating user role:", error);
    res.status(500).json({ message: 'Error updating user role' });
  }
};
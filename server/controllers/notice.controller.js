import Notice from "../models/notice.model.js";
import cloudinary from "../config/cloudinary.js";

export const createNotice = async (req, res) => {
  try {
    const { title, content, type, priority, status, image } = req.body;
    const noticeData = { 
      title, 
      content,
      type: type || 'general',
      priority: priority || 'medium',
      status: status || 'active'
    };
    
    if (image) {
      try {
        const uploadResponse = await cloudinary.uploader.upload(image, {
          folder: "anjusa/noticesImages",
          resource_type: "image",
        });
        noticeData.image = {
          public_id: uploadResponse.public_id,
          secure_url: uploadResponse.secure_url,
        };
      } catch (uploadError) {
        console.error("Error uploading image to Cloudinary:", uploadError);
        return res.status(400).json({ message: "Image upload failed" });
      }
    }
    
    const newNotice = new Notice(noticeData);
    await newNotice.save();
    res
      .status(201)
      .json({ message: "Notice created successfully", notice: newNotice });
  } catch (error) {
    console.error("Error creating notice:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getNotices = async (req, res) => {
  try {
    const notices = await Notice.find();
    res.status(200).json(notices);
  } catch (error) {
    console.error("Error fetching notices:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateNotice = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, type, priority, status, image } = req.body;
    const updateData = {};
    
    if (title !== undefined) updateData.title = title;
    if (content !== undefined) updateData.content = content;
    if (type !== undefined) updateData.type = type;
    if (priority !== undefined) updateData.priority = priority;
    if (status !== undefined) updateData.status = status;
    if (image !== undefined) updateData.image = image;
    
    const notice = await Notice.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    if (!notice) {
      return res.status(404).json({ message: "Notice not found" });
    }
    res.status(200).json({ message: "Notice updated successfully", notice });
  } catch (error) {
    console.error("Error updating notice:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteNotice = async (req, res) => {
  try {
    const { id } = req.params;
    const notice = await Notice.findByIdAndDelete(id);
    if (notice && notice.image) {
      try {
        await cloudinary.uploader.destroy(notice.image.public_id, {
          resource_type: "image",
        });
      } catch (cloudinaryError) {
        console.error("Error deleting image from Cloudinary:", cloudinaryError);
      }
    }
    if (!notice) {
      return res.status(404).json({ message: "Notice not found" });
    }
    res.status(200).json({ message: "Notice deleted successfully" });
  } catch (error) {
    console.error("Error deleting notice:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

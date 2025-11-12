import React, { useState } from "react";
import { axiosInstance } from "../lib/axois";

const UploadArtworkForm = ({ onSuccess, onCancel }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [height, setHeight] = useState("");
  const [width, setWidth] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // helper to read file as data URL
  const readFileAsDataURL = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (err) => reject(err);
      reader.readAsDataURL(file);
    });

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    if (!title || !description || !price || !height || !width || !file) {
      setError("All fields including an image are required.");
      return;
    }

    try {
      setLoading(true);
      const imageUrl = await readFileAsDataURL(file);
      const payload = {
        title,
        description,
        price,
        height,
        width,
        imageUrl,
      };
      const res = await axiosInstance.post("/artwork", payload);
      if (onSuccess) onSuccess(res.data);
    } catch (err) {
      console.error("Upload failed:", err);
      setError("Upload failed. See console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="bg-base-100 p-6 border rounded-md max-w-2xl">
      <div className="grid grid-cols-2 gap-4">
        <input value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="Title" className="input input-bordered" />
        <input value={price} onChange={(e)=>setPrice(e.target.value)} placeholder="Price" type="number" className="input input-bordered" />
        <input value={height} onChange={(e)=>setHeight(e.target.value)} placeholder="Height" type="number" className="input input-bordered" />
        <input value={width} onChange={(e)=>setWidth(e.target.value)} placeholder="Width" type="number" className="input input-bordered" />
        <textarea value={description} onChange={(e)=>setDescription(e.target.value)} placeholder="Description" className="col-span-2 textarea textarea-bordered"></textarea>
        <input onChange={(e)=>setFile(e.target.files?.[0] || null)} type="file" accept="image/*" className="col-span-2" />
      </div>

      {error && <p className="text-error mt-2">{error}</p>}

      <div className="flex gap-3 mt-4">
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Uploading..." : "Upload Artwork"}
        </button>
        <button type="button" onClick={onCancel} className="btn" disabled={loading}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default UploadArtworkForm;

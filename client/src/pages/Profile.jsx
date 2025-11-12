import React, { useEffect, useState } from "react";
import useAuth from "../store/authStore";
import { Plus } from "lucide-react";
import { axiosInstance } from "../lib/axois";
import UploadArtworkForm from "../components/UploadArtworkForm";

const Profile = () => {
  const { user } = useAuth();
  const [artworks, setArtworks] = useState([]);
  const [loadingArtworks, setLoadingArtworks] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const fetchArtworks = async () => {
    if (!user) return;
    const artistId = user._id || user.id;
    if (!artistId) return;
    setLoadingArtworks(true);
    try {
      const res = await axiosInstance.get(`/artwork/artist/${artistId}`);
      setArtworks(res.data || []);
    } catch (err) {
      console.error("Failed to fetch artworks:", err);
      setArtworks([]);
    } finally {
      setLoadingArtworks(false);
    }
  };

  useEffect(() => {
    fetchArtworks();
  }, [user]);

  return (
    <div className="flex flex-col bg-base-200">
      <div className='h-64 w-full bg-[url("/images/bg-gred.jpg")] bg-cover bg-center flex items-center justify-center'></div>
      <div className="flex items-end mt-[-50px] px-20 gap-10">
        <img
          src={user?.profilePicture || "/images/default-profile.png"}
          alt="Profile"
          className="w-64 h-64  border-4 border-base-100"
        />
        <div className="user-details space-y-2">
          <h1 className="text-5xl font-[playfair-display] italic tracking-wider">
            {user?.username || "User Name"}
          </h1>
          <p className="text-lg text-secondary">
            {user?.email || "user@example.com"}
          </p>
          <p className="text-sm text-secondary">
            Joined on {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "—"}
          </p>
          <p className="text-sm text-secondary">
            Bio: {user?.bio || "This user has not set up a bio."}
          </p>
        </div>
      </div>
      <div className="profile-artworks mt-10 px-20">
        <div className="flex justify-between items-center border-b-[1px] border-base-content pb-4">
          <h2 className="text-3xl font-[inter]">My Artworks</h2>
          <button
            onClick={() => setShowForm(true)}
            className="text-xl flex justify-center items-center gap-2 bg-base-content text-base-300 px-6 py-4"
          >
            <Plus strokeWidth={1} size={24} />
            Add New Artwork
          </button>
        </div>

        <div className="artwork-grid grid grid-cols-3 gap-4 mt-4">
          {loadingArtworks ? (
            <p className="text-secondary">Loading artworks...</p>
          ) : artworks?.length > 0 ? (
            artworks.map((artwork) => (
              <div key={artwork._id} className="artwork-card border p-4">
                <img
                  src={artwork.image?.secureUrl || "/images/default-artwork.png"}
                  alt={artwork.title}
                  className="w-full object-cover"
                />
                <h3 className="text-lg font-semibold mt-2">{artwork.title}</h3>
                <p className="text-sm text-secondary">{artwork.description}</p>
                <p className="text-sm font-medium mt-1">Price: INR:{artwork.price}</p>
                <p className="text-sm text-secondary">Dimensions: {artwork.dimensions.height} x {artwork.dimensions.width}</p>
                {artwork.status === 'pending' && (<p className="text-warning mt-1">Status: Pending Approval</p>
                )}
                {artwork.status === 'approved' && (<p className="text-success mt-1">Status: Approved</p>
                )}
                {artwork.status === 'rejected' && (<p className="text-error mt-1">Status: Rejected</p>
                )}
                <div className="flex justify-between mt-2">
                  <button className="btn btn-secondary">Edit</button>
                  <button className="btn btn-error">Delete</button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-secondary">No artworks found.</p>
          )}
        </div>
      </div>

      {/* DaisyUI modal: controlled via hidden checkbox */}
      <input
        type="checkbox"
        id="upload-modal"
        className="modal-toggle"
        checked={showForm}
        onChange={(e) => setShowForm(e.target.checked)}
      />
      <div className="modal">
        <div className="modal-box max-w-4xl">
          <h3 className="font-bold text-lg mb-2">Upload Artwork</h3>
          <UploadArtworkForm
            onSuccess={() => {
              setShowForm(false);
              fetchArtworks();
            }}
            onCancel={() => setShowForm(false)}
          />
          <div className="modal-action">
            <label htmlFor="upload-modal" className="btn" onClick={() => setShowForm(false)}>
              Close
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

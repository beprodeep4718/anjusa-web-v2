import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../../lib/axois';

const ArtworkManagement = () => {
  const [pending, setPending] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPending = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get('/admin/artworks/pending');
      setPending(res.data || []);
    } catch (err) {
      console.error('Failed to fetch pending artworks:', err);
      setPending([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPending();
  }, []);

  const approve = async (id) => {
    if (!confirm('Approve this artwork?')) return;
    try {
      await axiosInstance.put(`/admin/artworks/${id}/approve`);
      setPending((p) => p.filter((a) => a._id !== id));
    } catch (err) {
      console.error('Approve failed:', err);
      alert('Approve failed');
    }
  };

  const reject = async (id) => {
    const reason = prompt('Optional rejection reason:') || '';
    if (!confirm('Reject this artwork?')) return;
    try {
      await axiosInstance.put(`/admin/artworks/${id}/reject`, { reason });
      setPending((p) => p.filter((a) => a._id !== id));
    } catch (err) {
      console.error('Reject failed:', err);
      alert('Reject failed');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Pending Artworks</h2>
      {loading ? (
        <p>Loading...</p>
      ) : pending.length === 0 ? (
        <p>No pending artworks.</p>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {pending.map((art) => (
            <div key={art._id} className="border p-3 rounded">
              <img src={art.image?.secureUrl || '/images/default-artwork.png'} alt={art.title} className="w-full object-cover mb-2" />
              <h3 className="font-semibold">{art.title}</h3>
              <p className="text-sm text-secondary">{art.description}</p>
              <p className="text-sm mt-1">By: {art.artist?.username || art.artist?.email || 'Unknown'}</p>
              <p className="text-sm mt-1">Price: INR: {art.price?.toFixed(2) || 'N/A'}</p>
              <div className="flex gap-2 mt-3">
                <button className="btn btn-success btn-sm" onClick={() => approve(art._id)}>Approve</button>
                <button className="btn btn-error btn-sm" onClick={() => reject(art._id)}>Reject</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ArtworkManagement;
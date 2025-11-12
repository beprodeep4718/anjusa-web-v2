import React, { useEffect, useState } from 'react' // your configured axios instance
import { axiosInstance } from '../../lib/axois'

const PendingArtists = () => {
  const [artists, setArtists] = useState([])
  const [loading, setLoading] = useState(true)
  const [updatingId, setUpdatingId] = useState(null)

  const fetchPendingArtists = async () => {
    try {
      const res = await axiosInstance.get('/admin/users/pending_artist')
      setArtists(res.data)
    } catch (error) {
      console.error('Error fetching pending artists:', error)
      alert('Failed to fetch pending artists')
    } finally {
      setLoading(false)
    }
  }

  const verifyArtist = async (id) => {
    if (!window.confirm('Mark this artist as verified?')) return
    try {
      setUpdatingId(id)
      await axiosInstance.put(`/admin/users/${id}/role`, { role: 'artist' })
      setArtists((prev) => prev.filter((a) => a._id !== id))
      alert('Artist verified successfully!')
    } catch (error) {
      console.error('Error verifying artist:', error)
      alert('Failed to verify artist')
    } finally {
      setUpdatingId(null)
    }
  }

  useEffect(() => {
    fetchPendingArtists()
  }, [])

  if (loading) return <div className="text-center mt-10">Loading pending artists...</div>

  return (
    <div className="p-6 bg-base-100 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-6">Pending Artist Approvals</h2>

      {artists.length === 0 ? (
        <p className="text-gray-500">No pending artists right now.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Joined</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {artists.map((artist, idx) => (
                <tr key={artist._id}>
                  <td>{idx + 1}</td>
                  <td>{artist.profile.studentName}</td>
                  <td>{artist.email}</td>
                  <td>{new Date(artist.createdAt).toLocaleDateString()}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-success"
                      disabled={updatingId === artist._id}
                      onClick={() => verifyArtist(artist._id)}
                    >
                      {updatingId === artist._id ? 'Verifying...' : 'Verify'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default PendingArtists

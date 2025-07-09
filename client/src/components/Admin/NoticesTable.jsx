import React from 'react'
import { Edit, Trash2, Eye, FileText, Plus, Search } from 'lucide-react'

const NoticesTable = ({ 
  notices, 
  isFetchingNotices, 
  searchQuery, 
  setSearchQuery, 
  setShowCreateModal, 
  setSelectedNotice, 
  handleEditClick, 
  handleDeleteNotice 
}) => {
  const filteredNotices = notices.filter(notice =>
    notice.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    notice.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    notice.type.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold">Manage Notices</h2>
        <div className="flex gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-none">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search notices..."
              className="input input-bordered pl-10 w-full sm:w-64"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button 
            className="btn btn-primary whitespace-nowrap"
            onClick={() => setShowCreateModal(true)}
          >
            <Plus className="w-4 h-4" />
            Create Notice
          </button>
        </div>
      </div>

      {/* Notices Table */}
      <div className="card bg-base-100 shadow">
        <div className="card-body">
          {isFetchingNotices ? (
            <div className="flex justify-center items-center h-40">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="table table-zebra">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Image</th>
                    <th>Type</th>
                    <th>Priority</th>
                    <th>Status</th>
                    <th>Created</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredNotices.map((notice) => (
                    <tr key={notice._id}>
                      <td>
                        <div>
                          <div className="font-bold">{notice.title}</div>
                          <div className="text-sm opacity-50">{notice.content?.substring(0, 50)}...</div>
                        </div>
                      </td>
                      <td>
                        {notice.image && notice.image.secure_url ? (
                          <div className="avatar">
                            <div className="w-12 h-12 rounded cursor-pointer hover:opacity-80 transition-opacity" 
                                 onClick={() => setSelectedNotice(notice)}
                                 title="Click to view full notice">
                              <img 
                                src={notice.image.secure_url} 
                                alt={notice.title}
                                className="object-cover"
                              />
                            </div>
                          </div>
                        ) : (
                          <div className="w-12 h-12 bg-base-300 rounded flex items-center justify-center">
                            <FileText className="w-6 h-6 text-gray-400" />
                          </div>
                        )}
                      </td>
                      <td>
                        <span className="badge badge-ghost">{notice.type}</span>
                      </td>
                      <td>
                        <span className={`badge ${notice.priority === 'high' ? 'badge-error' : notice.priority === 'medium' ? 'badge-warning' : 'badge-success'}`}>
                          {notice.priority}
                        </span>
                      </td>
                      <td>
                        <span className={`badge ${notice.status === 'active' ? 'badge-success' : notice.status === 'draft' ? 'badge-warning' : 'badge-ghost'}`}>
                          {notice.status}
                        </span>
                      </td>
                      <td>{new Date(notice.createdAt).toLocaleDateString()}</td>
                      <td>
                        <div className="flex gap-2">
                          <button 
                            className="btn btn-sm btn-ghost"
                            onClick={() => setSelectedNotice(notice)}
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button 
                            className="btn btn-sm btn-ghost"
                            onClick={() => handleEditClick(notice)}
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button 
                            className="btn btn-sm btn-ghost text-error"
                            onClick={() => handleDeleteNotice(notice._id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredNotices.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-gray-500">No notices found.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default NoticesTable

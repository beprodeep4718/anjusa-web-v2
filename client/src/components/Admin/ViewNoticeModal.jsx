import React from 'react'

const ViewNoticeModal = ({ selectedNotice, setSelectedNotice, handleEditClick }) => {
  if (!selectedNotice) return null

  return (
    <div className="modal modal-open">
      <div className="modal-box max-w-2xl">
        <h3 className="font-bold text-lg mb-4">{selectedNotice.title}</h3>
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <span className="badge badge-outline">{selectedNotice.type}</span>
            <span className={`badge ${selectedNotice.priority === 'high' ? 'badge-error' : selectedNotice.priority === 'medium' ? 'badge-warning' : 'badge-success'}`}>
              {selectedNotice.priority} priority
            </span>
            <span className={`badge ${selectedNotice.status === 'active' ? 'badge-success' : selectedNotice.status === 'draft' ? 'badge-warning' : 'badge-ghost'}`}>
              {selectedNotice.status}
            </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-semibold">Created:</span> {new Date(selectedNotice.createdAt).toLocaleString()}
            </div>
            <div>
              <span className="font-semibold">Last Updated:</span> {new Date(selectedNotice.updatedAt).toLocaleString()}
            </div>
            <div>
              <span className="font-semibold">Views:</span> {selectedNotice.views || 0}
            </div>
            <div>
              <span className="font-semibold">ID:</span> {selectedNotice._id}
            </div>
          </div>
          
          <div className="divider"></div>
          
          <div>
            <h4 className="font-semibold mb-2">Content:</h4>
            <div className="bg-base-200 p-4 rounded-lg">
              <p className="whitespace-pre-wrap">{selectedNotice.content}</p>
            </div>
          </div>

          {selectedNotice.image && (
            <div>
              <h4 className="font-semibold mb-2">Image:</h4>
              <img 
                src={selectedNotice.image.secure_url} 
                alt={selectedNotice.title}
                className="max-w-full h-auto rounded-lg"
              />
            </div>
          )}
        </div>
        <div className="modal-action">
          <button className="btn" onClick={() => setSelectedNotice(null)}>
            Close
          </button>
          <button 
            className="btn btn-primary" 
            onClick={() => {
              setSelectedNotice(null)
              handleEditClick(selectedNotice)
            }}
          >
            Edit Notice
          </button>
        </div>
      </div>
    </div>
  )
}

export default ViewNoticeModal

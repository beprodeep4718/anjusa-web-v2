import React from 'react'
import { Upload, X } from 'lucide-react'

const CreateNoticeModal = ({ 
  showCreateModal, 
  setShowCreateModal,
  formData, 
  setFormData, 
  handleCreateNotice, 
  imagePreview, 
  handleImageChange, 
  removeImage,
  resetForm 
}) => {
  const handleModalClose = () => {
    setShowCreateModal(false)
    resetForm()
  }

  if (!showCreateModal) return null

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg mb-4">Create New Notice</h3>
        <form onSubmit={handleCreateNotice} className="space-y-4">
          <div>
            <label className="label">
              <span className="label-text">Title</span>
            </label>
            <input
              type="text"
              className="input input-bordered w-full"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>
          
          <div>
            <label className="label">
              <span className="label-text">Content</span>
            </label>
            <textarea
              className="textarea textarea-bordered w-full h-32"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              required
            />
          </div>

          {/* Image Upload Section */}
          <div>
            <label className="label">
              <span className="label-text">Image (Optional)</span>
            </label>
            <div className="space-y-4">
              {imagePreview === 'loading' ? (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <span className="loading loading-spinner loading-lg"></span>
                  <p className="text-sm text-gray-500 mt-2">Processing image...</p>
                </div>
              ) : imagePreview ? (
                <div className="relative">
                  <img 
                    src={imagePreview} 
                    alt="Preview" 
                    className="w-full h-48 object-cover rounded-lg border"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-2 right-2 btn btn-sm btn-circle btn-error"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <p className="text-sm text-gray-500 mb-2">Click to upload an image</p>
                  <p className="text-xs text-gray-400">PNG, JPG, GIF up to 10MB (will be compressed)</p>
                </div>
              )}
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="file-input file-input-bordered w-full"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="label">
                <span className="label-text">Type</span>
              </label>
              <select
                className="select select-bordered w-full"
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              >
                <option value="general">General</option>
                <option value="important">Important</option>
                <option value="urgent">Urgent</option>
                <option value="event">Event</option>
              </select>
            </div>
            
            <div>
              <label className="label">
                <span className="label-text">Priority</span>
              </label>
              <select
                className="select select-bordered w-full"
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div>
              <label className="label">
                <span className="label-text">Status</span>
              </label>
              <select
                className="select select-bordered w-full"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              >
                <option value="active">Active</option>
                <option value="draft">Draft</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
          
          <div className="modal-action">
            <button type="button" className="btn" onClick={handleModalClose}>
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={imagePreview === 'loading'}
            >
              {imagePreview === 'loading' ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  Processing...
                </>
              ) : (
                'Create Notice'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateNoticeModal

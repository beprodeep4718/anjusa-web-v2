import React, { useEffect, useState } from 'react'
import { Plus, Edit, Trash2, Eye, Users, FileText, BarChart3, Settings, LogOut, Search, Menu, Upload, X } from 'lucide-react'
import useNoticeStore from '../../store/noticeStore'
import useAuth from '../../store/authStore'
import ProtectedRoute from '../../components/ProtectedRoute'

const AdminDashboard = () => {
  const { notices, isFetchingNotices, fetchNotices, createNotice, deleteNotice, updateNotice } = useNoticeStore()
  const { user, logout } = useAuth()
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedNotice, setSelectedNotice] = useState(null)
  const [editingNotice, setEditingNotice] = useState(null)
  const [activeTab, setActiveTab] = useState('overview')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedImage, setSelectedImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    type: 'general',
    priority: 'medium',
    status: 'active'
  })

  useEffect(() => {
    fetchNotices()
  }, [fetchNotices])

  // Convert image file to base64 with compression
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        const img = new Image()
        img.onload = () => {
          const canvas = document.createElement('canvas')
          const ctx = canvas.getContext('2d')
          
          // Calculate new dimensions (max width/height: 1200px)
          const maxSize = 1200
          let { width, height } = img
          
          if (width > height) {
            if (width > maxSize) {
              height = (height * maxSize) / width
              width = maxSize
            }
          } else {
            if (height > maxSize) {
              width = (width * maxSize) / height
              height = maxSize
            }
          }
          
          canvas.width = width
          canvas.height = height
          
          // Draw and compress
          ctx.drawImage(img, 0, 0, width, height)
          const compressedBase64 = canvas.toDataURL('image/jpeg', 0.8) // 80% quality
          resolve(compressedBase64)
        }
        img.src = reader.result
      }
      reader.onerror = (error) => reject(error)
    })
  }

  // Handle image file selection
  const handleImageChange = async (e) => {
    const file = e.target.files[0]
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select a valid image file')
        return
      }
      
      // Validate file size (max 10MB for original file)
      if (file.size > 10 * 1024 * 1024) {
        alert('Image size should be less than 10MB')
        return
      }

      try {
        // Show loading state
        setImagePreview('loading')
        
        const base64Image = await convertToBase64(file)
        
        // Check compressed size (base64 is ~1.37x larger than binary)
        const sizeInMB = (base64Image.length * 0.75) / (1024 * 1024)
        if (sizeInMB > 5) {
          alert('Compressed image is still too large. Please choose a smaller image.')
          setImagePreview(null)
          return
        }
        
        setSelectedImage(base64Image)
        setImagePreview(URL.createObjectURL(file))
      } catch (error) {
        console.error('Error converting image:', error)
        alert('Error processing image. Please try again.')
        setImagePreview(null)
      }
    }
  }

  // Remove selected image
  const removeImage = () => {
    setSelectedImage(null)
    setImagePreview(null)
    // Reset file input
    const fileInput = document.getElementById('image-upload')
    if (fileInput) fileInput.value = ''
  }

  const handleCreateNotice = async (e) => {
    e.preventDefault()
    
    // Prevent submission while image is processing
    if (imagePreview === 'loading') {
      alert('Please wait for image processing to complete')
      return
    }
    
    try {
      const noticeData = { ...formData }
      if (selectedImage) {
        noticeData.image = selectedImage
      }
      await createNotice(noticeData)
      setShowCreateModal(false)
      resetForm()
    } catch (error) {
      console.error('Error creating notice:', error)
      if (error.response?.status === 413) {
        alert('Image too large. Please try a smaller image.')
      } else {
        alert('Error creating notice. Please try again.')
      }
    }
  }

  const handleUpdateNotice = async (e) => {
    e.preventDefault()
    
    // Prevent submission while image is processing
    if (imagePreview === 'loading') {
      alert('Please wait for image processing to complete')
      return
    }
    
    try {
      const noticeData = { ...formData }
      if (selectedImage) {
        noticeData.image = selectedImage
      }
      await updateNotice(editingNotice._id, noticeData)
      setShowEditModal(false)
      setEditingNotice(null)
      resetForm()
    } catch (error) {
      console.error('Error updating notice:', error)
      if (error.response?.status === 413) {
        alert('Image too large. Please try a smaller image.')
      } else {
        alert('Error updating notice. Please try again.')
      }
    }
  }

  const handleDeleteNotice = async (noticeId) => {
    if (window.confirm('Are you sure you want to delete this notice?')) {
      try {
        await deleteNotice(noticeId)
      } catch (error) {
        console.error('Error deleting notice:', error)
      }
    }
  }

  const handleEditClick = (notice) => {
    setEditingNotice(notice)
    setFormData({
      title: notice.title,
      content: notice.content,
      type: notice.type || 'general',
      priority: notice.priority || 'medium',
      status: notice.status || 'active'
    })
    
    // Set existing image preview if notice has an image
    if (notice.image && notice.image.secure_url) {
      setImagePreview(notice.image.secure_url)
      setSelectedImage(null) // Don't set selectedImage for existing images
    } else {
      setImagePreview(null)
      setSelectedImage(null)
    }
    
    setShowEditModal(true)
  }

  const handleLogout = () => {
    logout()
  }

  // Reset form and images
  const resetForm = () => {
    setFormData({ title: '', content: '', type: 'general', priority: 'medium', status: 'active' })
    removeImage()
  }

  // Handle modal close for create
  const handleCreateModalClose = () => {
    setShowCreateModal(false)
    resetForm()
  }

  // Handle modal close for edit
  const handleEditModalClose = () => {
    setShowEditModal(false)
    setEditingNotice(null)
    resetForm()
  }

  const filteredNotices = notices.filter(notice =>
    notice.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    notice.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    notice.type.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const stats = {
    totalNotices: notices.length,
    activeNotices: notices.filter(notice => notice.status === 'active').length,
    draftNotices: notices.filter(notice => notice.status === 'draft').length,
    totalViews: notices.reduce((acc, notice) => acc + (notice.views || 0), 0)
  }

  return (
    <ProtectedRoute requiredRole="admin">
      <div className="min-h-screen bg-base-200">
        {/* Sidebar */}
        <div className="drawer lg:drawer-open">
          <input id="drawer-toggle" type="checkbox" className="drawer-toggle" />
          
          <div className="drawer-content flex flex-col">
            {/* Top Navigation */}
            <div className="navbar bg-base-100 shadow-sm">
              <div className="flex-none lg:hidden">
                <label htmlFor="drawer-toggle" className="btn btn-square btn-ghost">
                  <Menu className="w-6 h-6" />
                </label>
              </div>
              <div className="flex-1">
                <h1 className="text-xl font-bold">Admin Dashboard</h1>
              </div>
              <div className="flex-none">
                <div className="dropdown dropdown-end">
                  <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                    <div className="w-10 rounded-full bg-primary text-primary-content flex items-center justify-center">
                      {user?.username?.charAt(0)?.toUpperCase() || 'A'}
                    </div>
                  </div>
                  <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                    <li><a onClick={() => setActiveTab('settings')}><Settings className="w-4 h-4" />Settings</a></li>
                    <li><a onClick={handleLogout}><LogOut className="w-4 h-4" />Logout</a></li>
                  </ul>
                </div>
              </div>
            </div>

          {/* Main Content */}
          <main className="flex-1 p-6">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="stat bg-base-100 rounded-lg shadow">
                    <div className="stat-figure text-primary">
                      <FileText className="w-8 h-8" />
                    </div>
                    <div className="stat-title">Total Notices</div>
                    <div className="stat-value text-primary">{stats.totalNotices}</div>
                    <div className="stat-desc">All time notices</div>
                  </div>
                  
                  <div className="stat bg-base-100 rounded-lg shadow">
                    <div className="stat-figure text-secondary">
                      <Eye className="w-8 h-8" />
                    </div>
                    <div className="stat-title">Active Notices</div>
                    <div className="stat-value text-secondary">{stats.activeNotices}</div>
                    <div className="stat-desc">Currently active</div>
                  </div>
                  
                  <div className="stat bg-base-100 rounded-lg shadow">
                    <div className="stat-figure text-accent">
                      <FileText className="w-8 h-8" />
                    </div>
                    <div className="stat-title">Draft Notices</div>
                    <div className="stat-value text-accent">{stats.draftNotices}</div>
                    <div className="stat-desc">In draft</div>
                  </div>
                  
                  <div className="stat bg-base-100 rounded-lg shadow">
                    <div className="stat-figure text-info">
                      <BarChart3 className="w-8 h-8" />
                    </div>
                    <div className="stat-title">Total Views</div>
                    <div className="stat-value text-info">{stats.totalViews}</div>
                    <div className="stat-desc">Notice views</div>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="card bg-base-100 shadow">
                  <div className="card-body">
                    <h2 className="card-title">Recent Activity</h2>
                    <div className="space-y-2">
                      {notices.slice(0, 5).map((notice) => (
                        <div key={notice._id} className="flex items-center justify-between p-3 bg-base-200 rounded-lg">
                          <div>
                            <p className="font-semibold">{notice.title}</p>
                            <p className="text-sm opacity-70">Created on {new Date(notice.createdAt).toLocaleDateString()}</p>
                          </div>
                          <span className={`badge ${notice.priority === 'high' ? 'badge-error' : notice.priority === 'medium' ? 'badge-warning' : 'badge-success'}`}>
                            {notice.priority}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'notices' && (
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
            )}

            {activeTab === 'users' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold">User Management</h2>
                <div className="card bg-base-100 shadow">
                  <div className="card-body">
                    <div className="text-center py-12">
                      <Users className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                      <p className="text-xl font-semibold mb-2">User Management Coming Soon</p>
                      <p className="text-gray-500">
                        This feature will allow you to manage user accounts, permissions, and view user activity.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold">Settings</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="card bg-base-100 shadow">
                    <div className="card-body">
                      <h3 className="card-title">Profile Settings</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="label">
                            <span className="label-text">Username</span>
                          </label>
                          <input 
                            type="text" 
                            className="input input-bordered w-full" 
                            value={user?.username || ''} 
                            readOnly 
                          />
                        </div>
                        <div>
                          <label className="label">
                            <span className="label-text">Email</span>
                          </label>
                          <input 
                            type="email" 
                            className="input input-bordered w-full" 
                            value={user?.email || ''} 
                            readOnly 
                          />
                        </div>
                        <div>
                          <label className="label">
                            <span className="label-text">Role</span>
                          </label>
                          <input 
                            type="text" 
                            className="input input-bordered w-full" 
                            value={user?.role || 'admin'} 
                            readOnly 
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="card bg-base-100 shadow">
                    <div className="card-body">
                      <h3 className="card-title">Application Settings</h3>
                      <div className="space-y-4">
                        <div className="form-control">
                          <label className="label cursor-pointer">
                            <span className="label-text">Email Notifications</span>
                            <input type="checkbox" className="toggle toggle-primary" defaultChecked />
                          </label>
                        </div>
                        <div className="form-control">
                          <label className="label cursor-pointer">
                            <span className="label-text">Auto-save Drafts</span>
                            <input type="checkbox" className="toggle toggle-primary" defaultChecked />
                          </label>
                        </div>
                        <div className="form-control">
                          <label className="label cursor-pointer">
                            <span className="label-text">Dark Mode</span>
                            <input type="checkbox" className="toggle toggle-primary" />
                          </label>
                        </div>
                        <div className="divider"></div>
                        <button className="btn btn-primary w-full">Save Settings</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>

        {/* Sidebar */}
        <div className="drawer-side">
          <label htmlFor="drawer-toggle" aria-label="close sidebar" className="drawer-overlay"></label>
          <aside className="min-h-full w-64 bg-base-100">
            <div className="p-4">
              <h2 className="text-xl font-bold">Admin Panel</h2>
            </div>
            <ul className="menu p-4 space-y-2">
              <li>
                <a 
                  className={activeTab === 'overview' ? 'active' : ''}
                  onClick={() => setActiveTab('overview')}
                >
                  <BarChart3 className="w-5 h-5" />
                  Overview
                </a>
              </li>
              <li>
                <a 
                  className={activeTab === 'notices' ? 'active' : ''}
                  onClick={() => setActiveTab('notices')}
                >
                  <FileText className="w-5 h-5" />
                  Notices
                </a>
              </li>
              <li>
                <a 
                  className={activeTab === 'users' ? 'active' : ''}
                  onClick={() => setActiveTab('users')}
                >
                  <Users className="w-5 h-5" />
                  Users
                </a>
              </li>
              <li>
                <a 
                  className={activeTab === 'settings' ? 'active' : ''}
                  onClick={() => setActiveTab('settings')}
                >
                  <Settings className="w-5 h-5" />
                  Settings
                </a>
              </li>
            </ul>
          </aside>
        </div>
      </div>

      {/* Create Notice Modal */}
      {showCreateModal && (
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
                <button type="button" className="btn" onClick={handleCreateModalClose}>
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
      )}

      {/* Edit Notice Modal */}
      {showEditModal && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">Edit Notice</h3>
            <form onSubmit={handleUpdateNotice} className="space-y-4">
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
                      {editingNotice?.image && !selectedImage && (
                        <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
                          Current Image
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                      <p className="text-sm text-gray-500 mb-2">Click to upload a new image</p>
                      <p className="text-xs text-gray-400">PNG, JPG, GIF up to 10MB (will be compressed)</p>
                      {editingNotice?.image && (
                        <p className="text-xs text-info mt-2">Current notice has an image</p>
                      )}
                    </div>
                  )}
                  <input
                    id="image-upload-edit"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="file-input file-input-bordered w-full"
                  />
                  {imagePreview && editingNotice?.image && (
                    <p className="text-xs text-warning">
                      Uploading a new image will replace the current one
                    </p>
                  )}
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
                <button type="button" className="btn" onClick={handleEditModalClose}>
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
                    'Update Notice'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Notice Modal */}
      {selectedNotice && (
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
      )}
      </div>
    </ProtectedRoute>
  )
}

export default AdminDashboard
import React, { useEffect, useState } from 'react'
import useNoticeStore from '../../store/noticeStore'
import useAuth from '../../store/authStore'
import useImageUpload from '../../hooks/useImageUpload'
import ProtectedRoute from '../../components/ProtectedRoute'

// Admin Components
import AdminSidebar from '../../components/Admin/AdminSidebar'
import AdminTopbar from '../../components/Admin/AdminTopbar'
import OverviewTab from '../../components/Admin/OverviewTab'
import NoticesTable from '../../components/Admin/NoticesTable'
import CreateNoticeModal from '../../components/Admin/CreateNoticeModal'
import EditNoticeModal from '../../components/Admin/EditNoticeModal'
import ViewNoticeModal from '../../components/Admin/ViewNoticeModal'
import UserManagement from '../../components/Admin/UserManagement'
import AdminSettings from '../../components/Admin/AdminSettings'
import ArtworkManagement from '../../components/Admin/ArtworkManagement'
import PendingArtists from '../../components/Admin/PendingArtists'
import StudentManagement from '../../components/Admin/StudentManagement'


const AdminDashboard = () => {
  const { notices, isFetchingNotices, fetchNotices, createNotice, deleteNotice, updateNotice } = useNoticeStore()
  const { user, logout } = useAuth()
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedNotice, setSelectedNotice] = useState(null)
  const [editingNotice, setEditingNotice] = useState(null)
  const [activeTab, setActiveTab] = useState('overview')
  const [searchQuery, setSearchQuery] = useState('')
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    type: 'general',
    priority: 'medium',
    status: 'active'
  })

  // Use custom image upload hook
  const {
    selectedImage,
    imagePreview,
    setSelectedImage,
    setImagePreview,
    handleImageChange,
    removeImage
  } = useImageUpload()

  useEffect(() => {
    fetchNotices()
  }, [fetchNotices])

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

  const stats = {
    totalNotices: notices.length,
    activeNotices: notices.filter(notice => notice.status === 'active').length,
    draftNotices: notices.filter(notice => notice.status === 'draft').length,
    totalViews: notices.reduce((acc, notice) => acc + (notice.views || 0), 0)
  }

  return (
    <ProtectedRoute requiredRole="admin">
      <div className="min-h-screen bg-base-200">
        {/* Main Layout */}
        <div className="drawer lg:drawer-open">
          <input id="drawer-toggle" type="checkbox" className="drawer-toggle" />
          
          <div className="drawer-content flex flex-col">
            {/* Top Navigation */}
            <AdminTopbar 
              user={user} 
              setActiveTab={setActiveTab} 
              handleLogout={handleLogout} 
            />

            {/* Main Content */}
            <main className="flex-1 p-6">
              {activeTab === 'overview' && (
                <OverviewTab stats={stats} notices={notices} />
              )}

              {activeTab === 'notices' && (
                <NoticesTable
                  notices={notices}
                  isFetchingNotices={isFetchingNotices}
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  setShowCreateModal={setShowCreateModal}
                  setSelectedNotice={setSelectedNotice}
                  handleEditClick={handleEditClick}
                  handleDeleteNotice={handleDeleteNotice}
                />
              )}

              {activeTab === 'users' && <UserManagement />}
              
              {activeTab === 'settings' && <AdminSettings user={user} />}
              {activeTab === 'artworks' && <ArtworkManagement />}
              {activeTab === 'students' && <StudentManagement />}
              {activeTab === 'pending_artists' && <PendingArtists />}
            </main>
          </div>

          {/* Sidebar */}
          <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
      </div>

      {/* Modals */}
      <CreateNoticeModal
        showCreateModal={showCreateModal}
        setShowCreateModal={setShowCreateModal}
        formData={formData}
        setFormData={setFormData}
        handleCreateNotice={handleCreateNotice}
        imagePreview={imagePreview}
        handleImageChange={handleImageChange}
        removeImage={removeImage}
        resetForm={resetForm}
      />

      <EditNoticeModal
        showEditModal={showEditModal}
        setShowEditModal={setShowEditModal}
        formData={formData}
        setFormData={setFormData}
        handleUpdateNotice={handleUpdateNotice}
        imagePreview={imagePreview}
        handleImageChange={handleImageChange}
        removeImage={removeImage}
        editingNotice={editingNotice}
        selectedImage={selectedImage}
        resetForm={resetForm}
      />

      <ViewNoticeModal
        selectedNotice={selectedNotice}
        setSelectedNotice={setSelectedNotice}
        handleEditClick={handleEditClick}
      />
    </ProtectedRoute>
  )
}

export default AdminDashboard

import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Calendar, Tag, Eye } from 'lucide-react'
import useNoticeStore from '../store/noticeStore'

const AllNotices = () => {
  const navigate = useNavigate()
  const { notices, fetchNotices, isFetchingNotices } = useNoticeStore()

  useEffect(() => {
    fetchNotices()
  }, [fetchNotices])

  const handleNoticeClick = (noticeId) => {
    navigate(`/notice/${noticeId}`)
  }

  const handleBackClick = () => {
    navigate('/')
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getTypeColor = (type) => {
    switch (type) {
      case 'urgent':
        return 'bg-error text-error-content'
      case 'announcement':
        return 'bg-info text-info-content'
      case 'general':
        return 'bg-success text-success-content'
      default:
        return 'bg-neutral text-neutral-content'
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'text-error'
      case 'medium':
        return 'text-warning'
      case 'low':
        return 'text-success'
      default:
        return 'text-base-content'
    }
  }

  if (isFetchingNotices) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <div className="text-center">
          <span className="loading loading-spinner loading-lg"></span>
          <p className="mt-4 text-lg">Loading notices...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-base-200">
      {/* Header */}
      <div className="bg-base-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={handleBackClick}
              className="btn btn-ghost btn-sm gap-2"
            >
              <ArrowLeft size={18} />
              Back to Home
            </button>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-base-content">All Notices</h1>
              <p className="text-base-content/70 mt-2">
                {notices.length} {notices.length === 1 ? 'notice' : 'notices'} available
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Notices Grid */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {notices.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📝</div>
            <h2 className="text-2xl font-semibold text-base-content mb-2">No Notices Available</h2>
            <p className="text-base-content/70">Check back later for updates and announcements.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notices.map((notice) => (
              <div
                key={notice._id}
                onClick={() => handleNoticeClick(notice._id)}
                className="bg-base-100 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer group"
              >
                {/* Notice Image */}
                {notice.image && (
                  <div className="relative h-48 overflow-hidden rounded-t-lg">
                    <img
                      src={notice.image?.secure_url}
                      alt={notice.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>
                )}

                <div className="p-6">
                  {/* Header with Type and Date */}
                  <div className="flex items-center justify-between mb-3">
                    {notice.type && (
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(notice.type)}`}>
                        {notice.type.charAt(0).toUpperCase() + notice.type.slice(1)}
                      </span>
                    )}
                    
                    {notice.priority && (
                      <div className="flex items-center gap-1">
                        <Tag size={14} className={getPriorityColor(notice.priority)} />
                        <span className={`text-xs font-medium ${getPriorityColor(notice.priority)}`}>
                          {notice.priority.charAt(0).toUpperCase() + notice.priority.slice(1)}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="font-bold text-lg text-base-content mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {notice.title}
                  </h3>

                  {/* Content Preview */}
                  <p className="text-base-content/80 text-sm line-clamp-3 mb-4">
                    {notice.content}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between text-xs text-base-content/60">
                    <div className="flex items-center gap-1">
                      <Calendar size={12} />
                      <span>{formatDate(notice.createdAt)}</span>
                    </div>
                    
                    <div className="flex items-center gap-1">
                      <Eye size={12} />
                      <span>Click to view</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default AllNotices

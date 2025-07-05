import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, Calendar, Eye, Tag, AlertCircle } from 'lucide-react'
import useNoticeStore from '../store/noticeStore'

const PreviewNotice = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { notices, fetchNotices, isFetchingNotices } = useNoticeStore()
  const [notice, setNotice] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadNotice = async () => {
      try {
        setLoading(true)
        
        // If notices are not loaded yet, fetch them
        if (notices.length === 0) {
          await fetchNotices()
        }
        
        // Find the notice by ID
        const foundNotice = notices.find(n => n._id === id)
        
        if (foundNotice) {
          setNotice(foundNotice)
          setError(null)
        } else {
          setError('Notice not found')
        }
      } catch (err) {
        console.error('Error loading notice:', err)
        setError('Failed to load notice')
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      loadNotice()
    }
  }, [id, notices, fetchNotices])

  if (loading || isFetchingNotices) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <div className="text-center">
          <span className="loading loading-spinner loading-lg"></span>
          <p className="mt-4 text-lg">Loading notice...</p>
        </div>
      </div>
    )
  }

  if (error || !notice) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <div className="card bg-base-100 shadow-xl max-w-md">
          <div className="card-body text-center">
            <AlertCircle className="w-16 h-16 mx-auto mb-4 text-error" />
            <h2 className="card-title text-error justify-center">
              {error || 'Notice Not Found'}
            </h2>
            <p className="text-gray-500 mb-4">
              The notice you're looking for doesn't exist or has been removed.
            </p>
            <div className="card-actions justify-center">
              <button 
                className="btn btn-primary"
                onClick={() => navigate('/')}
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'badge-error'
      case 'medium': return 'badge-warning'
      case 'low': return 'badge-success'
      default: return 'badge-ghost'
    }
  }

  const getTypeColor = (type) => {
    switch (type) {
      case 'urgent': return 'badge-error'
      case 'important': return 'badge-warning'
      case 'event': return 'badge-info'
      case 'general': return 'badge-ghost'
      default: return 'badge-ghost'
    }
  }

  return (
    <div className="min-h-screen bg-base-200">
      {/* Navigation Bar */}
      <div className="navbar bg-base-100 shadow-sm sticky top-0 z-10">
        <div className="navbar-start">
          <button 
            className="btn btn-ghost btn-circle"
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
        </div>
        <div className="navbar-center">
          <h1 className="text-xl font-bold">Notice Details</h1>
        </div>
        <div className="navbar-end">
          <Link to="/" className="btn btn-ghost">
            Home
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            {/* Header */}
            <div className="flex flex-wrap gap-2 mb-4">
              <span className={`badge ${getTypeColor(notice.type)}`}>
                <Tag className="w-3 h-3 mr-1" />
                {notice.type}
              </span>
              <span className={`badge ${getPriorityColor(notice.priority)}`}>
                {notice.priority} priority
              </span>
              <span className={`badge ${notice.status === 'active' ? 'badge-success' : 'badge-warning'}`}>
                {notice.status}
              </span>
            </div>

            {/* Title */}
            <h1 className="card-title text-2xl lg:text-3xl mb-4">
              {notice.title}
            </h1>

            {/* Meta Information */}
            <div className="flex flex-wrap gap-4 text-sm opacity-70 mb-6">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>Created: {formatDate(notice.createdAt)}</span>
              </div>
              {notice.updatedAt !== notice.createdAt && (
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>Updated: {formatDate(notice.updatedAt)}</span>
                </div>
              )}
              <div className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                <span>{notice.views || 0} views</span>
              </div>
            </div>

            {/* Image */}
            {notice.image && notice.image.secure_url && (
              <div className="mb-6">
                <img 
                  src={notice.image.secure_url} 
                  alt={notice.title}
                  className="w-full h-auto rounded-lg shadow-md max-h-96 object-cover"
                />
              </div>
            )}

            {/* Content */}
            <div className="prose max-w-none">
              <div className="bg-base-200 p-6 rounded-lg">
                <p className="text-base leading-relaxed whitespace-pre-wrap">
                  {notice.content}
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="divider"></div>
            <div className="flex justify-between items-center lg:flex-row flex-col gap-4">
              <div className="text-sm opacity-60">
                Notice ID: {notice._id}
              </div>
              <div className="flex gap-2">
                <button 
                  className="btn btn-outline"
                  onClick={() => navigate('/')}
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Home
                </button>
                <button 
                  className="btn btn-primary"
                  onClick={() => window.print()}
                >
                  Print Notice
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Related Notices */}
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Other Notices</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {notices
              .filter(n => n._id !== notice._id && n.status === 'active')
              .slice(0, 3)
              .map((relatedNotice) => (
                <div 
                  key={relatedNotice._id}
                  className="card bg-base-100 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
                  onClick={() => navigate(`/notice/${relatedNotice._id}`)}
                >
                  <div className="card-body p-4">
                    <div className="flex gap-2 mb-2">
                      <span className={`badge badge-sm ${getTypeColor(relatedNotice.type)}`}>
                        {relatedNotice.type}
                      </span>
                      <span className={`badge badge-sm ${getPriorityColor(relatedNotice.priority)}`}>
                        {relatedNotice.priority}
                      </span>
                    </div>
                    <h3 className="font-semibold text-sm mb-2 line-clamp-2">
                      {relatedNotice.title}
                    </h3>
                    <p className="text-xs opacity-70 line-clamp-3">
                      {relatedNotice.content}
                    </p>
                    <div className="text-xs opacity-50 mt-2">
                      {formatDate(relatedNotice.createdAt)}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PreviewNotice

import React from 'react'
import { FileText, Eye, BarChart3 } from 'lucide-react'

const AdminStats = ({ stats }) => {
  return (
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
  )
}

export default AdminStats

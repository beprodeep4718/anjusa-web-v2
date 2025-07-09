import React from 'react'
import AdminStats from './AdminStats'
import RecentActivity from './RecentActivity'

const OverviewTab = ({ stats, notices }) => {
  return (
    <div className="space-y-6">
      <AdminStats stats={stats} />
      <RecentActivity notices={notices} />
    </div>
  )
}

export default OverviewTab

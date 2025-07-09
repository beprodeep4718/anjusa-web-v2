import React from 'react'

const RecentActivity = ({ notices }) => {
  return (
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
          {notices.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No recent activity.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default RecentActivity

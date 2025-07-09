import React from 'react'
import { Users } from 'lucide-react'

const UserManagement = () => {
  return (
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
  )
}

export default UserManagement

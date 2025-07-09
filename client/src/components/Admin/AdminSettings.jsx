import React from 'react'

const AdminSettings = ({ user }) => {
  return (
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
  )
}

export default AdminSettings

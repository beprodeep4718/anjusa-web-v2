import React from 'react'
import { BarChart3, FileText, Users, Settings } from 'lucide-react'

const AdminSidebar = ({ activeTab, setActiveTab }) => {
  return (
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
  )
}

export default AdminSidebar

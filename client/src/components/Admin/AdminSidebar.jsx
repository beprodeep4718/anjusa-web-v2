import React from 'react'
import { BarChart3, FileText, Users, Settings, Brush, UserPen, GraduationCap } from 'lucide-react'

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
              className={activeTab === 'overview' ? 'bg-white/30' : ''}
              onClick={() => setActiveTab('overview')}
            >
              <BarChart3 className="w-5 h-5" />
              Overview
            </a>
          </li>
          <li>
            <a 
              className={activeTab === 'notices' ? 'bg-white/30' : ''}
              onClick={() => setActiveTab('notices')}
            >
              <FileText className="w-5 h-5" />
              Notices
            </a>
          </li>
          <li>
            <a 
              className={activeTab === 'users' ? 'bg-white/30' : ''}
              onClick={() => setActiveTab('users')}
            >
              <Users className="w-5 h-5" />
              Users
            </a>
          </li>
          <li>
            <a 
              className={activeTab === 'students' ? 'bg-white/30' : ''}
              onClick={() => setActiveTab('students')}
            >
              <GraduationCap className="w-5 h-5" />
              Students
            </a>
          </li>
          <li>
            <a 
              className={activeTab === 'artworks' ? 'bg-white/30' : ''}
              onClick={() => setActiveTab('artworks')}
            >
              <Brush className="w-5 h-5" />
              Artworks
            </a>
          </li>
          <li>
            <a 
              className={activeTab === 'pending_artists' ? 'bg-white/30' : ''}
              onClick={() => setActiveTab('pending_artists')}
            >
              <UserPen className="w-5 h-5" />
              Pending Artists
            </a>
          </li>
          <li>
            <a 
              className={activeTab === 'settings' ? 'bg-white/30' : ''}
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

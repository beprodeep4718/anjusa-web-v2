import React from 'react'
import { Menu, Settings, LogOut } from 'lucide-react'

const AdminTopbar = ({ user, setActiveTab, handleLogout }) => {
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="flex-none lg:hidden">
        <label htmlFor="drawer-toggle" className="btn btn-square btn-ghost">
          <Menu className="w-6 h-6" />
        </label>
      </div>
      <div className="flex-1">
        <h1 className="text-xl font-bold">Admin Dashboard</h1>
      </div>
      <div className="flex-none">
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full bg-primary text-primary-content flex items-center justify-center">
              {user?.username?.charAt(0)?.toUpperCase() || 'A'}
            </div>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
            <li><a onClick={() => setActiveTab('settings')}><Settings className="w-4 h-4" />Settings</a></li>
            <li><a onClick={handleLogout}><LogOut className="w-4 h-4" />Logout</a></li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default AdminTopbar

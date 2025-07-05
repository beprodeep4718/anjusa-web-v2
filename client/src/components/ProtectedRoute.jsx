import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import useAuth from '../store/authStore'

const ProtectedRoute = ({ children, requiredRole = null }) => {
  const { user, isCheckingAuth, authenticate } = useAuth()

  useEffect(() => {
    if (!user && !isCheckingAuth) {
      authenticate()
    }
  }, [user, isCheckingAuth, authenticate])

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200">
        <div className="text-center">
          <span className="loading loading-spinner loading-lg"></span>
          <p className="mt-4 text-lg">Checking authentication...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  if (requiredRole && user.role !== requiredRole) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body text-center">
            <h2 className="card-title text-error">Access Denied</h2>
            <p>You don't have permission to access this page.</p>
            <div className="card-actions justify-center">
              <button 
                className="btn btn-primary"
                onClick={() => window.history.back()}
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return children
}

export default ProtectedRoute

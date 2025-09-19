"use client"

import { Link, useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

function Header() {
  const location = useLocation()
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()

  async function handleLogout() {
    try {
      await logout()
      navigate("/")
    } catch (error) {
      console.error("Failed to log out:", error)
    }
  }

  return (
    <header className="border-b border-border bg-surface">
      <div className="container">
        <div className="flex items-center justify-between py-4">
          <Link to="/" className="flex items-center gap-3">
            <div className="text-2xl">🚂</div>
            <div>
              <h1 className="text-xl font-bold text-primary">RailWay</h1>
              <p className="text-xs text-muted">Book your journey</p>
            </div>
          </Link>

          <nav className="flex items-center gap-6">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location.pathname === "/" ? "text-primary" : "text-secondary"
              }`}
            >
              Search
            </Link>
            <Link to="/help" className="text-sm font-medium text-secondary hover:text-primary transition-colors">
              Help
            </Link>
            {currentUser ? (
              <div className="flex items-center gap-4">
                <span className="text-sm text-secondary">Welcome, {currentUser.email}</span>
                <button onClick={handleLogout} className="btn btn-secondary btn-sm">
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/login" className="text-sm font-medium text-secondary hover:text-primary transition-colors">
                  Sign In
                </Link>
                <Link to="/signup" className="btn btn-primary btn-sm">
                  Sign Up
                </Link>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header

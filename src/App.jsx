"use client"

import { Routes, Route } from "react-router-dom"
import { useState, useEffect } from "react"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import SearchResults from "./pages/SearchResults"
import BookingDetails from "./pages/BookingDetails"
import Payment from "./pages/Payment"
import Confirmation from "./pages/Confirmation"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import ProtectedRoute from "./components/ProtectedRoute"
import { BookingProvider } from "./context/BookingContext"
import { AuthProvider } from "./context/AuthContext"

function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate app initialization
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="loading text-4xl mb-4">🚂</div>
          <p className="text-muted">Loading RailWay...</p>
        </div>
      </div>
    )
  }

  return (
    <AuthProvider>
      <BookingProvider>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<SearchResults />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route
                path="/booking/:trainId"
                element={
                  <ProtectedRoute>
                    <BookingDetails />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/payment"
                element={
                  <ProtectedRoute>
                    <Payment />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/confirmation"
                element={
                  <ProtectedRoute>
                    <Confirmation />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </BookingProvider>
    </AuthProvider>
  )
}

export default App

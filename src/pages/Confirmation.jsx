"use client"

import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useBooking } from "../context/BookingContext"

function Confirmation() {
  const navigate = useNavigate()
  const { state, dispatch } = useBooking()
  const [showDetails, setShowDetails] = useState(false)

  useEffect(() => {
    // Redirect if no booking confirmation
    if (!state.bookingConfirmation) {
      navigate("/")
      return
    }
  }, [state.bookingConfirmation, navigate])

  const handleNewBooking = () => {
    dispatch({ type: "RESET_BOOKING" })
    navigate("/")
  }

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours}h ${mins}m`
  }

  if (!state.bookingConfirmation || !state.selectedTrain) {
    return null
  }

  return (
    <div className="container py-8">
      <div className="max-w-2xl mx-auto">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">✅</div>
          <h1 className="text-3xl font-bold text-success mb-2">Booking Confirmed!</h1>
          <p className="text-secondary">
            Your train tickets have been booked successfully. You will receive a confirmation email shortly.
          </p>
        </div>

        {/* Booking Details Card */}
        <div className="card mb-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-xl font-semibold mb-1">Booking Details</h2>
              <p className="text-muted">Booking ID: {state.bookingConfirmation.bookingId}</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-primary">${state.bookingConfirmation.totalAmount}</div>
              <div className="text-sm text-success">Paid</div>
            </div>
          </div>

          {/* Journey Info */}
          <div className="border border-border rounded-lg p-4 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">{state.selectedTrain.name}</h3>
              <span className="text-sm text-muted">Train #{state.selectedTrain.number}</span>
            </div>

            <div className="flex justify-between items-center">
              <div>
                <div className="text-xl font-bold">{state.selectedTrain.departureTime}</div>
                <div className="text-sm text-muted">{state.searchParams.from}</div>
                <div className="text-xs text-muted">{state.searchParams.departureDate}</div>
              </div>

              <div className="text-center">
                <div className="text-sm text-muted">{formatDuration(state.selectedTrain.duration)}</div>
                <div className="w-16 h-px bg-border my-2"></div>
                <div className="text-xs text-muted">{state.selectedTrain.stops} stops</div>
              </div>

              <div className="text-right">
                <div className="text-xl font-bold">{state.selectedTrain.arrivalTime}</div>
                <div className="text-sm text-muted">{state.searchParams.to}</div>
                <div className="text-xs text-muted">Same day</div>
              </div>
            </div>
          </div>

          {/* Passenger Info */}
          <div className="mb-6">
            <h3 className="font-semibold mb-3">Passengers ({state.searchParams.passengers})</h3>
            <div className="space-y-2">
              {state.passengerDetails.map((passenger, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center py-2 border-b border-border last:border-b-0"
                >
                  <div>
                    <span className="font-medium">
                      {passenger.firstName} {passenger.lastName}
                    </span>
                    <span className="text-sm text-muted ml-2">
                      ({passenger.age} years, {passenger.gender})
                    </span>
                  </div>
                  <div className="text-sm text-muted">
                    Seat: A{index + 1}-{index + 1}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Toggle Details */}
          <button onClick={() => setShowDetails(!showDetails)} className="btn btn-secondary w-full mb-4">
            {showDetails ? "Hide Details" : "Show More Details"}
          </button>

          {/* Additional Details */}
          {showDetails && (
            <div className="space-y-4 pt-4 border-t border-border">
              <div>
                <h4 className="font-medium mb-2">Payment Information</h4>
                <div className="text-sm text-secondary space-y-1">
                  <div>Payment ID: {state.bookingConfirmation.paymentId}</div>
                  <div>Payment Method: Credit Card</div>
                  <div>Transaction Date: {new Date(state.bookingConfirmation.bookedAt).toLocaleDateString()}</div>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Contact Information</h4>
                <div className="text-sm text-secondary space-y-1">
                  <div>Email: {state.passengerDetails[0]?.email}</div>
                  <div>Phone: {state.passengerDetails[0]?.phone}</div>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Important Notes</h4>
                <ul className="text-sm text-secondary space-y-1">
                  <li>• Please arrive at the station 30 minutes before departure</li>
                  <li>• Carry a valid government-issued photo ID</li>
                  <li>• Your mobile ticket will be sent via email and SMS</li>
                  <li>• Free cancellation available up to 24 hours before departure</li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button onClick={() => window.print()} className="btn btn-secondary flex-1">
            Print Ticket
          </button>
          <button onClick={handleNewBooking} className="btn btn-primary flex-1">
            Book Another Trip
          </button>
        </div>

        {/* Help Section */}
        <div className="card mt-8 bg-surface">
          <h3 className="font-semibold mb-3">Need Help?</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-medium mb-1">Customer Support</h4>
              <p className="text-secondary">Call us at 1-800-RAILWAY</p>
              <p className="text-secondary">Available 24/7</p>
            </div>
            <div>
              <h4 className="font-medium mb-1">Manage Booking</h4>
              <Link to="/manage" className="text-primary hover:underline">
                View or modify your booking
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Confirmation

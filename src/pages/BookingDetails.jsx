"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useBooking } from "../context/BookingContext"
import PassengerForm from "../components/PassengerForm"
import SeatSelection from "../components/SeatSelection"
import BookingSummary from "../components/BookingSummary"

function BookingDetails() {
  const { trainId } = useParams()
  const navigate = useNavigate()
  const { state, dispatch } = useBooking()
  const [currentStep, setCurrentStep] = useState(1)
  const [passengerDetails, setPassengerDetails] = useState([])
  const [selectedSeats, setSelectedSeats] = useState([])

  useEffect(() => {
    // Redirect if no selected train
    if (!state.selectedTrain) {
      navigate("/search")
      return
    }

    // Initialize passenger forms
    const initialPassengers = Array.from({ length: state.searchParams.passengers }, (_, index) => ({
      id: index + 1,
      firstName: "",
      lastName: "",
      email: index === 0 ? "" : "", // Only first passenger needs email
      phone: index === 0 ? "" : "", // Only first passenger needs phone
      age: "",
      gender: "",
      seatPreference: "any",
    }))
    setPassengerDetails(initialPassengers)
  }, [state.selectedTrain, state.searchParams.passengers, navigate])

  const handlePassengerUpdate = (index, updatedPassenger) => {
    const updated = [...passengerDetails]
    updated[index] = updatedPassenger
    setPassengerDetails(updated)
  }

  const handleSeatSelection = (seats) => {
    setSelectedSeats(seats)
  }

  const validateStep = (step) => {
    if (step === 1) {
      return passengerDetails.every(
        (passenger) =>
          passenger.firstName &&
          passenger.lastName &&
          passenger.age &&
          passenger.gender &&
          (passenger.id === 1 ? passenger.email && passenger.phone : true),
      )
    }
    if (step === 2) {
      return selectedSeats.length === state.searchParams.passengers
    }
    return true
  }

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      if (currentStep === 1) {
        setCurrentStep(2)
      } else if (currentStep === 2) {
        dispatch({ type: "SET_PASSENGER_DETAILS", payload: passengerDetails })
        navigate("/payment")
      }
    }
  }

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  if (!state.selectedTrain) {
    return null
  }

  return (
    <div className="container py-8">
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-center gap-4 mb-4">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step <= currentStep ? "bg-primary text-white" : "bg-surface text-muted border border-border"
                }`}
              >
                {step}
              </div>
              {step < 3 && <div className={`w-16 h-px mx-2 ${step < currentStep ? "bg-primary" : "bg-border"}`} />}
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-8 text-sm">
          <span className={currentStep >= 1 ? "text-primary font-medium" : "text-muted"}>Passenger Details</span>
          <span className={currentStep >= 2 ? "text-primary font-medium" : "text-muted"}>Seat Selection</span>
          <span className={currentStep >= 3 ? "text-primary font-medium" : "text-muted"}>Payment</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {currentStep === 1 && (
            <PassengerForm passengers={passengerDetails} onPassengerUpdate={handlePassengerUpdate} />
          )}

          {currentStep === 2 && (
            <SeatSelection
              train={state.selectedTrain}
              passengerCount={state.searchParams.passengers}
              onSeatSelection={handleSeatSelection}
              selectedSeats={selectedSeats}
            />
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <button
              onClick={handlePrevStep}
              disabled={currentStep === 1}
              className="btn btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button
              onClick={handleNextStep}
              disabled={!validateStep(currentStep)}
              className="btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {currentStep === 2 ? "Proceed to Payment" : "Next"}
            </button>
          </div>
        </div>

        {/* Booking Summary Sidebar */}
        <div className="lg:col-span-1">
          <BookingSummary train={state.selectedTrain} searchParams={state.searchParams} selectedSeats={selectedSeats} />
        </div>
      </div>
    </div>
  )
}

export default BookingDetails

"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useBooking } from "../context/BookingContext"
import PaymentForm from "../components/PaymentForm"
import BookingSummary from "../components/BookingSummary"

function Payment() {
  const navigate = useNavigate()
  const { state, dispatch } = useBooking()
  const [processing, setProcessing] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("card")

  useEffect(() => {
    // Redirect if no booking data
    if (!state.selectedTrain || !state.passengerDetails.length) {
      navigate("/")
      return
    }
  }, [state, navigate])

  const handlePayment = async (paymentData) => {
    setProcessing(true)

    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 3000))

      // Generate booking confirmation
      const confirmation = {
        bookingId: `RW${Date.now()}`,
        status: "confirmed",
        paymentId: `PAY${Date.now()}`,
        bookedAt: new Date().toISOString(),
        totalAmount: calculateTotal(),
      }

      dispatch({ type: "SET_PAYMENT_INFO", payload: paymentData })
      dispatch({ type: "SET_BOOKING_CONFIRMATION", payload: confirmation })

      navigate("/confirmation")
    } catch (error) {
      console.error("Payment failed:", error)
      // Handle payment error
    } finally {
      setProcessing(false)
    }
  }

  const calculateTotal = () => {
    if (!state.selectedTrain) return 0
    const basePrice = state.selectedTrain.price * state.searchParams.passengers
    const taxes = Math.round(basePrice * 0.12)
    return basePrice + taxes
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
                  step <= 3 ? "bg-primary text-white" : "bg-surface text-muted border border-border"
                }`}
              >
                {step}
              </div>
              {step < 3 && <div className="w-16 h-px mx-2 bg-primary" />}
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-8 text-sm">
          <span className="text-muted">Passenger Details</span>
          <span className="text-muted">Seat Selection</span>
          <span className="text-primary font-medium">Payment</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Payment Form */}
        <div className="lg:col-span-2">
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Payment Details</h2>
              <p className="text-secondary">Complete your booking with secure payment</p>
            </div>

            {/* Payment Method Selection */}
            <div className="card">
              <h3 className="font-semibold mb-4">Payment Method</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <label className="flex items-center gap-3 p-4 border border-border rounded-lg cursor-pointer hover:border-primary transition-colors">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={paymentMethod === "card"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="text-primary"
                  />
                  <div>
                    <div className="font-medium">Credit/Debit Card</div>
                    <div className="text-sm text-muted">Visa, Mastercard, Amex</div>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-4 border border-border rounded-lg cursor-pointer hover:border-primary transition-colors">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="paypal"
                    checked={paymentMethod === "paypal"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="text-primary"
                  />
                  <div>
                    <div className="font-medium">PayPal</div>
                    <div className="text-sm text-muted">Pay with PayPal</div>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-4 border border-border rounded-lg cursor-pointer hover:border-primary transition-colors">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="apple"
                    checked={paymentMethod === "apple"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="text-primary"
                  />
                  <div>
                    <div className="font-medium">Apple Pay</div>
                    <div className="text-sm text-muted">Touch ID or Face ID</div>
                  </div>
                </label>
              </div>
            </div>

            {/* Payment Form */}
            <PaymentForm
              paymentMethod={paymentMethod}
              onPayment={handlePayment}
              processing={processing}
              total={calculateTotal()}
            />
          </div>
        </div>

        {/* Booking Summary */}
        <div className="lg:col-span-1">
          <BookingSummary
            train={state.selectedTrain}
            searchParams={state.searchParams}
            selectedSeats={[]} // You can pass selected seats here if available
          />
        </div>
      </div>
    </div>
  )
}

export default Payment

function BookingSummary({ train, searchParams, selectedSeats = [] }) {
  const calculateTotal = () => {
    const basePrice = train.price * searchParams.passengers
    const seatUpgrade = selectedSeats.length * 50 // Window seats cost ₹50 extra
    const taxes = Math.round(basePrice * 0.18) // 18% GST for India
    return basePrice + seatUpgrade + taxes
  }

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours}h ${mins}m`
  }

  return (
    <div className="card sticky top-4">
      <h3 className="text-lg font-semibold mb-4">Booking Summary</h3>

      {/* Train Details */}
      <div className="space-y-3 mb-6">
        <div>
          <h4 className="font-medium">{train.name}</h4>
          <p className="text-sm text-muted">Train #{train.number}</p>
        </div>

        <div className="flex justify-between items-center py-2 border-b border-border">
          <div>
            <div className="font-medium">{train.departureTime}</div>
            <div className="text-sm text-muted">{searchParams.from}</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-muted">{formatDuration(train.duration)}</div>
            <div className="w-8 h-px bg-border"></div>
          </div>
          <div className="text-right">
            <div className="font-medium">{train.arrivalTime}</div>
            <div className="text-sm text-muted">{searchParams.to}</div>
          </div>
        </div>

        <div className="text-sm text-secondary">
          <div>Date: {searchParams.departureDate}</div>
          <div>Passengers: {searchParams.passengers}</div>
        </div>
      </div>

      {/* Selected Seats */}
      {selectedSeats.length > 0 && (
        <div className="mb-6">
          <h4 className="font-medium mb-2">Selected Seats</h4>
          <div className="flex flex-wrap gap-1">
            {selectedSeats.map((seat) => (
              <span key={seat} className="px-2 py-1 bg-surface text-xs rounded">
                {seat}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Price Breakdown */}
      <div className="space-y-2 mb-4">
        <div className="flex justify-between">
          <span>
            Base fare ({searchParams.passengers} × ₹{train.price})
          </span>
          <span>₹{train.price * searchParams.passengers}</span>
        </div>

        {selectedSeats.length > 0 && (
          <div className="flex justify-between">
            <span>Seat upgrade</span>
            <span>+₹{selectedSeats.length * 50}</span>
          </div>
        )}

        <div className="flex justify-between">
          <span>GST (18%)</span>
          <span>+₹{Math.round(train.price * searchParams.passengers * 0.18)}</span>
        </div>

        <div className="border-t border-border pt-2 flex justify-between font-semibold text-lg">
          <span>Total</span>
          <span className="text-primary">₹{calculateTotal()}</span>
        </div>
      </div>

      {/* Policies */}
      <div className="text-xs text-muted space-y-1">
        <p>• Free cancellation up to 24 hours before departure</p>
        <p>• Partial refund available up to 2 hours before departure</p>
        <p>• Please arrive at station 30 minutes early</p>
      </div>
    </div>
  )
}

export default BookingSummary

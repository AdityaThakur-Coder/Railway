"use client"

import { useState, useEffect } from "react"

function SeatSelection({ train, passengerCount, onSeatSelection, selectedSeats }) {
  const [seatMap, setSeatMap] = useState([])
  const [currentSelection, setCurrentSelection] = useState(selectedSeats || [])

  useEffect(() => {
    // Generate seat map (simplified for demo)
    const generateSeatMap = () => {
      const coaches = ["A", "B", "C", "D"]
      const seatsPerCoach = 72 // 18 rows x 4 seats
      const map = []

      coaches.forEach((coach) => {
        const coachSeats = []
        for (let row = 1; row <= 18; row++) {
          const rowSeats = []
          for (let seat = 1; seat <= 4; seat++) {
            const seatNumber = `${coach}${row}-${seat}`
            const isOccupied = Math.random() < 0.3 // 30% occupied
            const isWindow = seat === 1 || seat === 4
            const isAisle = seat === 2 || seat === 3

            rowSeats.push({
              number: seatNumber,
              row,
              seat,
              coach,
              isOccupied,
              isWindow,
              isAisle,
              price: isWindow ? train.price + 50 : train.price, // Window seat premium in INR
            })
          }
          coachSeats.push(rowSeats)
        }
        map.push({ coach, seats: coachSeats })
      })
      return map
    }

    setSeatMap(generateSeatMap())
  }, [train])

  const handleSeatClick = (seatInfo) => {
    if (seatInfo.isOccupied) return

    const seatNumber = seatInfo.number
    const isSelected = currentSelection.includes(seatNumber)

    let newSelection
    if (isSelected) {
      newSelection = currentSelection.filter((seat) => seat !== seatNumber)
    } else {
      if (currentSelection.length < passengerCount) {
        newSelection = [...currentSelection, seatNumber]
      } else {
        // Replace the first selected seat
        newSelection = [...currentSelection.slice(1), seatNumber]
      }
    }

    setCurrentSelection(newSelection)
    onSeatSelection(newSelection)
  }

  const getSeatClass = (seatInfo) => {
    const baseClass =
      "w-8 h-8 rounded border-2 cursor-pointer text-xs flex items-center justify-center font-medium transition-all"

    if (seatInfo.isOccupied) {
      return `${baseClass} bg-error border-error text-white cursor-not-allowed`
    }

    if (currentSelection.includes(seatInfo.number)) {
      return `${baseClass} bg-primary border-primary text-white`
    }

    if (seatInfo.isWindow) {
      return `${baseClass} bg-surface border-success text-success hover:bg-success hover:text-white`
    }

    return `${baseClass} bg-surface border-border text-secondary hover:border-primary hover:text-primary`
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Select Seats</h2>
        <p className="text-secondary">
          Choose {passengerCount} seat{passengerCount > 1 ? "s" : ""} for your journey
        </p>
      </div>

      {/* Legend */}
      <div className="card">
        <h3 className="font-semibold mb-3">Seat Legend</h3>
        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-surface border-2 border-border rounded"></div>
            <span>Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-surface border-2 border-success rounded"></div>
            <span>Window (+₹50)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-primary border-2 border-primary rounded"></div>
            <span>Selected</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-error border-2 border-error rounded"></div>
            <span>Occupied</span>
          </div>
        </div>
      </div>

      {/* Seat Map */}
      <div className="space-y-8">
        {seatMap.map(({ coach, seats }) => (
          <div key={coach} className="card">
            <h3 className="font-semibold mb-4 text-center">Coach {coach}</h3>
            <div className="space-y-2">
              {seats.map((row, rowIndex) => (
                <div key={rowIndex} className="flex items-center justify-center gap-2">
                  <span className="text-xs text-muted w-6 text-center">{rowIndex + 1}</span>
                  <div className="flex gap-1">
                    {row.slice(0, 2).map((seat) => (
                      <button
                        key={seat.number}
                        onClick={() => handleSeatClick(seat)}
                        className={getSeatClass(seat)}
                        disabled={seat.isOccupied}
                        title={`Seat ${seat.number} - ${seat.isWindow ? "Window" : "Aisle"} - ₹${seat.price}`} // Updated to show INR
                      >
                        {seat.seat}
                      </button>
                    ))}
                  </div>
                  <div className="w-4"></div> {/* Aisle space */}
                  <div className="flex gap-1">
                    {row.slice(2, 4).map((seat) => (
                      <button
                        key={seat.number}
                        onClick={() => handleSeatClick(seat)}
                        className={getSeatClass(seat)}
                        disabled={seat.isOccupied}
                        title={`Seat ${seat.number} - ${seat.isWindow ? "Window" : "Aisle"} - ₹${seat.price}`} // Updated to show INR
                      >
                        {seat.seat}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Selection Summary */}
      {currentSelection.length > 0 && (
        <div className="card bg-primary/10 border-primary">
          <h3 className="font-semibold mb-2">Selected Seats</h3>
          <div className="flex flex-wrap gap-2">
            {currentSelection.map((seat) => (
              <span key={seat} className="px-3 py-1 bg-primary text-white rounded-full text-sm">
                {seat}
              </span>
            ))}
          </div>
          <p className="text-sm text-muted mt-2">
            {passengerCount - currentSelection.length} more seat
            {passengerCount - currentSelection.length !== 1 ? "s" : ""} needed
          </p>
        </div>
      )}
    </div>
  )
}

export default SeatSelection

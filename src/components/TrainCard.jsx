"use client"

function TrainCard({ train, onSelect }) {
  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours}h ${mins}m`
  }

  const getTrainTypeColor = (type) => {
    switch (type) {
      case "express":
        return "text-primary"
      case "local":
        return "text-warning"
      case "premium":
        return "text-success"
      default:
        return "text-secondary"
    }
  }

  return (
    <div className="card hover:border-primary transition-all cursor-pointer" onClick={onSelect}>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Train Info */}
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-lg font-semibold">{train.name}</h3>
            <span className={`text-xs px-2 py-1 rounded-full bg-surface border ${getTrainTypeColor(train.type)}`}>
              {train.type.toUpperCase()}
            </span>
          </div>
          <p className="text-sm text-muted">Train #{train.number}</p>
        </div>

        {/* Time & Duration */}
        <div className="flex items-center gap-6">
          <div className="text-center">
            <div className="text-xl font-bold">{train.departureTime}</div>
            <div className="text-sm text-muted">{train.from}</div>
          </div>

          <div className="flex flex-col items-center">
            <div className="text-sm text-muted">{formatDuration(train.duration)}</div>
            <div className="w-16 h-px bg-border my-1"></div>
            <div className="text-xs text-muted">{train.stops} stops</div>
          </div>

          <div className="text-center">
            <div className="text-xl font-bold">{train.arrivalTime}</div>
            <div className="text-sm text-muted">{train.to}</div>
          </div>
        </div>

        {/* Price & Book */}
        <div className="text-center md:text-right">
          <div className="text-2xl font-bold text-primary mb-2">₹{train.price}</div>
          <div className="text-sm text-muted mb-3">{train.availableSeats} seats left</div>
          <button className="btn btn-primary">Select Train</button>
        </div>
      </div>

      {/* Amenities */}
      <div className="flex gap-4 mt-4 pt-4 border-t border-border">
        {train.amenities.map((amenity, index) => (
          <span key={index} className="text-xs text-muted flex items-center gap-1">
            {amenity.icon} {amenity.name}
          </span>
        ))}
      </div>
    </div>
  )
}

export default TrainCard

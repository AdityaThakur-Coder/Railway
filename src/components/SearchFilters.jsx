"use client"

function SearchFilters({ filters, onFiltersChange }) {
  const handleFilterChange = (key, value) => {
    onFiltersChange((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className="card">
      <h3 className="text-lg font-semibold mb-6">Filters</h3>

      {/* Price Range */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-3">Price Range</label>
        <div className="space-y-2">
          <input
            type="range"
            min="0"
            max="500"
            value={filters.priceRange[1]}
            onChange={(e) => handleFilterChange("priceRange", [0, Number.parseInt(e.target.value)])}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-muted">
            <span>₹0</span>
            <span>₹{filters.priceRange[1]}</span>
          </div>
        </div>
      </div>

      {/* Departure Time */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-3">Departure Time</label>
        <select
          value={filters.departureTime}
          onChange={(e) => handleFilterChange("departureTime", e.target.value)}
          className="input"
        >
          <option value="any">Any time</option>
          <option value="morning">Morning (6AM - 12PM)</option>
          <option value="afternoon">Afternoon (12PM - 6PM)</option>
          <option value="evening">Evening (6PM - 12AM)</option>
          <option value="night">Night (12AM - 6AM)</option>
        </select>
      </div>

      {/* Train Type */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-3">Train Type</label>
        <select
          value={filters.trainType}
          onChange={(e) => handleFilterChange("trainType", e.target.value)}
          className="input"
        >
          <option value="any">Any type</option>
          <option value="express">Express</option>
          <option value="local">Local</option>
          <option value="premium">Premium</option>
        </select>
      </div>

      {/* Duration */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-3">Sort by Duration</label>
        <select
          value={filters.duration}
          onChange={(e) => handleFilterChange("duration", e.target.value)}
          className="input"
        >
          <option value="any">Any duration</option>
          <option value="shortest">Shortest first</option>
          <option value="longest">Longest first</option>
        </select>
      </div>

      {/* Reset Filters */}
      <button
        onClick={() =>
          onFiltersChange({
            priceRange: [0, 500],
            departureTime: "any",
            trainType: "any",
            duration: "any",
          })
        }
        className="btn btn-secondary w-full"
      >
        Reset Filters
      </button>
    </div>
  )
}

export default SearchFilters

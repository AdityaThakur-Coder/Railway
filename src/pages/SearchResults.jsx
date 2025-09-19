"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useBooking } from "../context/BookingContext"
import TrainCard from "../components/TrainCard"
import SearchFilters from "../components/SearchFilters"
import { generateMockTrains } from "../utils/mockData"

function SearchResults() {
  const navigate = useNavigate()
  const { state, dispatch } = useBooking()
  const [trains, setTrains] = useState([])
  const [filteredTrains, setFilteredTrains] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    priceRange: [0, 500],
    departureTime: "any",
    trainType: "any",
    duration: "any",
  })

  useEffect(() => {
    // Redirect if no search params
    if (!state.searchParams.from || !state.searchParams.to) {
      navigate("/")
      return
    }

    // Simulate API call
    const fetchTrains = async () => {
      setLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 1500)) // Simulate loading
      const mockTrains = generateMockTrains(state.searchParams)
      setTrains(mockTrains)
      setFilteredTrains(mockTrains)
      setLoading(false)
    }

    fetchTrains()
  }, [state.searchParams, navigate])

  useEffect(() => {
    // Apply filters
    const filtered = trains.filter((train) => {
      const price = train.price
      const departureHour = Number.parseInt(train.departureTime.split(":")[0])

      // Price filter
      if (price < filters.priceRange[0] || price > filters.priceRange[1]) return false

      // Departure time filter
      if (filters.departureTime !== "any") {
        if (filters.departureTime === "morning" && (departureHour < 6 || departureHour >= 12)) return false
        if (filters.departureTime === "afternoon" && (departureHour < 12 || departureHour >= 18)) return false
        if (filters.departureTime === "evening" && (departureHour < 18 || departureHour >= 24)) return false
        if (filters.departureTime === "night" && departureHour >= 6) return false
      }

      // Train type filter
      if (filters.trainType !== "any" && train.type !== filters.trainType) return false

      return true
    })

    // Sort by duration if specified
    if (filters.duration === "shortest") {
      filtered.sort((a, b) => a.duration - b.duration)
    } else if (filters.duration === "longest") {
      filtered.sort((a, b) => b.duration - a.duration)
    }

    setFilteredTrains(filtered)
  }, [trains, filters])

  const handleTrainSelect = (train) => {
    dispatch({ type: "SET_SELECTED_TRAIN", payload: train })
    navigate(`/booking/${train.id}`)
  }

  if (loading) {
    return (
      <div className="container py-8">
        <div className="text-center py-12">
          <div className="loading text-4xl mb-4">🔍</div>
          <h2 className="text-xl font-semibold mb-2">Searching for trains...</h2>
          <p className="text-muted">Finding the best options for your journey</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-8">
      {/* Search Summary */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">
          {state.searchParams.from} → {state.searchParams.to}
        </h1>
        <p className="text-secondary">
          {state.searchParams.departureDate} • {state.searchParams.passengers} passenger
          {state.searchParams.passengers > 1 ? "s" : ""}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1">
          <SearchFilters filters={filters} onFiltersChange={setFilters} />
        </div>

        {/* Results */}
        <div className="lg:col-span-3">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">
              {filteredTrains.length} train{filteredTrains.length !== 1 ? "s" : ""} found
            </h2>
            <select className="input max-w-xs">
              <option>Sort by departure time</option>
              <option>Sort by price (low to high)</option>
              <option>Sort by price (high to low)</option>
              <option>Sort by duration</option>
            </select>
          </div>

          {filteredTrains.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-4xl mb-4">😔</div>
              <h3 className="text-xl font-semibold mb-2">No trains found</h3>
              <p className="text-muted">Try adjusting your filters or search criteria</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredTrains.map((train) => (
                <TrainCard key={train.id} train={train} onSelect={() => handleTrainSelect(train)} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SearchResults

"use client"

import { useState } from "react"
import { format } from "date-fns"

function SearchForm({ onSearch }) {
  const [formData, setFormData] = useState({
    from: "",
    to: "",
    departureDate: "",
    returnDate: "",
    passengers: 1,
    tripType: "one-way",
  })

  const [errors, setErrors] = useState({})

  const cities = [
    "Mumbai",
    "Delhi",
    "Bangalore",
    "Chennai",
    "Kolkata",
    "Hyderabad",
    "Pune",
    "Ahmedabad",
    "Jaipur",
    "Lucknow",
    "Kanpur",
    "Nagpur",
    "Indore",
    "Thane",
    "Bhopal",
    "Visakhapatnam",
    "Patna",
    "Vadodara",
    "Ghaziabad",
    "Ludhiana",
  ]

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.from) newErrors.from = "Please select departure city"
    if (!formData.to) newErrors.to = "Please select destination city"
    if (formData.from === formData.to) newErrors.to = "Destination must be different from departure"
    if (!formData.departureDate) newErrors.departureDate = "Please select departure date"
    if (formData.tripType === "round-trip" && !formData.returnDate) {
      newErrors.returnDate = "Please select return date"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      onSearch(formData)
    }
  }

  const swapCities = () => {
    setFormData((prev) => ({
      ...prev,
      from: prev.to,
      to: prev.from,
    }))
  }

  return (
    <div className="card">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Trip Type Toggle */}
        <div className="flex gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="tripType"
              value="one-way"
              checked={formData.tripType === "one-way"}
              onChange={(e) => handleInputChange("tripType", e.target.value)}
              className="text-primary"
            />
            <span className="text-sm font-medium">One Way</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="tripType"
              value="round-trip"
              checked={formData.tripType === "round-trip"}
              onChange={(e) => handleInputChange("tripType", e.target.value)}
              className="text-primary"
            />
            <span className="text-sm font-medium">Round Trip</span>
          </label>
        </div>

        {/* Cities Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative">
          <div>
            <label className="block text-sm font-medium mb-2">From</label>
            <select
              value={formData.from}
              onChange={(e) => handleInputChange("from", e.target.value)}
              className={`input ${errors.from ? "border-error" : ""}`}
            >
              <option value="">Select departure city</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
            {errors.from && <p className="text-error text-xs mt-1">{errors.from}</p>}
          </div>

          {/* Swap Button */}
          <div className="absolute left-1/2 top-8 transform -translate-x-1/2 z-10 hidden md:block">
            <button
              type="button"
              onClick={swapCities}
              className="btn btn-secondary p-2 rounded-full"
              title="Swap cities"
            >
              ⇄
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">To</label>
            <select
              value={formData.to}
              onChange={(e) => handleInputChange("to", e.target.value)}
              className={`input ${errors.to ? "border-error" : ""}`}
            >
              <option value="">Select destination city</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
            {errors.to && <p className="text-error text-xs mt-1">{errors.to}</p>}
          </div>
        </div>

        {/* Dates Selection */}
        <div
          className={`grid gap-4 ${formData.tripType === "round-trip" ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"}`}
        >
          <div>
            <label className="block text-sm font-medium mb-2">Departure Date</label>
            <input
              type="date"
              value={formData.departureDate}
              onChange={(e) => handleInputChange("departureDate", e.target.value)}
              min={format(new Date(), "yyyy-MM-dd")}
              className={`input ${errors.departureDate ? "border-error" : ""}`}
            />
            {errors.departureDate && <p className="text-error text-xs mt-1">{errors.departureDate}</p>}
          </div>

          {formData.tripType === "round-trip" && (
            <div>
              <label className="block text-sm font-medium mb-2">Return Date</label>
              <input
                type="date"
                value={formData.returnDate}
                onChange={(e) => handleInputChange("returnDate", e.target.value)}
                min={formData.departureDate || format(new Date(), "yyyy-MM-dd")}
                className={`input ${errors.returnDate ? "border-error" : ""}`}
              />
              {errors.returnDate && <p className="text-error text-xs mt-1">{errors.returnDate}</p>}
            </div>
          )}
        </div>

        {/* Passengers */}
        <div>
          <label className="block text-sm font-medium mb-2">Passengers</label>
          <select
            value={formData.passengers}
            onChange={(e) => handleInputChange("passengers", Number.parseInt(e.target.value))}
            className="input max-w-xs"
          >
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <option key={num} value={num}>
                {num} {num === 1 ? "Passenger" : "Passengers"}
              </option>
            ))}
          </select>
        </div>

        {/* Search Button */}
        <button type="submit" className="btn btn-primary btn-lg w-full">
          Search Trains
        </button>
      </form>
    </div>
  )
}

export default SearchForm

"use client"

function PassengerForm({ passengers, onPassengerUpdate }) {
  const handleInputChange = (index, field, value) => {
    const updatedPassenger = { ...passengers[index], [field]: value }
    onPassengerUpdate(index, updatedPassenger)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Passenger Details</h2>
        <p className="text-secondary">Please provide details for all passengers</p>
      </div>

      {passengers.map((passenger, index) => (
        <div key={passenger.id} className="card">
          <h3 className="text-lg font-semibold mb-4">
            Passenger {index + 1}
            {index === 0 && <span className="text-sm text-muted ml-2">(Primary Contact)</span>}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* First Name */}
            <div>
              <label className="block text-sm font-medium mb-2">First Name *</label>
              <input
                type="text"
                value={passenger.firstName}
                onChange={(e) => handleInputChange(index, "firstName", e.target.value)}
                className="input"
                placeholder="Enter first name"
                required
              />
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-sm font-medium mb-2">Last Name *</label>
              <input
                type="text"
                value={passenger.lastName}
                onChange={(e) => handleInputChange(index, "lastName", e.target.value)}
                className="input"
                placeholder="Enter last name"
                required
              />
            </div>

            {/* Age */}
            <div>
              <label className="block text-sm font-medium mb-2">Age *</label>
              <input
                type="number"
                value={passenger.age}
                onChange={(e) => handleInputChange(index, "age", e.target.value)}
                className="input"
                placeholder="Enter age"
                min="1"
                max="120"
                required
              />
            </div>

            {/* Gender */}
            <div>
              <label className="block text-sm font-medium mb-2">Gender *</label>
              <select
                value={passenger.gender}
                onChange={(e) => handleInputChange(index, "gender", e.target.value)}
                className="input"
                required
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Email (only for primary passenger) */}
            {index === 0 && (
              <div>
                <label className="block text-sm font-medium mb-2">Email *</label>
                <input
                  type="email"
                  value={passenger.email}
                  onChange={(e) => handleInputChange(index, "email", e.target.value)}
                  className="input"
                  placeholder="Enter email address"
                  required
                />
              </div>
            )}

            {/* Phone (only for primary passenger) */}
            {index === 0 && (
              <div>
                <label className="block text-sm font-medium mb-2">Phone *</label>
                <input
                  type="tel"
                  value={passenger.phone}
                  onChange={(e) => handleInputChange(index, "phone", e.target.value)}
                  className="input"
                  placeholder="Enter phone number"
                  required
                />
              </div>
            )}

            {/* Seat Preference */}
            <div className={index === 0 ? "md:col-span-2" : "md:col-span-2"}>
              <label className="block text-sm font-medium mb-2">Seat Preference</label>
              <select
                value={passenger.seatPreference}
                onChange={(e) => handleInputChange(index, "seatPreference", e.target.value)}
                className="input"
              >
                <option value="any">Any seat</option>
                <option value="window">Window seat</option>
                <option value="aisle">Aisle seat</option>
                <option value="middle">Middle seat</option>
              </select>
            </div>
          </div>
        </div>
      ))}

      <div className="card bg-surface border-warning">
        <div className="flex gap-3">
          <div className="text-warning text-xl">⚠️</div>
          <div>
            <h4 className="font-medium mb-1">Important Information</h4>
            <ul className="text-sm text-secondary space-y-1">
              <li>• Please ensure all passenger names match their government-issued ID</li>
              <li>• Children under 5 years travel free (without seat reservation)</li>
              <li>• Senior citizens (60+) are eligible for discounts</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PassengerForm

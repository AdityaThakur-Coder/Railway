export function generateMockTrains(searchParams) {
  const trainNames = [
    "Rajdhani Express",
    "Shatabdi Express",
    "Duronto Express",
    "Garib Rath Express",
    "Jan Shatabdi Express",
    "Vande Bharat Express",
    "Humsafar Express",
    "Tejas Express",
    "Gatimaan Express",
    "Sampark Kranti Express",
  ]

  const trainTypes = ["express", "local", "premium"]

  const amenities = [
    { icon: "🍽️", name: "Dining" },
    { icon: "📶", name: "WiFi" },
    { icon: "🔌", name: "Power" },
    { icon: "❄️", name: "AC" },
    { icon: "🛏️", name: "Sleeper" },
    { icon: "♿", name: "Accessible" },
  ]

  const trains = []

  for (let i = 0; i < 12; i++) {
    const departureHour = Math.floor(Math.random() * 24)
    const departureMinute = Math.floor(Math.random() * 60)
    const duration = 120 + Math.floor(Math.random() * 480) // 2-10 hours
    const arrivalTime = new Date()
    arrivalTime.setHours(departureHour)
    arrivalTime.setMinutes(departureMinute + duration)

    const train = {
      id: `train-${i + 1}`,
      name: trainNames[Math.floor(Math.random() * trainNames.length)],
      number: `${Math.floor(Math.random() * 90000) + 10000}`, // Updated to 5-digit Indian train numbers
      type: trainTypes[Math.floor(Math.random() * trainTypes.length)],
      from: searchParams.from,
      to: searchParams.to,
      departureTime: `${departureHour.toString().padStart(2, "0")}:${departureMinute.toString().padStart(2, "0")}`,
      arrivalTime: `${arrivalTime.getHours().toString().padStart(2, "0")}:${arrivalTime.getMinutes().toString().padStart(2, "0")}`,
      duration: duration,
      price: 200 + Math.floor(Math.random() * 2500), // Updated price range to Indian Rupees equivalent
      availableSeats: Math.floor(Math.random() * 50) + 10,
      stops: Math.floor(Math.random() * 8) + 1,
      amenities: amenities.slice(0, Math.floor(Math.random() * 4) + 2),
    }

    trains.push(train)
  }

  return trains.sort((a, b) => a.departureTime.localeCompare(b.departureTime))
}

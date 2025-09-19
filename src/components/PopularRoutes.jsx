function PopularRoutes() {
  const routes = [
    { from: "Mumbai", to: "Delhi", duration: "15h 50m", price: "₹2,450" },
    { from: "Delhi", to: "Kolkata", duration: "17h 05m", price: "₹2,180" },
    { from: "Chennai", to: "Bangalore", duration: "4h 45m", price: "₹890" },
    { from: "Mumbai", to: "Pune", duration: "3h 15m", price: "₹650" },
    { from: "Delhi", to: "Jaipur", duration: "4h 30m", price: "₹780" },
    { from: "Hyderabad", to: "Chennai", duration: "12h 45m", price: "₹1,560" },
  ]

  return (
    <section className="py-16">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Popular Routes</h2>
          <p className="text-secondary">Discover the most traveled destinations</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {routes.map((route, index) => (
            <div key={index} className="card hover:border-primary transition-colors cursor-pointer">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-semibold text-lg">{route.from}</h3>
                  <div className="text-muted text-sm">to</div>
                  <h3 className="font-semibold text-lg">{route.to}</h3>
                </div>
                <div className="text-right">
                  <div className="text-primary font-bold text-xl">{route.price}</div>
                  <div className="text-muted text-sm">{route.duration}</div>
                </div>
              </div>
              <button className="btn btn-secondary w-full">View Trains</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default PopularRoutes

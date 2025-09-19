function Features() {
  const features = [
    {
      icon: "🎫",
      title: "Easy Booking",
      description: "Book your tickets in just a few clicks with our intuitive interface",
    },
    {
      icon: "💳",
      title: "Secure Payment",
      description: "Your payment information is protected with bank-level security",
    },
    {
      icon: "📱",
      title: "Mobile Tickets",
      description: "Get your tickets instantly on your phone - no printing required",
    },
    {
      icon: "🕒",
      title: "Real-time Updates",
      description: "Stay informed with live train schedules and platform information",
    },
    {
      icon: "🎯",
      title: "Best Prices",
      description: "We guarantee competitive prices and transparent pricing",
    },
    {
      icon: "🛡️",
      title: "24/7 Support",
      description: "Our customer support team is always ready to help you",
    },
  ]

  return (
    <section className="py-16 bg-surface">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Why Choose RailWay?</h2>
          <p className="text-secondary">Experience the future of train travel booking</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-secondary">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features

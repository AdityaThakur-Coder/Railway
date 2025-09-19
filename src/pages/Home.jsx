import { useNavigate } from "react-router-dom"
import { useBooking } from "../context/BookingContext"
import SearchForm from "../components/SearchForm"
import PopularRoutes from "../components/PopularRoutes"
import Features from "../components/Features"

function Home() {
  const navigate = useNavigate()
  const { dispatch } = useBooking()

  const handleSearch = (searchParams) => {
    dispatch({ type: "SET_SEARCH_PARAMS", payload: searchParams })
    navigate("/search")
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-background to-surface">
        <div className="container">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary">Your Journey Starts Here</h1>
            <p className="text-lg text-secondary max-w-2xl mx-auto">
              Book train tickets across the country with ease. Fast, reliable, and secure booking platform.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <SearchForm onSearch={handleSearch} />
          </div>
        </div>
      </section>

      {/* Popular Routes */}
      <PopularRoutes />

      {/* Features */}
      <Features />
    </div>
  )
}

export default Home

import {
  collection,
  addDoc,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore"
import { db } from "../firebase/config"

// Collections
const BOOKINGS_COLLECTION = "bookings"
const TRAINS_COLLECTION = "trains"
const ROUTES_COLLECTION = "routes"

export const bookingService = {
  // Create a new booking
  async createBooking(bookingData) {
    try {
      const booking = {
        ...bookingData,
        status: "confirmed",
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      }

      const docRef = await addDoc(collection(db, BOOKINGS_COLLECTION), booking)
      return { id: docRef.id, ...booking }
    } catch (error) {
      console.error("Error creating booking:", error)
      throw new Error("Failed to create booking")
    }
  },

  // Get booking by ID
  async getBooking(bookingId) {
    try {
      const docRef = doc(db, BOOKINGS_COLLECTION, bookingId)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() }
      } else {
        throw new Error("Booking not found")
      }
    } catch (error) {
      console.error("Error getting booking:", error)
      throw error
    }
  },

  // Get bookings by email
  async getBookingsByEmail(email) {
    try {
      const q = query(
        collection(db, BOOKINGS_COLLECTION),
        where("passengerDetails.0.email", "==", email),
        orderBy("createdAt", "desc"),
      )

      const querySnapshot = await getDocs(q)
      const bookings = []

      querySnapshot.forEach((doc) => {
        bookings.push({ id: doc.id, ...doc.data() })
      })

      return bookings
    } catch (error) {
      console.error("Error getting bookings by email:", error)
      throw new Error("Failed to fetch bookings")
    }
  },

  // Update booking status
  async updateBookingStatus(bookingId, status) {
    try {
      const docRef = doc(db, BOOKINGS_COLLECTION, bookingId)
      await updateDoc(docRef, {
        status,
        updatedAt: serverTimestamp(),
      })
      return true
    } catch (error) {
      console.error("Error updating booking status:", error)
      throw new Error("Failed to update booking")
    }
  },

  // Cancel booking
  async cancelBooking(bookingId, reason = "") {
    try {
      const docRef = doc(db, BOOKINGS_COLLECTION, bookingId)
      await updateDoc(docRef, {
        status: "cancelled",
        cancellationReason: reason,
        cancelledAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      })
      return true
    } catch (error) {
      console.error("Error cancelling booking:", error)
      throw new Error("Failed to cancel booking")
    }
  },
}

export const trainService = {
  // Search trains (in a real app, this would query the database)
  async searchTrains(searchParams) {
    try {
      // For demo purposes, we'll use the mock data
      // In a real app, this would query Firebase with the search parameters
      const { generateMockTrains } = await import("../utils/mockData")
      return generateMockTrains(searchParams)
    } catch (error) {
      console.error("Error searching trains:", error)
      throw new Error("Failed to search trains")
    }
  },

  // Get train by ID
  async getTrain(trainId) {
    try {
      const docRef = doc(db, TRAINS_COLLECTION, trainId)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() }
      } else {
        throw new Error("Train not found")
      }
    } catch (error) {
      console.error("Error getting train:", error)
      throw error
    }
  },

  // Get popular routes
  async getPopularRoutes() {
    try {
      const q = query(collection(db, ROUTES_COLLECTION), orderBy("popularity", "desc"))

      const querySnapshot = await getDocs(q)
      const routes = []

      querySnapshot.forEach((doc) => {
        routes.push({ id: doc.id, ...doc.data() })
      })

      return routes.slice(0, 6) // Return top 6 routes
    } catch (error) {
      console.error("Error getting popular routes:", error)
      return [
        { from: "Mumbai", to: "Delhi", duration: "15h 45m", price: "₹2,890" },
        { from: "Bangalore", to: "Chennai", duration: "4h 15m", price: "₹1,560" },
        { from: "Delhi", to: "Kolkata", duration: "17h 30m", price: "₹3,670" },
        { from: "Mumbai", to: "Pune", duration: "3h 45m", price: "₹450" },
        { from: "Chennai", to: "Hyderabad", duration: "12h 20m", price: "₹2,780" },
        { from: "Delhi", to: "Jaipur", duration: "4h 15m", price: "₹920" },
      ]
    }
  },
}

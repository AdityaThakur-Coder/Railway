"use client"

import { createContext, useContext, useReducer } from "react"

const BookingContext = createContext()

const initialState = {
  searchParams: {
    from: "",
    to: "",
    departureDate: "",
    returnDate: "",
    passengers: 1,
    tripType: "one-way",
  },
  selectedTrain: null,
  passengerDetails: [],
  paymentInfo: null,
  bookingConfirmation: null,
}

function bookingReducer(state, action) {
  switch (action.type) {
    case "SET_SEARCH_PARAMS":
      return {
        ...state,
        searchParams: { ...state.searchParams, ...action.payload },
      }
    case "SET_SELECTED_TRAIN":
      return {
        ...state,
        selectedTrain: action.payload,
      }
    case "SET_PASSENGER_DETAILS":
      return {
        ...state,
        passengerDetails: action.payload,
      }
    case "SET_PAYMENT_INFO":
      return {
        ...state,
        paymentInfo: action.payload,
      }
    case "SET_BOOKING_CONFIRMATION":
      return {
        ...state,
        bookingConfirmation: action.payload,
      }
    case "RESET_BOOKING":
      return initialState
    default:
      return state
  }
}

export function BookingProvider({ children }) {
  const [state, dispatch] = useReducer(bookingReducer, initialState)

  return <BookingContext.Provider value={{ state, dispatch }}>{children}</BookingContext.Provider>
}

export function useBooking() {
  const context = useContext(BookingContext)
  if (!context) {
    throw new Error("useBooking must be used within a BookingProvider")
  }
  return context
}

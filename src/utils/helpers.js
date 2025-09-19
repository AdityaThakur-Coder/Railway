// Utility helper functions
export const formatCurrency = (amount, currency = "INR") => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: currency,
  }).format(amount)
}

export const formatDate = (date, options = {}) => {
  const defaultOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  }

  return new Intl.DateTimeFormat("en-IN", { ...defaultOptions, ...options }).format(new Date(date))
}

export const formatTime = (time) => {
  const [hours, minutes] = time.split(":")
  const hour = Number.parseInt(hours)
  const ampm = hour >= 12 ? "PM" : "AM"
  const displayHour = hour % 12 || 12

  return `${displayHour}:${minutes} ${ampm}`
}

export const calculateDuration = (departureTime, arrivalTime) => {
  const [depHours, depMinutes] = departureTime.split(":").map(Number)
  const [arrHours, arrMinutes] = arrivalTime.split(":").map(Number)

  const depTotalMinutes = depHours * 60 + depMinutes
  let arrTotalMinutes = arrHours * 60 + arrMinutes

  // Handle next day arrival
  if (arrTotalMinutes < depTotalMinutes) {
    arrTotalMinutes += 24 * 60
  }

  return arrTotalMinutes - depTotalMinutes
}

export const formatDuration = (minutes) => {
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  return `${hours}h ${mins}m`
}

export const generateBookingId = () => {
  const timestamp = Date.now().toString(36)
  const randomStr = Math.random().toString(36).substring(2, 8)
  return `RW${timestamp}${randomStr}`.toUpperCase()
}

export const generatePaymentId = () => {
  const timestamp = Date.now().toString(36)
  const randomStr = Math.random().toString(36).substring(2, 10)
  return `PAY${timestamp}${randomStr}`.toUpperCase()
}

export const debounce = (func, wait) => {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

export const throttle = (func, limit) => {
  let inThrottle
  return function () {
    const args = arguments

    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

export const getTrainTypeColor = (type) => {
  switch (type.toLowerCase()) {
    case "express":
      return "text-primary"
    case "local":
      return "text-warning"
    case "premium":
      return "text-success"
    default:
      return "text-secondary"
  }
}

export const getStatusColor = (status) => {
  switch (status.toLowerCase()) {
    case "confirmed":
      return "text-success"
    case "cancelled":
      return "text-error"
    case "pending":
      return "text-warning"
    default:
      return "text-secondary"
  }
}

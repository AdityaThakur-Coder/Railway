// Form validation utilities
export const validators = {
  email: (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  },

  phone: (phone) => {
    const phoneRegex = /^\+?[\d\s\-$$$$]{10,}$/
    return phoneRegex.test(phone)
  },

  cardNumber: (cardNumber) => {
    const cleaned = cardNumber.replace(/\s/g, "")
    return cleaned.length >= 16 && /^\d+$/.test(cleaned)
  },

  expiryDate: (expiryDate) => {
    const regex = /^(0[1-9]|1[0-2])\/\d{2}$/
    if (!regex.test(expiryDate)) return false

    const [month, year] = expiryDate.split("/")
    const expiry = new Date(2000 + Number.parseInt(year), Number.parseInt(month) - 1)
    const now = new Date()

    return expiry > now
  },

  cvv: (cvv) => {
    return /^\d{3,4}$/.test(cvv)
  },

  required: (value) => {
    return value && value.toString().trim().length > 0
  },

  minLength: (value, min) => {
    return value && value.toString().length >= min
  },

  maxLength: (value, max) => {
    return !value || value.toString().length <= max
  },

  age: (age) => {
    const numAge = Number.parseInt(age)
    return numAge >= 1 && numAge <= 120
  },
}

export const validateBookingForm = (passengerDetails) => {
  const errors = {}

  passengerDetails.forEach((passenger, index) => {
    const passengerErrors = {}

    if (!validators.required(passenger.firstName)) {
      passengerErrors.firstName = "First name is required"
    }

    if (!validators.required(passenger.lastName)) {
      passengerErrors.lastName = "Last name is required"
    }

    if (!validators.required(passenger.age) || !validators.age(passenger.age)) {
      passengerErrors.age = "Valid age is required"
    }

    if (!validators.required(passenger.gender)) {
      passengerErrors.gender = "Gender is required"
    }

    // Primary passenger needs email and phone
    if (index === 0) {
      if (!validators.required(passenger.email) || !validators.email(passenger.email)) {
        passengerErrors.email = "Valid email is required"
      }

      if (!validators.required(passenger.phone) || !validators.phone(passenger.phone)) {
        passengerErrors.phone = "Valid phone number is required"
      }
    }

    if (Object.keys(passengerErrors).length > 0) {
      errors[`passenger_${index}`] = passengerErrors
    }
  })

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  }
}

"use client"

import { useState } from "react"

function PaymentForm({ paymentMethod, onPayment, processing, total }) {
  const [formData, setFormData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
    billingAddress: {
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "IN", // Changed default country to India
    },
  })

  const [errors, setErrors] = useState({})

  const handleInputChange = (field, value) => {
    if (field.includes(".")) {
      const [parent, child] = field.split(".")
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }))
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }))
    }

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ""
    const parts = []
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }
    if (parts.length) {
      return parts.join(" ")
    } else {
      return v
    }
  }

  const formatExpiryDate = (value) => {
    const v = value.replace(/\D/g, "")
    if (v.length >= 2) {
      return v.substring(0, 2) + "/" + v.substring(2, 4)
    }
    return v
  }

  const validateForm = () => {
    const newErrors = {}

    if (paymentMethod === "card") {
      if (!formData.cardNumber || formData.cardNumber.replace(/\s/g, "").length < 16) {
        newErrors.cardNumber = "Please enter a valid card number"
      }
      if (!formData.expiryDate || formData.expiryDate.length < 5) {
        newErrors.expiryDate = "Please enter expiry date (MM/YY)"
      }
      if (!formData.cvv || formData.cvv.length < 3) {
        newErrors.cvv = "Please enter CVV"
      }
      if (!formData.cardholderName) {
        newErrors.cardholderName = "Please enter cardholder name"
      }
      if (!formData.billingAddress.street) {
        newErrors["billingAddress.street"] = "Please enter street address"
      }
      if (!formData.billingAddress.city) {
        newErrors["billingAddress.city"] = "Please enter city"
      }
      if (!formData.billingAddress.zipCode) {
        newErrors["billingAddress.zipCode"] = "Please enter ZIP code"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      onPayment(formData)
    }
  }

  if (paymentMethod === "paypal") {
    return (
      <div className="card text-center py-8">
        <div className="text-4xl mb-4">💳</div>
        <h3 className="text-lg font-semibold mb-2">PayPal Payment</h3>
        <p className="text-secondary mb-6">You will be redirected to PayPal to complete your payment</p>
        <button
          onClick={() => onPayment({ method: "paypal" })}
          disabled={processing}
          className="btn btn-primary btn-lg"
        >
          {processing ? "Processing..." : `Pay ₹${total} with PayPal`}
        </button>
      </div>
    )
  }

  if (paymentMethod === "apple") {
    return (
      <div className="card text-center py-8">
        <div className="text-4xl mb-4">📱</div>
        <h3 className="text-lg font-semibold mb-2">Apple Pay</h3>
        <p className="text-secondary mb-6">Use Touch ID or Face ID to complete your payment</p>
        <button onClick={() => onPayment({ method: "apple" })} disabled={processing} className="btn btn-primary btn-lg">
          {processing ? "Processing..." : `Pay ₹${total} with Apple Pay`}
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="card">
      <h3 className="font-semibold mb-6">Card Information</h3>

      <div className="space-y-4">
        {/* Card Number */}
        <div>
          <label className="block text-sm font-medium mb-2">Card Number *</label>
          <input
            type="text"
            value={formData.cardNumber}
            onChange={(e) => handleInputChange("cardNumber", formatCardNumber(e.target.value))}
            className={`input ${errors.cardNumber ? "border-error" : ""}`}
            placeholder="1234 5678 9012 3456"
            maxLength="19"
          />
          {errors.cardNumber && <p className="text-error text-xs mt-1">{errors.cardNumber}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Expiry Date */}
          <div>
            <label className="block text-sm font-medium mb-2">Expiry Date *</label>
            <input
              type="text"
              value={formData.expiryDate}
              onChange={(e) => handleInputChange("expiryDate", formatExpiryDate(e.target.value))}
              className={`input ${errors.expiryDate ? "border-error" : ""}`}
              placeholder="MM/YY"
              maxLength="5"
            />
            {errors.expiryDate && <p className="text-error text-xs mt-1">{errors.expiryDate}</p>}
          </div>

          {/* CVV */}
          <div>
            <label className="block text-sm font-medium mb-2">CVV *</label>
            <input
              type="text"
              value={formData.cvv}
              onChange={(e) => handleInputChange("cvv", e.target.value.replace(/\D/g, "").substring(0, 4))}
              className={`input ${errors.cvv ? "border-error" : ""}`}
              placeholder="123"
              maxLength="4"
            />
            {errors.cvv && <p className="text-error text-xs mt-1">{errors.cvv}</p>}
          </div>
        </div>

        {/* Cardholder Name */}
        <div>
          <label className="block text-sm font-medium mb-2">Cardholder Name *</label>
          <input
            type="text"
            value={formData.cardholderName}
            onChange={(e) => handleInputChange("cardholderName", e.target.value)}
            className={`input ${errors.cardholderName ? "border-error" : ""}`}
            placeholder="John Doe"
          />
          {errors.cardholderName && <p className="text-error text-xs mt-1">{errors.cardholderName}</p>}
        </div>

        {/* Billing Address */}
        <div>
          <h4 className="font-medium mb-3">Billing Address</h4>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium mb-2">Street Address *</label>
              <input
                type="text"
                value={formData.billingAddress.street}
                onChange={(e) => handleInputChange("billingAddress.street", e.target.value)}
                className={`input ${errors["billingAddress.street"] ? "border-error" : ""}`}
                placeholder="123 Main Street"
              />
              {errors["billingAddress.street"] && (
                <p className="text-error text-xs mt-1">{errors["billingAddress.street"]}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium mb-2">City *</label>
                <input
                  type="text"
                  value={formData.billingAddress.city}
                  onChange={(e) => handleInputChange("billingAddress.city", e.target.value)}
                  className={`input ${errors["billingAddress.city"] ? "border-error" : ""}`}
                  placeholder="Mumbai" // Changed placeholder from "New York" to "Mumbai"
                />
                {errors["billingAddress.city"] && (
                  <p className="text-error text-xs mt-1">{errors["billingAddress.city"]}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">State</label>
                <input
                  type="text"
                  value={formData.billingAddress.state}
                  onChange={(e) => handleInputChange("billingAddress.state", e.target.value)}
                  className="input"
                  placeholder="Maharashtra" // Changed placeholder from "NY" to "Maharashtra"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium mb-2">ZIP Code *</label>
                <input
                  type="text"
                  value={formData.billingAddress.zipCode}
                  onChange={(e) => handleInputChange("billingAddress.zipCode", e.target.value)}
                  className={`input ${errors["billingAddress.zipCode"] ? "border-error" : ""}`}
                  placeholder="400001" // Changed placeholder from "10001" to Mumbai PIN code
                />
                {errors["billingAddress.zipCode"] && (
                  <p className="text-error text-xs mt-1">{errors["billingAddress.zipCode"]}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Country</label>
                <select
                  value={formData.billingAddress.country}
                  onChange={(e) => handleInputChange("billingAddress.country", e.target.value)}
                  className="input"
                >
                  <option value="IN">India</option>
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="UK">United Kingdom</option>
                  <option value="AU">Australia</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Security Notice */}
        <div className="card bg-surface border-success">
          <div className="flex gap-3">
            <div className="text-success text-xl">🔒</div>
            <div>
              <h4 className="font-medium mb-1">Secure Payment</h4>
              <p className="text-sm text-secondary">
                Your payment information is encrypted and secure. We never store your card details.
              </p>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={processing}
          className="btn btn-primary btn-lg w-full disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {processing ? (
            <div className="flex items-center gap-2">
              <div className="loading">⏳</div>
              Processing Payment...
            </div>
          ) : (
            `Complete Payment - ₹${total}` // Updated to show INR currency
          )}
        </button>
      </div>
    </form>
  )
}

export default PaymentForm

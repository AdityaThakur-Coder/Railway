"use client"

import { useState, useEffect, useCallback } from "react"

export function useAsync(asyncFunction, immediate = true) {
  const [status, setStatus] = useState("idle")
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)

  // The execute function wraps asyncFunction and handles setting state for pending, resolved, and rejected promises
  const execute = useCallback(
    async (...args) => {
      setStatus("pending")
      setData(null)
      setError(null)

      try {
        const response = await asyncFunction(...args)
        setData(response)
        setStatus("resolved")
        return response
      } catch (error) {
        setError(error)
        setStatus("rejected")
        throw error
      }
    },
    [asyncFunction],
  )

  // Call execute if we want to fire it right away
  useEffect(() => {
    if (immediate) {
      execute()
    }
  }, [execute, immediate])

  return {
    execute,
    status,
    data,
    error,
    isIdle: status === "idle",
    isPending: status === "pending",
    isResolved: status === "resolved",
    isRejected: status === "rejected",
  }
}

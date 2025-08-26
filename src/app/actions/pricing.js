'use client'

import { createClient } from "@/utils/supabase/client"
import { useState, useEffect } from "react"

export function AllPricing() {
    const [plans, setPlans] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const supabase = createClient()
  
    useEffect(() => {
      const fetchCourses = async () => {
        const { data, error } = await supabase.from("plans").select("*")
        if (error) setError(error)
        else setPlans(data)
        setLoading(false)
      }
      fetchCourses()
    }, [])
  
    return { plans, loading, error }
}
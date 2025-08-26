'use client'

import { createClient } from "@/utils/supabase/client"
import { CloudHail } from "lucide-react"
import { useState, useEffect } from "react"

export function AllCourses() {
    const [courses, setCourses] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const supabase = createClient()
  
    useEffect(() => {
      const fetchCourses = async () => {
        const { data, error } = await supabase.from("courses").select("*")
        if (error) setError(error)
        else setCourses(data)
        setLoading(false)
      }
      fetchCourses()
    }, [])
  
    return { courses, loading, error }
}

export function OneCourse({ courseSlug }) {
  const [course, setCourse] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const supabase = createClient()

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const { data, error } = await supabase.from("courses").select("*")
        if (error) throw error

        const found = data.find((c) => c.title.toLowerCase().replace(/\s+/g, '-') === courseSlug)
        setCourse(found || null)
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }
    fetchCourse()
  }, [courseSlug])

  return { course, loading, error }
}

export function Chapters({ courseId }) {
  const [chapters, setChapters] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const supabase = createClient()

  useEffect(() => {
    const fetchChapters = async () => {
      try {
        const { data, error } = await supabase
          .from("chapters")
          .select("*")
          .eq("course_id", courseId) // <- filtra los capítulos del curso

        if (error) throw error
        setChapters(data || [])
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    if (courseId) {
      fetchChapters()
    }
  }, [courseId])

  return { chapters, loading, error }
}
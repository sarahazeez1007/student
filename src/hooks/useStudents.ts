import { useState, useEffect } from 'react'
import { supabase, hasSupabaseEnv } from '../lib/supabase'
import { sendStudentWebhook } from '../lib/webhook'
import type { Student } from '../types'
import { MOCK_STUDENTS } from '../mock/students'

export function useStudents() {
  const [students, setStudents] = useState<Student[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const useMock = import.meta.env.MODE === 'development'

  useEffect(() => {
    fetchStudents()
  }, [])

  async function fetchStudents() {
    try {
      setLoading(true)
      setError(null)
      if (useMock || !hasSupabaseEnv || !supabase) {
        // Fallback to local mock data
        setStudents(MOCK_STUDENTS)
        return
      }

      const { data, error } = await supabase
        .from('students')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      if (!data || data.length === 0) {
        setStudents(MOCK_STUDENTS)
      } else {
        setStudents(data)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch students')
      console.error('Error fetching students:', err)
    } finally {
      setLoading(false)
    }
  }

  async function createStudent(student: Omit<Student, 'id' | 'created_at' | 'updated_at'>) {
    try {
      if (useMock || !hasSupabaseEnv || !supabase) {
        const now = new Date().toISOString()
        const newStudent: Student = { id: Math.max(0, ...students.map(s => s.id)) + 1, ...student, created_at: now, updated_at: now }
        setStudents(prev => [newStudent, ...prev])
        return { data: newStudent, error: null }
      }

      const { data, error } = await supabase
        .from('students')
        .insert([student])
        .select()
        .single()

      if (error) throw error

      setStudents(prev => [data, ...prev])
      
      // Send webhook notification
      const webhookResult = await sendStudentWebhook({
        name: data.name,
        program: data.program,
        grad_year: data.grad_year,
        bio: data.bio,
      })
      
      if (!webhookResult.success) {
        console.warn('Student created but webhook failed:', webhookResult.error)
      }
      
      return { data, error: null }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create student'
      console.error('Error creating student:', err)
      return { data: null, error: errorMessage }
    }
  }

  async function updateStudent(id: number, updates: Partial<Student>) {
    try {
      if (useMock || !hasSupabaseEnv || !supabase) {
        const updated = { ...students.find(s => s.id === id)!, ...updates, updated_at: new Date().toISOString() } as Student
        setStudents(prev => prev.map(s => s.id === id ? updated : s))
        return { data: updated, error: null }
      }

      const { data, error } = await supabase
        .from('students')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single()

      if (error) throw error

      setStudents(prev => prev.map(s => s.id === id ? data : s))
      return { data, error: null }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update student'
      console.error('Error updating student:', err)
      return { data: null, error: errorMessage }
    }
  }

  async function deleteStudent(id: number) {
    try {
      if (useMock || !hasSupabaseEnv || !supabase) {
        setStudents(prev => prev.filter(s => s.id !== id))
        return { error: null }
      }

      const { error } = await supabase
        .from('students')
        .delete()
        .eq('id', id)

      if (error) throw error

      setStudents(prev => prev.filter(s => s.id !== id))
      return { error: null }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete student'
      console.error('Error deleting student:', err)
      return { error: errorMessage }
    }
  }

  return {
    students,
    loading,
    error,
    createStudent,
    updateStudent,
    deleteStudent,
    refetch: fetchStudents
  }
}

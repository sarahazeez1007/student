import { useMemo, useState } from 'react'
import type { Student } from '../types'
import { useStudents } from '../hooks/useStudents'

type FormState = {
  name: string
  major: string
  graduationYear: string
  bio: string
}

export default function AdminPage() {
  const { students, createStudent, updateStudent, deleteStudent } = useStudents()
  const [form, setForm] = useState<FormState>({ name: '', major: '', graduationYear: '', bio: '' })
  const [message, setMessage] = useState<string>('')
  const [editingId, setEditingId] = useState<number | null>(null)

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }))
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    const { error } = await createStudent({
      name: form.name,
      program: form.major,
      grad_year: Number(form.graduationYear),
      bio: form.bio,
      skills: [],
    })
    
    if (error) {
      setMessage(`Error: ${error}`)
    } else {
      setForm({ name: '', major: '', graduationYear: '', bio: '' })
      setMessage('Student created successfully!')
    }
  }

  async function onDelete(id: number) {
    const { error } = await deleteStudent(id)
    if (error) {
      setMessage(`Error: ${error}`)
    }
  }

  function onStartEdit(id: number) {
    setEditingId(id)
  }

  async function onSaveEdit(id: number, patch: Partial<Student>) {
    const { error } = await updateStudent(id, patch)
    if (error) {
      setMessage(`Error: ${error}`)
    } else {
      setEditingId(null)
    }
  }

  const programs = useMemo(() => Array.from(new Set(students.map((s) => s.program))), [students])

  return (
    <div className="max-w-4xl">
      <h2 className="mb-4 text-xl font-semibold">Admin Panel</h2>
      <form onSubmit={onSubmit} className="space-y-4 rounded-lg border bg-white p-5">
        <div>
          <label className="mb-1 block text-sm font-medium">Name</label>
          <input
            value={form.name}
            onChange={(e) => update('name', e.target.value)}
            className="w-full rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Student name"
            required
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium">Program</label>
            <input
              value={form.major}
              onChange={(e) => update('major', e.target.value)}
              className="w-full rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. Computer Science"
              required
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Graduation Year</label>
            <input
              type="number"
              value={form.graduationYear}
              onChange={(e) => update('graduationYear', e.target.value)}
              className="w-full rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="2026"
              min={2000}
              max={2100}
              required
            />
          </div>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Bio</label>
          <textarea
            value={form.bio}
            onChange={(e) => update('bio', e.target.value)}
            className="min-h-28 w-full rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Short intro..."
          />
        </div>
        <div className="flex items-center gap-3">
          <button type="submit" className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">Save</button>
          {message && <span className="text-sm text-gray-600">{message}</span>}
        </div>
      </form>

      <div className="mt-8">
        <h3 className="mb-3 text-lg font-medium">Existing Profiles</h3>
        <div className="overflow-x-auto rounded-lg border bg-white">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="px-3 py-2">Name</th>
                <th className="px-3 py-2">Program</th>
                <th className="px-3 py-2">Year</th>
                <th className="px-3 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s) => (
                <tr key={s.id} className="border-b last:border-0">
                  <td className="px-3 py-2">
                    {editingId === s.id ? (
                      <input defaultValue={s.name} onBlur={(e) => onSaveEdit(s.id, { name: e.target.value })} className="rounded border px-2 py-1" />
                    ) : (
                      s.name
                    )}
                  </td>
                  <td className="px-3 py-2">
                    {editingId === s.id ? (
                      <select defaultValue={s.program} onBlur={(e) => onSaveEdit(s.id, { program: e.target.value })} className="rounded border px-2 py-1">
                        {programs.map((p) => (
                          <option key={p} value={p}>{p}</option>
                        ))}
                      </select>
                    ) : (
                      s.program
                    )}
                  </td>
                  <td className="px-3 py-2">
                    {editingId === s.id ? (
                      <input type="number" defaultValue={s.grad_year} onBlur={(e) => onSaveEdit(s.id, { grad_year: Number(e.target.value) })} className="w-24 rounded border px-2 py-1" />
                    ) : (
                      s.grad_year
                    )}
                  </td>
                  <td className="px-3 py-2">
                    {editingId === s.id ? (
                      <button className="rounded bg-gray-200 px-2 py-1 text-xs" onClick={() => setEditingId(null)}>Done</button>
                    ) : (
                      <div className="flex gap-2">
                        <button className="rounded bg-blue-600 px-2 py-1 text-xs text-white" onClick={() => onStartEdit(s.id)}>Edit</button>
                        <button className="rounded bg-red-600 px-2 py-1 text-xs text-white" onClick={() => onDelete(s.id)}>Delete</button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}



import { useMemo, useState } from 'react'
import { useStudents } from '../hooks/useStudents'
import type { Student } from '../types'
import { Modal } from '../components/Modal'

export default function DirectoryPage() {
  const { students, loading, error } = useStudents()
  const [query, setQuery] = useState('')
  const [program, setProgram] = useState<string>('')
  const [year, setYear] = useState<string>('')
  const [sort, setSort] = useState<string>('name-asc')
  const [selected, setSelected] = useState<Student | null>(null)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    let data = students.slice()
    if (q) {
      data = data.filter((s) => [s.name, s.program, String(s.grad_year), s.bio, (s.skills || []).join(',')]
        .filter(Boolean)
        .some((v) => String(v).toLowerCase().includes(q)))
    }
    if (program) data = data.filter((s) => s.program === program)
    if (year) data = data.filter((s) => String(s.grad_year) === year)
    data.sort((a, b) => {
      if (sort === 'name-asc') return a.name.localeCompare(b.name)
      if (sort === 'name-desc') return b.name.localeCompare(a.name)
      if (sort === 'year-desc') return b.grad_year - a.grad_year
      if (sort === 'year-asc') return a.grad_year - b.grad_year
      return 0
    })
    return data
  }, [students, query, program, year, sort])

  return (
    <div>
      <div className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name, major, year..."
          className="w-full rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select value={program} onChange={(e) => setProgram(e.target.value)} className="rounded-md border px-3 py-2">
          <option value="">All programs</option>
          {Array.from(new Set(students.map((s) => s.program))).map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
        <select value={year} onChange={(e) => setYear(e.target.value)} className="rounded-md border px-3 py-2">
          <option value="">All years</option>
          {Array.from(new Set(students.map((s) => s.grad_year))).sort((a,b)=>b-a).map((y) => (
            <option key={y} value={String(y)}>{y}</option>
          ))}
        </select>
        <select value={sort} onChange={(e) => setSort(e.target.value)} className="rounded-md border px-3 py-2">
          <option value="name-asc">Sort: Name A-Z</option>
          <option value="name-desc">Sort: Name Z-A</option>
          <option value="year-desc">Sort: Year desc</option>
          <option value="year-asc">Sort: Year asc</option>
        </select>
      </div>

      {loading ? (
        <div className="rounded-lg border bg-white p-6 text-center text-gray-600">Loading students...</div>
      ) : error ? (
        <div className="rounded-lg border bg-red-50 p-6 text-center text-red-600">Error: {error}</div>
      ) : filtered.length === 0 ? (
        <div className="rounded-lg border bg-white p-6 text-center text-gray-600">No students found. Adjust your search or filters.</div>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((s) => (
            <li key={s.id} className="rounded-lg border bg-white p-4 hover:shadow" onClick={() => setSelected(s)}>
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full bg-gray-200" />
                <div className="min-w-0">
                  <h3 className="truncate text-lg font-medium">{s.name}</h3>
                  <p className="text-sm text-gray-600">{s.program} • Class of {s.grad_year}</p>
                  {s.skills && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {s.skills.slice(0, 3).map((skill) => (
                        <span key={skill} className="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-700">{skill}</span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      <Modal open={!!selected} onClose={() => setSelected(null)} title={selected?.name}>
        {selected && (
          <div className="space-y-2">
            <p className="text-sm text-gray-700">{selected.program} • Class of {selected.grad_year}</p>
            {selected.bio && <p className="text-gray-800">{selected.bio}</p>}
            {selected.skills && selected.skills.length > 0 && (
              <div className="pt-2">
                <p className="text-sm font-medium">Skills</p>
                <div className="mt-1 flex flex-wrap gap-1">
                  {selected.skills.map((skill) => (
                    <span key={skill} className="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-700">{skill}</span>
                  ))}
                </div>
              </div>
            )}
            <div className="flex gap-3 pt-2">
              {selected.portfolio_url && (
                <a href={selected.portfolio_url} target="_blank" className="text-blue-600 hover:underline">Portfolio</a>
              )}
              {selected.linkedin_url && (
                <a href={selected.linkedin_url} target="_blank" className="text-blue-600 hover:underline">LinkedIn</a>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}



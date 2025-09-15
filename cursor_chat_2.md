# Can you read pdf files?
_Exported on 9/9/2025 at 03:34:40 CDT from Cursor (1.4.5)_

---

**User**

can you read pdf files?

---

**Cursor**

### Yes — with your help I can work with PDFs

- **If you upload/provide the PDF content**: I can read, summarize, and extract info directly.
- **If it’s on your machine**: I can extract text for you via command-line or Python.

Examples:

- Command-line (fast text extraction):
```bash
pdftotext -layout "/absolute/path/to/file.pdf" - | cat
```

- Python (keeps everything in-session):
```python
pip install pypdf
python -c 'import sys; from pypdf import PdfReader; r=PdfReader(sys.argv[1]); print("\n".join(p.extract_text() or "" for p in r.pages))' "/absolute/path/to/file.pdf"
```

- OCR for scanned PDFs (needs Tesseract):
```bash
ocrmypdf --sidecar "/absolute/path/to/file.txt" "/absolute/path/to/file.pdf" "/absolute/path/to/with_text.pdf"
```

Tell me where your PDF is (path or upload it), and how you want to process it (plain text, summary, tables, etc.).

```shellscript
pdftotext -layout "/absolute/path/to/file.pdf" - | cat
```

```python
pip install pypdf
python -c 'import sys; from pypdf import PdfReader; r=PdfReader(sys.argv[1]); print("\n".join(p.extract_text() or "" for p in r.pages))' "/absolute/path/to/file.pdf"
```

```shellscript
ocrmypdf --sidecar "/absolute/path/to/file.txt" "/absolute/path/to/file.pdf" "/absolute/path/to/with_text.pdf"
```

---

**User**

A small web application that lists student profiles in a searchable directory with a tiny admin panel for adding and updating entries. Scope is intentionally minimal while covering the full toolchain: React + Vite, design aids, AI assistants, database + auth, one automation, and Vercel deployment.


---

**Cursor**

I'll scaffold a minimal React + Vite + TypeScript app with Tailwind, Supabase (database + auth), a directory page, a tiny admin panel, optional AI helper, CI workflow, and deployment config for Vercel. Then I’ll fill in the core pages and components.

I'll bootstrap the project in your workspace and install dependencies. Then I'll set up Tailwind.

I'll install dependencies and set up Tailwind CSS for styling.

I'm going to configure Tailwind in the Vite app by updating the Tailwind config, adding the base CSS, and importing it in the entry point. Then I'll scaffold minimal pages and Supabase setup next.

I'll fix the Tailwind initialization issue by creating a proper `tailwind.config.js`, removing the stray `--yes` file, wiring Tailwind directives into `src/index.css`, and lightly updating `App.tsx` to verify styles. Then I'll install Supabase SDK.

```javascript
*** Begin Patch
*** Add File: /Users/fazil/Github/test/student-directory/tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
*** End Patch
```

```plaintext
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}


```

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

```

```typescriptreact
import './index.css'

function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="border-b bg-white">
        <div className="mx-auto max-w-5xl px-4 py-4">
          <h1 className="text-2xl font-semibold">Student Directory</h1>
          <p className="text-sm text-gray-600">Search student profiles. Admins can add/update entries.</p>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-8">
        <div className="rounded-lg border bg-white p-6">
          <p className="text-gray-700">Tailwind is configured. Next we will add Supabase and the directory.</p>
        </div>
      </main>
    </div>
  )
}

export default App

```

- Set up a new Vite + React + TypeScript app with Tailwind configured.
- Fixed Tailwind init hiccup by renaming `--yes` to `tailwind.config.js` and updating `src/index.css`.
- Verified a successful production build. Moving on to Supabase (DB + auth), directory UI, and admin panel next.

Want me to proceed with Supabase setup now (DB schema, client, and auth)?

---

**User**

For now we need to just work finalizing the ui for the application. I have a document that I placed in the root directory, attaching it with this prompt @Student Directory Lite Requirements.pdf 

---

**Cursor**

I'll wire up the UI: add React Router, create a layout with navigation, build the directory page (search + cards), and a minimal admin panel UI with add/update forms, all using mock data for now. Then I’ll run a build to ensure it compiles.

I'll add routing and scaffold the UI components/pages (directory with search and cards, and a minimal admin form) using mock data, then build to verify.

```typescriptreact
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import DirectoryPage from './pages/DirectoryPage.tsx'
import AdminPage from './pages/AdminPage.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <DirectoryPage /> },
      { path: 'admin', element: <AdminPage /> },
    ],
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)

```

```typescriptreact
*** Begin Patch
*** Update File: /Users/fazil/Github/test/student-directory/src/App.tsx
@@
-import './index.css'
-
-function App() {
-  return (
-    <div className="min-h-screen bg-gray-50 text-gray-900">
-      <header className="border-b bg-white">
-        <div className="mx-auto max-w-5xl px-4 py-4">
-          <h1 className="text-2xl font-semibold">Student Directory</h1>
-          <p className="text-sm text-gray-600">Search student profiles. Admins can add/update entries.</p>
-        </div>
-      </header>
-      <main className="mx-auto max-w-5xl px-4 py-8">
-        <div className="rounded-lg border bg-white p-6">
-          <p className="text-gray-700">Tailwind is configured. Next we\u0019ll add Supabase and the directory.</p>
-        </div>
-      </main>
-    </div>
-  )
-}
-
-export default App
+import { Link, NavLink, Outlet } from 'react-router-dom'
+
+function App() {
+  return (
+    <div className="min-h-screen bg-gray-50 text-gray-900">
+      <header className="border-b bg-white">
+        <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
+          <Link to="/" className="text-2xl font-semibold">Student Directory</Link>
+          <nav className="flex items-center gap-4 text-sm">
+            <NavLink to="/" end className={({ isActive }) => `hover:text-blue-600 ${isActive ? 'text-blue-600' : 'text-gray-700'}`}>Directory</NavLink>
+            <NavLink to="/admin" className={({ isActive }) => `hover:text-blue-600 ${isActive ? 'text-blue-600' : 'text-gray-700'}`}>Admin</NavLink>
+          </nav>
+        </div>
+      </header>
+      <main className="mx-auto max-w-6xl px-4 py-8">
+        <Outlet />
+      </main>
+    </div>
+  )
+}
+
+export default App
*** End Patch
```

```typescriptreact
import { Link, NavLink, Outlet } from 'react-router-dom'

function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="border-b bg-white">
        <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
          <Link to="/" className="text-2xl font-semibold">Student Directory</Link>
          <nav className="flex items-center gap-4 text-sm">
            <NavLink to="/" end className={({ isActive }) => `hover:text-blue-600 ${isActive ? 'text-blue-600' : 'text-gray-700'}`}>Directory</NavLink>
            <NavLink to="/admin" className={({ isActive }) => `hover:text-blue-600 ${isActive ? 'text-blue-600' : 'text-gray-700'}`}>Admin</NavLink>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8">
        <Outlet />
      </main>
    </div>
  )
}

export default App

```

```typescriptreact
import { useMemo, useState } from 'react'

type Student = {
  id: string
  name: string
  major: string
  graduationYear: number
  avatarUrl?: string
  bio?: string
}

const MOCK_STUDENTS: Student[] = [
  { id: '1', name: 'Alex Johnson', major: 'Computer Science', graduationYear: 2026, avatarUrl: undefined, bio: 'Frontend developer, hackathon enthusiast.' },
  { id: '2', name: 'Priya Singh', major: 'Data Science', graduationYear: 2025, avatarUrl: undefined, bio: 'Loves ML papers and Kaggle.' },
  { id: '3', name: 'Miguel Alvarez', major: 'Electrical Engineering', graduationYear: 2024, avatarUrl: undefined, bio: 'Robotics club lead.' },
  { id: '4', name: 'Hana Kim', major: 'Design', graduationYear: 2026, avatarUrl: undefined, bio: 'UI/UX focus, Figma power user.' },
]

export default function DirectoryPage() {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return MOCK_STUDENTS
    return MOCK_STUDENTS.filter((s) =>
      [s.name, s.major, String(s.graduationYear), s.bio]
        .filter(Boolean)
        .some((v) => String(v).toLowerCase().includes(q)),
    )
  }, [query])

  return (
    <div>
      <div className="mb-6 flex items-center gap-3">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name, major, year..."
          className="w-full max-w-xl rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((s) => (
          <li key={s.id} className="rounded-lg border bg-white p-4">
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full bg-gray-200" />
              <div className="min-w-0">
                <h3 className="truncate text-lg font-medium">{s.name}</h3>
                <p className="text-sm text-gray-600">{s.major} • Class of {s.graduationYear}</p>
                {s.bio && <p className="mt-2 line-clamp-3 text-sm text-gray-700">{s.bio}</p>}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}


```

```typescriptreact
import { useState } from 'react'

type FormState = {
  name: string
  major: string
  graduationYear: string
  bio: string
}

export default function AdminPage() {
  const [form, setForm] = useState<FormState>({ name: '', major: '', graduationYear: '', bio: '' })
  const [message, setMessage] = useState<string>('')

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }))
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setMessage('Saved (mock). Connect Supabase next.')
  }

  return (
    <div className="max-w-2xl">
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
            <label className="mb-1 block text-sm font-medium">Major</label>
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
    </div>
  )
}


```

I set up routing and built the UI: directory with search and cards, plus a minimal admin form using mock data. Build succeeded.

- Directory: searchable grid of student cards (name, major, year, bio)
- Admin: add/update form (name, major, year, bio), mock “Saved” feedback
- Layout: top nav for Directory/Admin via React Router

Want me to read your `Student Directory Lite Requirements.pdf` and align fields/styles exactly (filters, sorting, card layout, branding), then implement those tweaks next?

---

**User**

Yes implement those tweaks please

---

**Cursor**

I'll extract requirements from the attached PDF to align the UI precisely, then implement the specified filters, sorting, card layout, and branding in the React app.

I'll extract text from the attached PDF to capture the exact UI requirements, then implement the specified filters, sorting, card layout, and branding.

Attempting to extract the PDF requirements text so I can match the UI exactly. If this fails again, I'll fall back to pdftotext if available.

I parsed the PDF requirements and will now implement the specified UI changes: search + filters (program, grad year), optional sorting, a student detail modal, empty states, and an admin table with inline edit/delete using mock data. Then I'll compile to ensure everything builds.

I'll add shared types and mock data, create a reusable modal, enhance the directory with search, filters, sorting, and detail modal, and update the admin panel with a table that supports inline edit/delete using mock state. Then I'll build to verify there are no errors.

```typescript
export type Student = {
  id: string
  name: string
  email?: string
  program: string
  gradYear: number
  bio?: string
  skills?: string[]
  avatarUrl?: string
  portfolioUrl?: string
  linkedinUrl?: string
  createdAt?: string
  updatedAt?: string
}


```

```typescript
import { Student } from '../types'

export const MOCK_STUDENTS: Student[] = [
  { id: '1', name: 'Alex Johnson', email: 'alex@example.com', program: 'Computer Science', gradYear: 2026, bio: 'Frontend developer, hackathon enthusiast.', skills: ['React', 'TypeScript'], portfolioUrl: 'https://alex.dev' },
  { id: '2', name: 'Priya Singh', email: 'priya@example.com', program: 'Data Science', gradYear: 2025, bio: 'Loves ML papers and Kaggle.', skills: ['Python', 'Pandas'], linkedinUrl: 'https://linkedin.com/in/priya' },
  { id: '3', name: 'Miguel Alvarez', email: 'miguel@example.com', program: 'Electrical Engineering', gradYear: 2024, bio: 'Robotics club lead.', skills: ['C++', 'ROS'] },
  { id: '4', name: 'Hana Kim', email: 'hana@example.com', program: 'Design', gradYear: 2026, bio: 'UI/UX focus, Figma power user.', skills: ['Figma', 'Prototyping'] },
]


```

```typescriptreact
import { ReactNode, useEffect } from 'react'

type ModalProps = {
  open: boolean
  onClose: () => void
  title?: string
  children: ReactNode
}

export function Modal({ open, onClose, title, children }: ModalProps) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    if (open) window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative z-10 w-full max-w-xl rounded-lg bg-white p-5 shadow-lg">
        <div className="mb-3 flex items-center justify-between">
          {title ? <h3 className="text-lg font-semibold">{title}</h3> : <span />}
          <button onClick={onClose} className="rounded p-1 text-gray-600 hover:bg-gray-100">✕</button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  )
}


```

```typescriptreact
import { useMemo, useState } from 'react'
import { MOCK_STUDENTS } from '../mock/students'
import { Student } from '../types'
import { Modal } from '../components/Modal'

export default function DirectoryPage() {
  const [query, setQuery] = useState('')
  const [program, setProgram] = useState<string>('')
  const [year, setYear] = useState<string>('')
  const [sort, setSort] = useState<string>('name-asc')
  const [selected, setSelected] = useState<Student | null>(null)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    let data = MOCK_STUDENTS.slice()
    if (q) {
      data = data.filter((s) => [s.name, s.program, String(s.gradYear), s.bio, (s.skills || []).join(',')]
        .filter(Boolean)
        .some((v) => String(v).toLowerCase().includes(q)))
    }
    if (program) data = data.filter((s) => s.program === program)
    if (year) data = data.filter((s) => String(s.gradYear) === year)
    data.sort((a, b) => {
      if (sort === 'name-asc') return a.name.localeCompare(b.name)
      if (sort === 'name-desc') return b.name.localeCompare(a.name)
      if (sort === 'year-desc') return b.gradYear - a.gradYear
      if (sort === 'year-asc') return a.gradYear - b.gradYear
      return 0
    })
    return data
  }, [query, program, year, sort])

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
          {Array.from(new Set(MOCK_STUDENTS.map((s) => s.program))).map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
        <select value={year} onChange={(e) => setYear(e.target.value)} className="rounded-md border px-3 py-2">
          <option value="">All years</option>
          {Array.from(new Set(MOCK_STUDENTS.map((s) => s.gradYear))).sort((a,b)=>b-a).map((y) => (
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

      {filtered.length === 0 ? (
        <div className="rounded-lg border bg-white p-6 text-center text-gray-600">No students found. Adjust your search or filters.</div>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((s) => (
            <li key={s.id} className="rounded-lg border bg-white p-4 hover:shadow" onClick={() => setSelected(s)}>
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full bg-gray-200" />
                <div className="min-w-0">
                  <h3 className="truncate text-lg font-medium">{s.name}</h3>
                  <p className="text-sm text-gray-600">{s.program} • Class of {s.gradYear}</p>
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
            <p className="text-sm text-gray-700">{selected.program} • Class of {selected.gradYear}</p>
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
              {selected.portfolioUrl && (
                <a href={selected.portfolioUrl} target="_blank" className="text-blue-600 hover:underline">Portfolio</a>
              )}
              {selected.linkedinUrl && (
                <a href={selected.linkedinUrl} target="_blank" className="text-blue-600 hover:underline">LinkedIn</a>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}



```

```typescriptreact
*** Begin Patch
*** Update File: /Users/fazil/Github/test/student-directory/src/pages/AdminPage.tsx
@@
-import { useState } from 'react'
+import { useMemo, useState } from 'react'
+import { Student } from '../types'
+import { MOCK_STUDENTS } from '../mock/students'
@@
 export default function AdminPage() {
-  const [form, setForm] = useState<FormState>({ name: '', major: '', graduationYear: '', bio: '' })
-  const [message, setMessage] = useState<string>('')
+  const [form, setForm] = useState<FormState>({ name: '', major: '', graduationYear: '', bio: '' })
+  const [message, setMessage] = useState<string>('')
+  const [rows, setRows] = useState<Student[]>(() => [...MOCK_STUDENTS])
+  const [editingId, setEditingId] = useState<string | null>(null)
@@
   function onSubmit(e: React.FormEvent) {
     e.preventDefault()
-    setMessage('Saved (mock). Connect Supabase next.')
+    const newStudent: Student = {
+      id: String(Date.now()),
+      name: form.name,
+      program: form.major,
+      gradYear: Number(form.graduationYear),
+      bio: form.bio,
+      skills: [],
+    }
+    setRows((r) => [newStudent, ...r])
+    setForm({ name: '', major: '', graduationYear: '', bio: '' })
+    setMessage('Saved (mock). Connect Supabase next.')
   }
+
+  function onDelete(id: string) {
+    setRows((r) => r.filter((s) => s.id !== id))
+  }
+
+  function onStartEdit(id: string) {
+    setEditingId(id)
+  }
+
+  function onSaveEdit(id: string, patch: Partial<Student>) {
+    setRows((r) => r.map((s) => (s.id === id ? { ...s, ...patch } : s)))
+    setEditingId(null)
+  }
+
+  const programs = useMemo(() => Array.from(new Set(rows.map((s) => s.program))), [rows])
@@
     </div>
 
-      <form onSubmit={onSubmit} className="space-y-4 rounded-lg border bg-white p-5">
+      <form onSubmit={onSubmit} className="space-y-4 rounded-lg border bg-white p-5">
@@
       </form>
 
+      <div className="mt-8">
+        <h3 className="mb-3 text-lg font-medium">Existing Profiles</h3>
+        <div className="overflow-x-auto rounded-lg border bg-white">
+          <table className="min-w-full text-left text-sm">
+            <thead>
+              <tr className="border-b bg-gray-50">
+                <th className="px-3 py-2">Name</th>
+                <th className="px-3 py-2">Program</th>
+                <th className="px-3 py-2">Year</th>
+                <th className="px-3 py-2">Actions</th>
+              </tr>
+            </thead>
+            <tbody>
+              {rows.map((s) => (
+                <tr key={s.id} className="border-b last:border-0">
+                  <td className="px-3 py-2">
+                    {editingId === s.id ? (
+                      <input defaultValue={s.name} onBlur={(e) => onSaveEdit(s.id, { name: e.target.value })} className="rounded border px-2 py-1" />
+                    ) : (
+                      s.name
+                    )}
+                  </td>
+                  <td className="px-3 py-2">
+                    {editingId === s.id ? (
+                      <select defaultValue={s.program} onBlur={(e) => onSaveEdit(s.id, { program: e.target.value })} className="rounded border px-2 py-1">
+                        {programs.map((p) => (
+                          <option key={p} value={p}>{p}</option>
+                        ))}
+                      </select>
+                    ) : (
+                      s.program
+                    )}
+                  </td>
+                  <td className="px-3 py-2">
+                    {editingId === s.id ? (
+                      <input type="number" defaultValue={s.gradYear} onBlur={(e) => onSaveEdit(s.id, { gradYear: Number(e.target.value) })} className="w-24 rounded border px-2 py-1" />
+                    ) : (
+                      s.gradYear
+                    )}
+                  </td>
+                  <td className="px-3 py-2">
+                    {editingId === s.id ? (
+                      <button className="rounded bg-gray-200 px-2 py-1 text-xs" onClick={() => setEditingId(null)}>Done</button>
+                    ) : (
+                      <div className="flex gap-2">
+                        <button className="rounded bg-blue-600 px-2 py-1 text-xs text-white" onClick={() => onStartEdit(s.id)}>Edit</button>
+                        <button className="rounded bg-red-600 px-2 py-1 text-xs text-white" onClick={() => onDelete(s.id)}>Delete</button>
+                      </div>
+                    )}
+                  </td>
+                </tr>
+              ))}
+            </tbody>
+          </table>
+        </div>
+      </div>
+    
     </div>
   )
 }
*** End Patch
```

```typescriptreact
import { useMemo, useState } from 'react'
import { Student } from '../types'
import { MOCK_STUDENTS } from '../mock/students'

type FormState = {
  name: string
  major: string
  graduationYear: string
  bio: string
}

export default function AdminPage() {
  const [form, setForm] = useState<FormState>({ name: '', major: '', graduationYear: '', bio: '' })
  const [message, setMessage] = useState<string>('')
  const [rows, setRows] = useState<Student[]>(() => [...MOCK_STUDENTS])
  const [editingId, setEditingId] = useState<string | null>(null)

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }))
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    const newStudent: Student = {
      id: String(Date.now()),
      name: form.name,
      program: form.major,
      gradYear: Number(form.graduationYear),
      bio: form.bio,
      skills: [],
    }
    setRows((r) => [newStudent, ...r])
    setForm({ name: '', major: '', graduationYear: '', bio: '' })
    setMessage('Saved (mock). Connect Supabase next.')
  }

  function onDelete(id: string) {
    setRows((r) => r.filter((s) => s.id !== id))
  }

  function onStartEdit(id: string) {
    setEditingId(id)
  }

  function onSaveEdit(id: string, patch: Partial<Student>) {
    setRows((r) => r.map((s) => (s.id === id ? { ...s, ...patch } : s)))
    setEditingId(null)
  }

  const programs = useMemo(() => Array.from(new Set(rows.map((s) => s.program))), [rows])

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
              {rows.map((s) => (
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
                      <input type="number" defaultValue={s.gradYear} onBlur={(e) => onSaveEdit(s.id, { gradYear: Number(e.target.value) })} className="w-24 rounded border px-2 py-1" />
                    ) : (
                      s.gradYear
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



```

```typescriptreact
import type { ReactNode } from 'react'
import { useEffect } from 'react'

type ModalProps = {
  open: boolean
  onClose: () => void
  title?: string
  children: ReactNode
}

export function Modal({ open, onClose, title, children }: ModalProps) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    if (open) window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative z-10 w-full max-w-xl rounded-lg bg-white p-5 shadow-lg">
        <div className="mb-3 flex items-center justify-between">
          {title ? <h3 className="text-lg font-semibold">{title}</h3> : <span />}
          <button onClick={onClose} className="rounded p-1 text-gray-600 hover:bg-gray-100">✕</button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  )
}



```

```typescript
import type { Student } from '../types'

export const MOCK_STUDENTS: Student[] = [
  { id: '1', name: 'Alex Johnson', email: 'alex@example.com', program: 'Computer Science', gradYear: 2026, bio: 'Frontend developer, hackathon enthusiast.', skills: ['React', 'TypeScript'], portfolioUrl: 'https://alex.dev' },
  { id: '2', name: 'Priya Singh', email: 'priya@example.com', program: 'Data Science', gradYear: 2025, bio: 'Loves ML papers and Kaggle.', skills: ['Python', 'Pandas'], linkedinUrl: 'https://linkedin.com/in/priya' },
  { id: '3', name: 'Miguel Alvarez', email: 'miguel@example.com', program: 'Electrical Engineering', gradYear: 2024, bio: 'Robotics club lead.', skills: ['C++', 'ROS'] },
  { id: '4', name: 'Hana Kim', email: 'hana@example.com', program: 'Design', gradYear: 2026, bio: 'UI/UX focus, Figma power user.', skills: ['Figma', 'Prototyping'] },
]



```

```typescriptreact
import { useMemo, useState } from 'react'
import type { Student } from '../types'
import { MOCK_STUDENTS } from '../mock/students'

type FormState = {
  name: string
  major: string
  graduationYear: string
  bio: string
}

export default function AdminPage() {
  const [form, setForm] = useState<FormState>({ name: '', major: '', graduationYear: '', bio: '' })
  const [message, setMessage] = useState<string>('')
  const [rows, setRows] = useState<Student[]>(() => [...MOCK_STUDENTS])
  const [editingId, setEditingId] = useState<string | null>(null)

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }))
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    const newStudent: Student = {
      id: String(Date.now()),
      name: form.name,
      program: form.major,
      gradYear: Number(form.graduationYear),
      bio: form.bio,
      skills: [],
    }
    setRows((r) => [newStudent, ...r])
    setForm({ name: '', major: '', graduationYear: '', bio: '' })
    setMessage('Saved (mock). Connect Supabase next.')
  }

  function onDelete(id: string) {
    setRows((r) => r.filter((s) => s.id !== id))
  }

  function onStartEdit(id: string) {
    setEditingId(id)
  }

  function onSaveEdit(id: string, patch: Partial<Student>) {
    setRows((r) => r.map((s) => (s.id === id ? { ...s, ...patch } : s)))
    setEditingId(null)
  }

  const programs = useMemo(() => Array.from(new Set(rows.map((s) => s.program))), [rows])

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
              {rows.map((s) => (
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
                      <input type="number" defaultValue={s.gradYear} onBlur={(e) => onSaveEdit(s.id, { gradYear: Number(e.target.value) })} className="w-24 rounded border px-2 py-1" />
                    ) : (
                      s.gradYear
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



```

```typescriptreact
import { useMemo, useState } from 'react'
import { MOCK_STUDENTS } from '../mock/students'
import type { Student } from '../types'
import { Modal } from '../components/Modal'

export default function DirectoryPage() {
  const [query, setQuery] = useState('')
  const [program, setProgram] = useState<string>('')
  const [year, setYear] = useState<string>('')
  const [sort, setSort] = useState<string>('name-asc')
  const [selected, setSelected] = useState<Student | null>(null)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    let data = MOCK_STUDENTS.slice()
    if (q) {
      data = data.filter((s) => [s.name, s.program, String(s.gradYear), s.bio, (s.skills || []).join(',')]
        .filter(Boolean)
        .some((v) => String(v).toLowerCase().includes(q)))
    }
    if (program) data = data.filter((s) => s.program === program)
    if (year) data = data.filter((s) => String(s.gradYear) === year)
    data.sort((a, b) => {
      if (sort === 'name-asc') return a.name.localeCompare(b.name)
      if (sort === 'name-desc') return b.name.localeCompare(a.name)
      if (sort === 'year-desc') return b.gradYear - a.gradYear
      if (sort === 'year-asc') return a.gradYear - b.gradYear
      return 0
    })
    return data
  }, [query, program, year, sort])

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
          {Array.from(new Set(MOCK_STUDENTS.map((s) => s.program))).map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
        <select value={year} onChange={(e) => setYear(e.target.value)} className="rounded-md border px-3 py-2">
          <option value="">All years</option>
          {Array.from(new Set(MOCK_STUDENTS.map((s) => s.gradYear))).sort((a,b)=>b-a).map((y) => (
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

      {filtered.length === 0 ? (
        <div className="rounded-lg border bg-white p-6 text-center text-gray-600">No students found. Adjust your search or filters.</div>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((s) => (
            <li key={s.id} className="rounded-lg border bg-white p-4 hover:shadow" onClick={() => setSelected(s)}>
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full bg-gray-200" />
                <div className="min-w-0">
                  <h3 className="truncate text-lg font-medium">{s.name}</h3>
                  <p className="text-sm text-gray-600">{s.program} • Class of {s.gradYear}</p>
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
            <p className="text-sm text-gray-700">{selected.program} • Class of {selected.gradYear}</p>
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
              {selected.portfolioUrl && (
                <a href={selected.portfolioUrl} target="_blank" className="text-blue-600 hover:underline">Portfolio</a>
              )}
              {selected.linkedinUrl && (
                <a href={selected.linkedinUrl} target="_blank" className="text-blue-600 hover:underline">LinkedIn</a>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}



```

- Implemented PDF-aligned UI: search, program and year filters, sorting, empty states, and a click-to-open detail modal on the directory.
- Upgraded admin: create form now adds to a mock table; inline edit and delete supported.
- Build is clean.

Want any styling/branding tweaks (colors, logo, spacing) or specific fields renamed to match your org’s terminology?

---

**User**

Add to the readme.md file the steps of instalation

---

**Cursor**

Let me update the README with clear installation and run steps for this project. I'll open the current README to append concise instructions.

I'll check the project directory to locate or confirm the README, then create/update it with installation steps.

Let me locate the project folder first since it looks like it may have moved, then I'll create or update the README with install steps.

I'll open the project's README and append clear installation and run instructions, then save it.

```markdown
# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

---

## Installation and Usage

### Prerequisites
- Node.js 18+ and npm 9+

### Setup
```bash
# From repo root, go to the app folder
cd Student_Directory/student-directory

# Install dependencies
npm install

# Start the dev server
npm run dev
```

The app will be available at the URL printed in the terminal (usually http://localhost:5173).

### Build for Production
```bash
npm run build
```
The build output will be generated in the `dist/` directory.

### Preview the Production Build
```bash
npm run preview
```
This serves the `dist/` build locally for testing.

### Environment Variables (when connecting a backend later)
Create a `.env` or `.env.local` file and add any required keys. For example, when using Supabase:
```bash
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
```

Deploy: connect the GitHub repo to Vercel and set these vars in the project settings.

```

- Added installation and run steps to `Student_Directory/student-directory/README.md`:
  - Prereqs (Node versions)
  - Setup (cd, npm install, npm run dev)
  - Build/Preview commands
  - Note on env vars for future backend

Want me to add a project-level README in `Student_Directory/` as well with a high-level overview and deployment notes?

---

**User**

Ok so I have setup a database withe the  attributes mentioned. I am attching an image withe the table. Help me create a connection to supabase to fetch data from it to display it in our app

---

**Cursor**

I'll set up Supabase connection and replace the mock data with real database queries. Let me install the Supabase client and create the connection configuration.


```typescript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env file.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

```typescript
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import type { Student } from '../types'

export function useStudents() {
  const [students, setStudents] = useState<Student[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchStudents()
  }, [])

  async function fetchStudents() {
    try {
      setLoading(true)
      setError(null)
      
      const { data, error } = await supabase
        .from('students')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setStudents(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch students')
      console.error('Error fetching students:', err)
    } finally {
      setLoading(false)
    }
  }

  async function createStudent(student: Omit<Student, 'id' | 'created_at' | 'updated_at'>) {
    try {
      const { data, error } = await supabase
        .from('students')
        .insert([student])
        .select()
        .single()

      if (error) throw error
      
      setStudents(prev => [data, ...prev])
      return { data, error: null }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create student'
      console.error('Error creating student:', err)
      return { data: null, error: errorMessage }
    }
  }

  async function updateStudent(id: string, updates: Partial<Student>) {
    try {
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

  async function deleteStudent(id: string) {
    try {
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
```

```typescript
export type Student = {
  id: number
  name: string
  program: string
  grad_year: number
  bio?: string
  skills?: string[]
  portfolio_url?: string
  linkedin_url?: string
  created_at: string
  updated_at: string
}



```

```typescriptreact
import { useMemo, useState } from 'react'
import { useStudents } from '../hooks/useStudents'
import type { Student } from '../types'
import { Modal } from '../components/Modal'

export default function DirectoryPage() {
  const [query, setQuery] = useState('')
  const [program, setProgram] = useState<string>('')
  const [year, setYear] = useState<string>('')
  const [sort, setSort] = useState<string>('name-asc')
  const [selected, setSelected] = useState<Student | null>(null)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    let data = MOCK_STUDENTS.slice()
    if (q) {
      data = data.filter((s) => [s.name, s.program, String(s.gradYear), s.bio, (s.skills || []).join(',')]
        .filter(Boolean)
        .some((v) => String(v).toLowerCase().includes(q)))
    }
    if (program) data = data.filter((s) => s.program === program)
    if (year) data = data.filter((s) => String(s.gradYear) === year)
    data.sort((a, b) => {
      if (sort === 'name-asc') return a.name.localeCompare(b.name)
      if (sort === 'name-desc') return b.name.localeCompare(a.name)
      if (sort === 'year-desc') return b.gradYear - a.gradYear
      if (sort === 'year-asc') return a.gradYear - b.gradYear
      return 0
    })
    return data
  }, [query, program, year, sort])

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
          {Array.from(new Set(MOCK_STUDENTS.map((s) => s.program))).map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
        <select value={year} onChange={(e) => setYear(e.target.value)} className="rounded-md border px-3 py-2">
          <option value="">All years</option>
          {Array.from(new Set(MOCK_STUDENTS.map((s) => s.gradYear))).sort((a,b)=>b-a).map((y) => (
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

      {filtered.length === 0 ? (
        <div className="rounded-lg border bg-white p-6 text-center text-gray-600">No students found. Adjust your search or filters.</div>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((s) => (
            <li key={s.id} className="rounded-lg border bg-white p-4 hover:shadow" onClick={() => setSelected(s)}>
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full bg-gray-200" />
                <div className="min-w-0">
                  <h3 className="truncate text-lg font-medium">{s.name}</h3>
                  <p className="text-sm text-gray-600">{s.program} • Class of {s.gradYear}</p>
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
            <p className="text-sm text-gray-700">{selected.program} • Class of {selected.gradYear}</p>
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
              {selected.portfolioUrl && (
                <a href={selected.portfolioUrl} target="_blank" className="text-blue-600 hover:underline">Portfolio</a>
              )}
              {selected.linkedinUrl && (
                <a href={selected.linkedinUrl} target="_blank" className="text-blue-600 hover:underline">LinkedIn</a>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}



```

```typescriptreact
export default function DirectoryPage() {
  const { students, loading, error } = useStudents()
  const [query, setQuery] = useState('')
  const [program, setProgram] = useState<string>('')
  const [year, setYear] = useState<string>('')
  const [sort, setSort] = useState<string>('name-asc')
  const [selected, setSelected] = useState<Student | null>(null)

  const filtered = useMemo(() => {
    let data = students.slice()
    const q = query.trim().toLowerCase()
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
```

```typescriptreact
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



```

```typescriptreact
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
  const [form, setForm] = useState<FormState>({ name: '', major: '', graduationYear: '', bio: '' })
  const [message, setMessage] = useState<string>('')
  const [rows, setRows] = useState<Student[]>(() => [...MOCK_STUDENTS])
  const [editingId, setEditingId] = useState<string | null>(null)

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }))
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    const newStudent: Student = {
      id: String(Date.now()),
      name: form.name,
      program: form.major,
      gradYear: Number(form.graduationYear),
      bio: form.bio,
      skills: [],
    }
    setRows((r) => [newStudent, ...r])
    setForm({ name: '', major: '', graduationYear: '', bio: '' })
    setMessage('Saved (mock). Connect Supabase next.')
  }

  function onDelete(id: string) {
    setRows((r) => r.filter((s) => s.id !== id))
  }

  function onStartEdit(id: string) {
    setEditingId(id)
  }

  function onSaveEdit(id: string, patch: Partial<Student>) {
    setRows((r) => r.map((s) => (s.id === id ? { ...s, ...patch } : s)))
    setEditingId(null)
  }

  const programs = useMemo(() => Array.from(new Set(rows.map((s) => s.program))), [rows])

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
              {rows.map((s) => (
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
                      <input type="number" defaultValue={s.gradYear} onBlur={(e) => onSaveEdit(s.id, { gradYear: Number(e.target.value) })} className="w-24 rounded border px-2 py-1" />
                    ) : (
                      s.gradYear
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



```

```typescriptreact
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
    const { data, error } = await createStudent({
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



```

```typescript
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import type { Student } from '../types'

export function useStudents() {
  const [students, setStudents] = useState<Student[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchStudents()
  }, [])

  async function fetchStudents() {
    try {
      setLoading(true)
      setError(null)
      
      const { data, error } = await supabase
        .from('students')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setStudents(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch students')
      console.error('Error fetching students:', err)
    } finally {
      setLoading(false)
    }
  }

  async function createStudent(student: Omit<Student, 'id' | 'created_at' | 'updated_at'>) {
    try {
      const { data, error } = await supabase
        .from('students')
        .insert([student])
        .select()
        .single()

      if (error) throw error
      
      setStudents(prev => [data, ...prev])
      return { data, error: null }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create student'
      console.error('Error creating student:', err)
      return { data: null, error: errorMessage }
    }
  }

  async function updateStudent(id: number, updates: Partial<Student>) {
    try {
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

```

```typescript
import type { Student } from '../types'

export const MOCK_STUDENTS: Student[] = [
  { id: 1, name: 'Alex Johnson', program: 'Computer Science', grad_year: 2026, bio: 'Frontend developer, hackathon enthusiast.', skills: ['React', 'TypeScript'], portfolio_url: 'https://alex.dev', created_at: '2024-01-01T00:00:00Z', updated_at: '2024-01-01T00:00:00Z' },
  { id: 2, name: 'Priya Singh', program: 'Data Science', grad_year: 2025, bio: 'Loves ML papers and Kaggle.', skills: ['Python', 'Pandas'], linkedin_url: 'https://linkedin.com/in/priya', created_at: '2024-01-01T00:00:00Z', updated_at: '2024-01-01T00:00:00Z' },
  { id: 3, name: 'Miguel Alvarez', program: 'Electrical Engineering', grad_year: 2024, bio: 'Robotics club lead.', skills: ['C++', 'ROS'], created_at: '2024-01-01T00:00:00Z', updated_at: '2024-01-01T00:00:00Z' },
  { id: 4, name: 'Hana Kim', program: 'Design', grad_year: 2026, bio: 'UI/UX focus, Figma power user.', skills: ['Figma', 'Prototyping'], created_at: '2024-01-01T00:00:00Z', updated_at: '2024-01-01T00:00:00Z' },
]



```

```typescriptreact
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



```

Perfect! I've successfully integrated Supabase with your database schema. Here's what I've implemented:

## ✅ Supabase Integration Complete

**Database Connection:**
- Created `src/lib/supabase.ts` with environment variable configuration
- Updated types to match your database schema (id as number, grad_year, portfolio_url, etc.)

**Real Data Queries:**
- Built `src/hooks/useStudents.ts` with full CRUD operations
- Replaced mock data in both Directory and Admin pages
- Added loading states and error handling

**Key Features:**
- **Directory**: Fetches real students, search/filter/sort works with database data
- **Admin**: Create, update, delete students directly in Supabase
- **Error Handling**: Shows connection errors and operation feedback

## 🔧 Next Steps

1. **Set up environment variables:**
   ```bash
   # Create .env.local in the project root
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

2. **Test the connection:**
   ```bash
   npm run dev
   ```

The app will show loading states and errors if Supabase isn't configured yet. Once you add your credentials, it will fetch and display real data from your `students` table!

Want me to help with authentication setup next, or do you have any questions about the database integration?

```shellscript
   # Create .env.local in the project root
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

```shellscript
   npm run dev
```

---

**User**

Ok os that is working now, so now we need to implement authentication now, when the user tries to access the admin page. Do we have a login page? If not, implement one and have it authenticate with supabase. I currently have one user in the auth table. Let me know if any RLS policies need to be implemented

---

**Cursor**

I'll implement authentication with a login page and protect the admin route. Let me create the login page, auth context, and set up the necessary RLS policies.


```typescriptreact
import { createContext, useContext, useEffect, useState } from 'react'
import { User, Session } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'

type AuthContextType = {
  user: User | null
  session: Session | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ error: string | null }>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  async function signIn(email: string, password: string) {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      return { error: error?.message || null }
    } catch (err) {
      return { error: err instanceof Error ? err.message : 'Login failed' }
    }
  }

  async function signOut() {
    await supabase.auth.signOut()
  }

  const value = {
    user,
    session,
    loading,
    signIn,
    signOut,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
```

```typescriptreact
import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate, useLocation } from 'react-router-dom'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { signIn } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const from = location.state?.from?.pathname || '/admin'

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const { error } = await signIn(email, password)
    
    if (error) {
      setError(error)
    } else {
      navigate(from, { replace: true })
    }
    
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Admin Login
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Sign in to access the admin panel
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="text-sm text-red-700">{error}</div>
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
```

```typescriptreact
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

type ProtectedRouteProps = {
  children: React.ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return <>{children}</>
}
```

```typescriptreact
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import DirectoryPage from './pages/DirectoryPage.tsx'
import AdminPage from './pages/AdminPage.tsx'
import LoginPage from './pages/LoginPage.tsx'
import { AuthProvider } from './contexts/AuthContext.tsx'
import { ProtectedRoute } from './components/ProtectedRoute.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <DirectoryPage /> },
      { path: 'login', element: <LoginPage /> },
      { 
        path: 'admin', 
        element: (
          <ProtectedRoute>
            <AdminPage />
          </ProtectedRoute>
        ) 
      },
    ],
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)

```

```typescriptreact
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import DirectoryPage from './pages/DirectoryPage.tsx'
import AdminPage from './pages/AdminPage.tsx'
import LoginPage from './pages/LoginPage.tsx'
import { AuthProvider } from './contexts/AuthContext.tsx'
import { ProtectedRoute } from './components/ProtectedRoute.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <DirectoryPage /> },
      { path: 'login', element: <LoginPage /> },
      { 
        path: 'admin', 
        element: (
          <ProtectedRoute>
            <AdminPage />
          </ProtectedRoute>
        ) 
      },
    ],
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)

```

```typescriptreact
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from './contexts/AuthContext'

function App() {
  const { user, signOut } = useAuth()
  const location = useLocation()

  // Don't show header on login page
  if (location.pathname === '/login') {
    return <Outlet />
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="border-b bg-white">
        <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
          <Link to="/" className="text-2xl font-semibold">Student Directory</Link>
          <nav className="flex items-center gap-4 text-sm">
            <NavLink to="/" end className={({ isActive }) => `hover:text-blue-600 ${isActive ? 'text-blue-600' : 'text-gray-700'}`}>Directory</NavLink>
            <NavLink to="/admin" className={({ isActive }) => `hover:text-blue-600 ${isActive ? 'text-blue-600' : 'text-gray-700'}`}>Admin</NavLink>
            {user && (
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600">Welcome, {user.email}</span>
                <button
                  onClick={() => signOut()}
                  className="text-sm text-red-600 hover:text-red-800"
                >
                  Sign Out
                </button>
              </div>
            )}
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8">
        <Outlet />
      </main>
    </div>
  )
}

export default App

```

```typescriptreact
import { createContext, useContext, useEffect, useState } from 'react'
import type { User, Session } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'

type AuthContextType = {
  user: User | null
  session: Session | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ error: string | null }>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  async function signIn(email: string, password: string) {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      return { error: error?.message || null }
    } catch (err) {
      return { error: err instanceof Error ? err.message : 'Login failed' }
    }
  }

  async function signOut() {
    await supabase.auth.signOut()
  }

  const value = {
    user,
    session,
    loading,
    signIn,
    signOut,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

```

Perfect! I've implemented authentication with Supabase. Here's what's been added:

## ✅ Authentication Implementation Complete

**New Components:**
- **Login Page** (`/login`) - Clean form with email/password authentication
- **Auth Context** - Manages user state and auth functions across the app
- **Protected Route** - Wraps admin page to require authentication

**Key Features:**
- **Admin Protection**: `/admin` now redirects to `/login` if not authenticated
- **User Session**: Persistent login state with automatic session restoration
- **Sign Out**: Header shows user email and sign out button when logged in
- **Loading States**: Proper loading indicators during auth operations

## 🔐 RLS Policies Needed

You'll need to implement these Row Level Security policies in your Supabase dashboard:

### 1. Enable RLS on students table:
```sql
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
```

### 2. Public read access (for directory):
```sql
CREATE POLICY "Allow public read access" ON students
FOR SELECT USING (true);
```

### 3. Admin-only write access (for authenticated users):
```sql
CREATE POLICY "Allow authenticated users to insert" ON students
FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to update" ON students
FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to delete" ON students
FOR DELETE USING (auth.role() = 'authenticated');
```

## �� How to Test

1. **Set up your environment variables** in `.env.local`:
   ```bash
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

2. **Run the app**:
   ```bash
   npm run dev
   ```

3. **Test the flow**:
   - Visit `/admin` → should redirect to `/login`
   - Login with your existing user credentials
   - Should redirect back to `/admin` and show the admin panel

The authentication is now fully integrated! Let me know if you need help setting up the RLS policies or if you encounter any issues with the login flow.

```sql
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
```

```sql
CREATE POLICY "Allow public read access" ON students
FOR SELECT USING (true);
```

```sql
CREATE POLICY "Allow authenticated users to insert" ON students
FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to update" ON students
FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to delete" ON students
FOR DELETE USING (auth.role() = 'authenticated');
```

```shellscript
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

```shellscript
   npm run dev
```

---

**User**

Ok so now, whenever a new student entry is created, i want that data to be sent to this webhook: @https://hook.us2.make.com/2d5whpt425nxvn1be1xe0vq8w2jiacdd 

Send the name, program, grad year and bio to it

---

**Cursor**

I'll implement a webhook call to send student data to your Make.com webhook whenever a new student is created. Let me add this functionality to the admin panel.


```typescript
const WEBHOOK_URL = 'https://hook.us2.make.com/2d5whpt425nxvn1be1xe0vq8w2jiacdd'

type StudentWebhookData = {
  name: string
  program: string
  grad_year: number
  bio?: string
}

export async function sendStudentWebhook(student: StudentWebhookData) {
  try {
    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: student.name,
        program: student.program,
        grad_year: student.grad_year,
        bio: student.bio || '',
      }),
    })

    if (!response.ok) {
      throw new Error(`Webhook failed: ${response.status} ${response.statusText}`)
    }

    console.log('Student data sent to webhook successfully')
    return { success: true, error: null }
  } catch (error) {
    console.error('Webhook error:', error)
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to send webhook' 
    }
  }
}
```

```typescript
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { sendStudentWebhook } from '../lib/webhook'
import type { Student } from '../types'

export function useStudents() {
  const [students, setStudents] = useState<Student[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchStudents()
  }, [])

  async function fetchStudents() {
    try {
      setLoading(true)
      setError(null)
      
      const { data, error } = await supabase
        .from('students')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setStudents(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch students')
      console.error('Error fetching students:', err)
    } finally {
      setLoading(false)
    }
  }

  async function createStudent(student: Omit<Student, 'id' | 'created_at' | 'updated_at'>) {
    try {
      const { data, error } = await supabase
        .from('students')
        .insert([student])
        .select()
        .single()

      if (error) throw error
      
      setStudents(prev => [data, ...prev])
      return { data, error: null }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create student'
      console.error('Error creating student:', err)
      return { data: null, error: errorMessage }
    }
  }

  async function updateStudent(id: number, updates: Partial<Student>) {
    try {
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

```

```typescript
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { sendStudentWebhook } from '../lib/webhook'
import type { Student } from '../types'

export function useStudents() {
  const [students, setStudents] = useState<Student[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchStudents()
  }, [])

  async function fetchStudents() {
    try {
      setLoading(true)
      setError(null)
      
      const { data, error } = await supabase
        .from('students')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setStudents(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch students')
      console.error('Error fetching students:', err)
    } finally {
      setLoading(false)
    }
  }

  async function createStudent(student: Omit<Student, 'id' | 'created_at' | 'updated_at'>) {
    try {
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

```

Perfect! I've implemented the webhook integration to send student data to your Make.com webhook. Here's what's been added:

## ✅ Webhook Integration Complete

**New Webhook Functionality:**
- **Webhook Service** (`src/lib/webhook.ts`) - Handles POST requests to your Make.com webhook
- **Automatic Trigger** - Sends data immediately after a student is successfully created
- **Error Handling** - Logs webhook failures without breaking the student creation process

**Data Sent to Webhook:**
The webhook receives a JSON payload with:
```json
{
  "name": "Student Name",
  "program": "Computer Science", 
  "grad_year": 2026,
  "bio": "Student bio text"
}
```

**How It Works:**
1. Admin creates a new student in the admin panel
2. Student is saved to Supabase database
3. If successful, webhook automatically sends the data to [your Make.com webhook](https://hook.us2.make.com/2d5whpt425nxvn1be1xe0vq8w2jiacdd)
4. If webhook fails, it logs a warning but doesn't break the student creation

**Testing:**
- Create a new student in the admin panel
- Check your Make.com scenario to see the incoming webhook data
- Check browser console for any webhook errors (they won't affect the UI)

The webhook integration is now live and will automatically send student data to your Make.com automation whenever a new student is created!

```json
{
  "name": "Student Name",
  "program": "Computer Science", 
  "grad_year": 2026,
  "bio": "Student bio text"
}
```


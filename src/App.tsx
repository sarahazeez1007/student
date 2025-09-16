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

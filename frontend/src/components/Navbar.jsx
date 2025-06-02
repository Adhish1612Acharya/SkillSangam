import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Navbar = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav className="bg-primary text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">Sainik Sahayak</Link>
        
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <span className="text-sm">Welcome, {user.name}</span>
              <button 
                onClick={handleLogout}
                className="bg-white text-primary px-3 py-1 rounded hover:bg-gray-100"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="bg-white text-primary px-3 py-1 rounded hover:bg-gray-100">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
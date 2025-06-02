import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import { useAuth } from '../context/AuthContext'

const RoleBasedLayout = () => {
  const { user } = useAuth()

  return (
    <div className="flex w-screen bg-gray-100">
      <Sidebar role={user?.role} />
      <div className="flex-1 p-6">
        <Outlet />
      </div>
    </div>
  )
}

export default RoleBasedLayout
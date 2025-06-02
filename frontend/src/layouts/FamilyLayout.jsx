import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar'

const FamilyLayout = () => {
  return (
    <div className="flex w-screen bg-gray-100">
      <Sidebar role="family" />
      <div className="flex-1 p-6">
        <Outlet />
      </div>
    </div>
  )
}

export default FamilyLayout
import { Link, useLocation } from 'react-router-dom'
import { Home, User, FileText, AlertCircle, ShoppingCart, MessageSquare, Heart, Calendar, Settings } from 'lucide-react'

const Sidebar = ({ role }) => {
  const location = useLocation()
  
  const commonLinks = [
    { name: 'Dashboard', path: '/', icon: Home },
    { name: 'Schemes', path: '/schemes', icon: FileText },
    { name: 'Marketplace', path: '/marketplace', icon: ShoppingCart },
    { name: 'Community', path: '/community/forum', icon: MessageSquare },
    { name: 'Emergency', path: '/emergency', icon: AlertCircle },
  ]

  const soldierLinks = [
    { name: 'My Profile', path: '/profile', icon: User },
    { name: 'Success Stories', path: '/community/stories', icon: Heart },
    { name: 'Events', path: '/community/events', icon: Calendar },
    { name: 'AI Tools', path: '/ai/chatbot', icon: Settings },
  ]

  const familyLinks = [
    { name: 'Family Profile', path: '/profile', icon: User },
    { name: 'Success Stories', path: '/community/stories', icon: Heart },
    { name: 'Events', path: '/community/events', icon: Calendar },
  ]

  const govtLinks = [
    { name: 'Applications', path: '/applications', icon: FileText },
    { name: 'Grievances', path: '/grievances', icon: AlertCircle },
    { name: 'Scheme Management', path: '/schemes/manage', icon: Settings },
  ]

  const adminLinks = [
    { name: 'User Management', path: '/admin/users', icon: User },
    { name: 'Content Moderation', path: '/admin/moderation', icon: Settings },
  ]

  const getRoleSpecificLinks = () => {
    switch (role) {
      case 'soldier': return soldierLinks
      case 'family': return familyLinks
      case 'govt': return govtLinks
      case 'admin': return adminLinks
      default: return []
    }
  }

  const allLinks = [...commonLinks, ...getRoleSpecificLinks()]

  return (
    <div className="w-64 bg-white shadow-md p-4">
      <div className="mb-8 p-4">
        <h2 className="text-xl font-bold text-primary">Sainik Sahayak</h2>
        <p className="text-sm text-gray-500 capitalize">{role} Portal</p>
      </div>
      
      <nav>
        <ul className="space-y-2">
          {allLinks.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                className={`flex items-center p-3 rounded-lg transition-colors ${
                  location.pathname === link.path
                    ? 'bg-primary text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <link.icon className="w-5 h-5 mr-3" />
                <span>{link.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}

export default Sidebar
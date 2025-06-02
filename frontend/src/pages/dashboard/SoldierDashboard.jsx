import { Link } from 'react-router-dom'
import { Home, FileText, AlertCircle, ShoppingCart, MessageSquare, Heart } from 'lucide-react'
import Card from '../../components/Card'

const SoldierDashboard = () => {
  const stats = [
    { title: 'Pending Applications', value: 3, link: '/applications' },
    { title: 'Active Grievances', value: 1, link: '/grievance/track' },
    { title: 'Recommended Schemes', value: 5, link: '/schemes' },
    { title: 'New Marketplace Items', value: 8, link: '/marketplace' },
  ]

  const quickActions = [
    { title: 'Apply for Scheme', icon: FileText, link: '/schemes' },
    { title: 'File Grievance', icon: AlertCircle, link: '/grievance/file' },
    { title: 'Post to Marketplace', icon: ShoppingCart, link: '/marketplace/post' },
    { title: 'Community Forum', icon: MessageSquare, link: '/community/forum' },
    { title: 'Success Stories', icon: Heart, link: '/community/stories' },
    { title: 'Emergency SOS', icon: AlertCircle, link: '/emergency' },
  ]

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Welcome Back, Soldier</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Link to={stat.link} key={index}>
            <Card className="hover:shadow-lg transition-shadow">
              <h3 className="text-gray-600">{stat.title}</h3>
              <p className="text-3xl font-bold text-primary">{stat.value}</p>
            </Card>
          </Link>
        ))}
      </div>
      
      {/* Quick Actions */}
      <Card>
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {quickActions.map((action, index) => (
            <Link
              to={action.link}
              key={index}
              className="flex flex-col items-center p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors text-center"
            >
              <action.icon className="w-6 h-6 text-primary mb-2" />
              <span className="text-sm font-medium">{action.title}</span>
            </Link>
          ))}
        </div>
      </Card>
      
      {/* Recent Activity */}
      <Card>
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <div className="space-y-4">
          <div className="border-b border-gray-100 pb-3">
            <p className="text-gray-600">Your application for <strong>Education Grant</strong> was approved</p>
            <p className="text-sm text-gray-500">2 days ago</p>
          </div>
          <div className="border-b border-gray-100 pb-3">
            <p className="text-gray-600">New scheme <strong>Housing Loan Subsidy</strong> matches your profile</p>
            <p className="text-sm text-gray-500">4 days ago</p>
          </div>
          <div>
            <p className="text-gray-600">Your grievance <strong>#GRV-2023-001</strong> is being processed</p>
            <p className="text-sm text-gray-500">1 week ago</p>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default SoldierDashboard
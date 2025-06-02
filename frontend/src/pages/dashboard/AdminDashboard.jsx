import { Link } from 'react-router-dom'
import { Users, AlertCircle, FileText, Settings, MessageSquare } from 'lucide-react'
import Card from '../../components/Card'

const AdminDashboard = () => {
  const stats = [
    { title: 'Total Users', value: 356, link: '/admin/users' },
    { title: 'Active Grievances', value: 24, link: '/admin/moderation' },
    { title: 'Pending Moderation', value: 15, link: '/admin/moderation' },
    { title: 'System Health', value: 'Good', link: '/admin/settings' },
  ]

  const quickActions = [
    { title: 'User Management', icon: Users, link: '/admin/users' },
    { title: 'Content Moderation', icon: AlertCircle, link: '/admin/moderation' },
    { title: 'Reports', icon: FileText, link: '/admin/reports' },
    { title: 'System Settings', icon: Settings, link: '/admin/settings' },
    { title: 'Community Posts', icon: MessageSquare, link: '/admin/community' },
  ]

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      
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
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
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
      
      {/* System Alerts */}
      <Card>
        <h2 className="text-xl font-semibold mb-4">System Alerts</h2>
        <div className="space-y-3">
          <div className="p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
            <h3 className="font-medium">Database Backup Required</h3>
            <p className="text-sm text-gray-600">Last backup was 6 days ago</p>
          </div>
          <div className="p-3 bg-green-50 rounded-lg border-l-4 border-green-400">
            <h3 className="font-medium">All Systems Operational</h3>
            <p className="text-sm text-gray-600">No critical issues detected</p>
          </div>
          <div className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400">
            <h3 className="font-medium">New Version Available</h3>
            <p className="text-sm text-gray-600">Version 2.3.0 ready for update</p>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default AdminDashboard
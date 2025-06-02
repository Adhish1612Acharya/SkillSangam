import { Link } from 'react-router-dom'
import { FileText, AlertCircle, Users, CheckCircle } from 'lucide-react'
import Card from '../../components/Card'

const GovtDashboard = () => {
  const stats = [
    { title: 'Pending Approvals', value: 12, link: '/applications' },
    { title: 'New Grievances', value: 8, link: '/grievances' },
    { title: 'Schemes Managed', value: 15, link: '/schemes/manage' },
    { title: 'Users Registered', value: 245, link: '/admin/users' },
  ]

  const quickActions = [
    { title: 'Review Applications', icon: FileText, link: '/applications' },
    { title: 'Process Grievances', icon: AlertCircle, link: '/grievances' },
    { title: 'Manage Schemes', icon: CheckCircle, link: '/schemes/manage' },
    { title: 'User Management', icon: Users, link: '/admin/users' },
  ]

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Government Official Dashboard</h1>
      
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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
            <p className="text-gray-600"><strong>5 new applications</strong> received for Education Grant</p>
            <p className="text-sm text-gray-500">2 hours ago</p>
          </div>
          <div className="border-b border-gray-100 pb-3">
            <p className="text-gray-600">Grievance <strong>#GRV-2023-045</strong> marked as resolved</p>
            <p className="text-sm text-gray-500">1 day ago</p>
          </div>
          <div>
            <p className="text-gray-600">New scheme <strong>Healthcare Expansion</strong> published</p>
            <p className="text-sm text-gray-500">3 days ago</p>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default GovtDashboard
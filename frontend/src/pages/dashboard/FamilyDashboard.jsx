import { Link } from 'react-router-dom'
import { FileText, AlertCircle, Heart, MessageSquare } from 'lucide-react'
import Card from '../../components/Card'

const FamilyDashboard = () => {
  const stats = [
    { title: 'Active Applications', value: 2, link: '/applications' },
    { title: 'Recommended Schemes', value: 4, link: '/schemes' },
    { title: 'Family Benefits', value: 3, link: '/schemes' },
    { title: 'Community Updates', value: 5, link: '/community/forum' },
  ]

  const quickActions = [
    { title: 'Apply for Scheme', icon: FileText, link: '/schemes' },
    { title: 'File Grievance', icon: AlertCircle, link: '/grievance/file' },
    { title: 'Success Stories', icon: Heart, link: '/community/stories' },
    { title: 'Community Forum', icon: MessageSquare, link: '/community/forum' },
  ]

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Family Dashboard</h1>
      
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
      
      {/* Family Benefits */}
      <Card>
        <h2 className="text-xl font-semibold mb-4">Available Family Benefits</h2>
        <div className="space-y-3">
          <div className="p-3 bg-blue-50 rounded-lg">
            <h3 className="font-medium">Education Grant for Children</h3>
            <p className="text-sm text-gray-600">Up to ₹50,000 per child annually</p>
          </div>
          <div className="p-3 bg-blue-50 rounded-lg">
            <h3 className="font-medium">Healthcare Coverage</h3>
            <p className="text-sm text-gray-600">Free treatment at military hospitals</p>
          </div>
          <div className="p-3 bg-blue-50 rounded-lg">
            <h3 className="font-medium">Housing Subsidy</h3>
            <p className="text-sm text-gray-600">Interest subsidy on home loans</p>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default FamilyDashboard
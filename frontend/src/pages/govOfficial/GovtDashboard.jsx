import { useState } from 'react'
import { FileText, CheckCircle, XCircle, Plus, Search, BarChart2 } from 'lucide-react'
import Card from '../../components/Card'
import CreateSchemeModal from './components/CreateSchemeModal'
import ApplicationReviewModal from './components/ApplicationReviewModal'

const GovtDashboard = () => {
  const [showSchemeModal, setShowSchemeModal] = useState(false)
  const [showReviewModal, setShowReviewModal] = useState(false)
  const [selectedApplication, setSelectedApplication] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [activeTab, setActiveTab] = useState('pending')

  // Mock data - in real app this would come from API
  const department = {
    id: 1,
    name: 'Defense Benefits',
    description: 'Handles all benefit schemes for serving personnel'
  }

  const schemes = [
    {
      id: 1,
      title: 'Education Grant for Children',
      description: 'Financial assistance for education of soldiers children',
      active: true,
      applications: 24
    },
    {
      id: 2,
      title: 'Housing Loan Subsidy',
      description: 'Interest subsidy on home loans for serving personnel',
      active: true,
      applications: 18
    },
    {
      id: 3,
      title: 'Healthcare Extension',
      description: 'Extended healthcare benefits for family members',
      active: false,
      applications: 5
    }
  ]

  const applications = [
    {
      id: 1,
      schemeId: 1,
      applicant: 'Hav. Rajesh Kumar',
      serviceNo: '4567890',
      submitted: '2023-10-15',
      status: 'pending',
      documents: 3
    },
    {
      id: 2,
      schemeId: 1,
      applicant: 'Naik Priya Sharma',
      serviceNo: '5678901',
      submitted: '2023-10-14',
      status: 'pending',
      documents: 2
    },
    {
      id: 3,
      schemeId: 2,
      applicant: 'Sepoy Arun Singh',
      serviceNo: '6789012',
      submitted: '2023-10-10',
      status: 'approved',
      documents: 4
    },
    {
      id: 4,
      schemeId: 2,
      applicant: 'Subedar Mohan Patel',
      serviceNo: '7890123',
      submitted: '2023-10-05',
      status: 'rejected',
      reason: 'Incomplete documentation',
      documents: 1
    }
  ]

  const filteredSchemes = schemes.filter(scheme =>
    scheme.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    scheme.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredApplications = applications.filter(app => 
    app.status === activeTab && (
      app.applicant.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.serviceNo.includes(searchTerm)
    )
  )

  const handleReviewApplication = (app) => {
    setSelectedApplication(app)
    setShowReviewModal(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Officer Dashboard</h1>
          <p className="text-gray-600">Department: {department.name}</p>
        </div>
        <Button onClick={() => setShowSchemeModal(true)}>
          <Plus className="w-5 h-5 mr-2" />
          Create Scheme
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Active Schemes</p>
              <p className="text-3xl font-bold">
                {schemes.filter(s => s.active).length}
              </p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <FileText className="text-green-600 w-6 h-6" />
            </div>
          </div>
        </Card>
        <Card className="hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Pending Applications</p>
              <p className="text-3xl font-bold">
                {applications.filter(a => a.status === 'pending').length}
              </p>
            </div>
            <div className="bg-yellow-100 p-3 rounded-full">
              <FileText className="text-yellow-600 w-6 h-6" />
            </div>
          </div>
        </Card>
        <Card className="hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Processed This Month</p>
              <p className="text-3xl font-bold">
                {applications.filter(a => a.status !== 'pending').length}
              </p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <BarChart2 className="text-blue-600 w-6 h-6" />
            </div>
          </div>
        </Card>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {['pending', 'approved', 'rejected'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
              <span className="ml-2 bg-gray-100 text-gray-600 py-0.5 px-2 rounded-full text-xs">
                {applications.filter(a => a.status === tab).length}
              </span>
            </button>
          ))}
        </nav>
      </div>

      {/* Search */}
      <Card>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder={`Search ${activeTab} applications...`}
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-light"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </Card>

      {/* Applications List */}
      <Card>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Applicant
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Service No.
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Scheme
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Submitted
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Documents
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredApplications.length > 0 ? (
                filteredApplications.map((app) => (
                  <tr key={app.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{app.applicant}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                      {app.serviceNo}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-gray-900">
                        {schemes.find(s => s.id === app.schemeId)?.title}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                      {new Date(app.submitted).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                      {app.documents}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        app.status === 'approved' ? 'bg-green-100 text-green-800' :
                        app.status === 'rejected' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {app.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      {app.status === 'pending' ? (
                        <button
                          onClick={() => handleReviewApplication(app)}
                          className="text-primary hover:text-primary-dark"
                        >
                          Review
                        </button>
                      ) : (
                        <button
                          onClick={() => handleReviewApplication(app)}
                          className="text-gray-600 hover:text-gray-900"
                        >
                          View
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
                    No {activeTab} applications found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Modals */}
      <CreateSchemeModal
        isOpen={showSchemeModal}
        onClose={() => setShowSchemeModal(false)}
        departmentId={department.id}
      />
      <ApplicationReviewModal
        isOpen={showReviewModal}
        onClose={() => setShowReviewModal(false)}
        application={selectedApplication}
        scheme={selectedApplication ? schemes.find(s => s.id === selectedApplication.schemeId) : null}
      />
    </div>
  )
}

export default GovtDashboard
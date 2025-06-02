import { useParams } from 'react-router-dom'
import { ArrowLeft, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react'
import Card from '../../components/Card'
import Button from '../../components/Button'

const ApplicationStatus = () => {
  const { id } = useParams()
  
  // Mock application data
  const application = {
    id: id,
    scheme: 'Education Grant for Children',
    date: '2023-10-15',
    status: 'Under Review',
    documents: [
      'Service_certificate.pdf',
      'Birth_certificate.pdf',
      'Admission_proof.pdf'
    ],
    timeline: [
      { date: '2023-10-15', status: 'Submitted', description: 'Application submitted' },
      { date: '2023-10-18', status: 'Under Review', description: 'Application is being reviewed by officials' },
    ],
    remarks: 'Your application is currently being processed. Expected completion time is 7-10 working days.'
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Submitted':
        return <Clock className="w-5 h-5 text-yellow-500" />
      case 'Approved':
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case 'Rejected':
        return <XCircle className="w-5 h-5 text-red-500" />
      case 'Under Review':
        return <AlertCircle className="w-5 h-5 text-blue-500" />
      default:
        return <Clock className="w-5 h-5 text-gray-500" />
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <Button variant="outline" onClick={() => window.history.back()}>
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back
        </Button>
        <span className="flex items-center gap-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
          {getStatusIcon(application.status)}
          {application.status}
        </span>
      </div>
      
      <h1 className="text-2xl font-bold mb-2">Application #{application.id}</h1>
      <p className="text-gray-600 mb-6">{application.scheme}</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Application Details */}
        <div className="md:col-span-2 space-y-6">
          <Card>
            <h2 className="text-xl font-semibold mb-4">Application Details</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Application Date</p>
                <p className="font-medium">{application.date}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Current Status</p>
                <p className="font-medium">{application.status}</p>
              </div>
            </div>
          </Card>
          
          {/* Timeline */}
          <Card>
            <h2 className="text-xl font-semibold mb-4">Status Timeline</h2>
            <div className="space-y-4">
              {application.timeline.map((item, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className={`w-3 h-3 rounded-full ${
                      item.status === 'Submitted' ? 'bg-yellow-500' :
                      item.status === 'Under Review' ? 'bg-blue-500' :
                      item.status === 'Approved' ? 'bg-green-500' :
                      'bg-gray-500'
                    }`} />
                    {index < application.timeline.length - 1 && (
                      <div className="w-px h-8 bg-gray-200" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{item.status}</p>
                    <p className="text-sm text-gray-600">{item.description}</p>
                    <p className="text-xs text-gray-500 mt-1">{item.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
        
        {/* Documents and Remarks */}
        <div className="space-y-6">
          <Card>
            <h2 className="text-xl font-semibold mb-4">Submitted Documents</h2>
            <div className="space-y-2">
              {application.documents.map((doc, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded">
                  <span className="truncate">{doc}</span>
                  <button className="text-primary hover:underline text-sm">
                    View
                  </button>
                </div>
              ))}
            </div>
          </Card>
          
          <Card>
            <h2 className="text-xl font-semibold mb-4">Remarks</h2>
            <p className="text-gray-600">{application.remarks}</p>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default ApplicationStatus
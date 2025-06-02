import { useParams } from 'react-router-dom'
import { ArrowLeft, Clock, CheckCircle, XCircle, AlertCircle, ChevronUp } from 'lucide-react'
import Card from '../../components/Card'
import Button from '../../components/Button'

const TrackGrievance = () => {
  const { id } = useParams()
  
  // Mock grievance data
  const grievance = {
    id: id,
    title: 'Delay in Pension Processing',
    date: '2023-10-10',
    status: 'Under Review',
    category: 'Pension',
    priority: 'High',
    description: 'My pension has been delayed for 3 months despite submitting all documents. Followed up multiple times but no resolution yet.',
    documents: [
      'Pension_application.pdf',
      'Bank_details.pdf'
    ],
    timeline: [
      { date: '2023-10-10', status: 'Submitted', description: 'Grievance filed' },
      { date: '2023-10-12', status: 'Under Review', description: 'Assigned to pension department' },
    ],
    remarks: 'Your grievance is being reviewed by the pension department. Expected resolution time is 15 working days.',
    officer: 'Capt. R. Sharma',
    contact: 'pension-helpdesk@mod.gov.in'
  }

  const [showDetails, setShowDetails] = useState(false)

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Submitted':
        return <Clock className="w-5 h-5 text-yellow-500" />
      case 'Resolved':
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
          {getStatusIcon(grievance.status)}
          {grievance.status}
        </span>
      </div>
      
      <h1 className="text-2xl font-bold mb-2">Grievance #{grievance.id}</h1>
      <p className="text-gray-600 mb-6">{grievance.title}</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Grievance Details */}
        <div className="md:col-span-2 space-y-6">
          <Card>
            <h2 className="text-xl font-semibold mb-4">Grievance Details</h2>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-500">Date Filed</p>
                <p className="font-medium">{grievance.date}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Category</p>
                <p className="font-medium">{grievance.category}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Priority</p>
                <p className="font-medium capitalize">{grievance.priority}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Assigned Officer</p>
                <p className="font-medium">{grievance.officer}</p>
              </div>
            </div>
            
            <button 
              onClick={() => setShowDetails(!showDetails)}
              className="flex items-center gap-1 text-primary text-sm font-medium"
            >
              <span>{showDetails ? 'Hide' : 'View'} full description</span>
              <ChevronUp className={`w-4 h-4 transition-transform ${showDetails ? '' : 'rotate-180'}`} />
            </button>
            
            {showDetails && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-700 whitespace-pre-line">{grievance.description}</p>
              </div>
            )}
          </Card>
          
          {/* Timeline */}
          <Card>
            <h2 className="text-xl font-semibold mb-4">Status Timeline</h2>
            <div className="space-y-4">
              {grievance.timeline.map((item, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className={`w-3 h-3 rounded-full ${
                      item.status === 'Submitted' ? 'bg-yellow-500' :
                      item.status === 'Under Review' ? 'bg-blue-500' :
                      item.status === 'Resolved' ? 'bg-green-500' :
                      'bg-gray-500'
                    }`} />
                    {index < grievance.timeline.length - 1 && (
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
        
        {/* Documents and Actions */}
        <div className="space-y-6">
          <Card>
            <h2 className="text-xl font-semibold mb-4">Attached Documents</h2>
            <div className="space-y-2">
              {grievance.documents.map((doc, index) => (
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
            <p className="text-gray-600 mb-4">{grievance.remarks}</p>
            <div className="p-3 bg-blue-50 rounded-lg">
              <p className="text-sm font-medium text-blue-800">Contact Officer:</p>
              <p className="text-blue-600">{grievance.contact}</p>
            </div>
          </Card>
          
          {grievance.status !== 'Resolved' && (
            <Card className="border-l-4 border-red-500">
              <h2 className="text-xl font-semibold mb-3">Escalate Grievance</h2>
              <p className="text-gray-600 mb-4 text-sm">
                If your grievance is not resolved within the expected time frame, 
                you may escalate it to higher authorities.
              </p>
              <Button variant="danger" className="w-full">
                Escalate Now
              </Button>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

export default TrackGrievance
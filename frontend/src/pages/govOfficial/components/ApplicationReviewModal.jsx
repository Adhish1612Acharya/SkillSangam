import { useState } from 'react'
import { X, CheckCircle, XCircle, FileText, User, Clock, AlertCircle } from 'lucide-react'
import Modal from '../../../components/Modal'
import Button from '../../../components/Button'

const ApplicationReviewModal = ({ isOpen, onClose, application, scheme }) => {
  const [decision, setDecision] = useState('')
  const [rejectionReason, setRejectionReason] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!decision || (decision === 'rejected' && !rejectionReason)) return
    
    setIsSubmitting(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitSuccess(true)
      setTimeout(() => {
        setSubmitSuccess(false)
        onClose()
      }, 1500)
    }, 1000)
  }

  if (!application) return null

  if (submitSuccess) {
    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <div className="text-center p-6">
          {decision === 'approved' ? (
            <>
              <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Application Approved!</h3>
              <p className="text-gray-600">
                {application.applicant}'s application has been approved.
              </p>
            </>
          ) : (
            <>
              <XCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Application Rejected</h3>
              <p className="text-gray-600">
                {application.applicant} has been notified with the reason.
              </p>
            </>
          )}
        </div>
      </Modal>
    )
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">
            {application.status === 'pending' ? 'Review' : 'View'} Application
          </h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Application Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium text-gray-800 mb-2 flex items-center gap-2">
                <User className="w-5 h-5" />
                Applicant Details
              </h4>
              <div className="space-y-1 text-sm">
                <p><span className="text-gray-600">Name:</span> {application.applicant}</p>
                <p><span className="text-gray-600">Service No:</span> {application.serviceNo}</p>
                <p><span className="text-gray-600">Submitted:</span> {new Date(application.submitted).toLocaleDateString()}</p>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium text-gray-800 mb-2 flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Scheme Details
              </h4>
              <div className="space-y-1 text-sm">
                <p className="font-medium">{scheme?.title}</p>
                <p className="text-gray-600">{scheme?.description}</p>
              </div>
            </div>
          </div>

          {/* Documents */}
          <div>
            <h4 className="font-medium text-gray-800 mb-2">Submitted Documents</h4>
            <div className="bg-gray-50 p-4 rounded-lg">
              {application.documents > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {Array.from({ length: application.documents }).map((_, i) => (
                    <div key={i} className="border border-gray-200 p-2 rounded flex items-center gap-2">
                      <FileText className="w-4 h-4 text-gray-500" />
                      <span className="text-sm truncate">Document_{i+1}.pdf</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-sm">No documents submitted</p>
              )}
            </div>
          </div>

          {/* Decision Form */}
          {application.status === 'pending' && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-800 mb-2">Application Decision</h4>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="approve"
                      name="decision"
                      value="approved"
                      checked={decision === 'approved'}
                      onChange={() => setDecision('approved')}
                      className="h-4 w-4 text-primary focus:ring-primary-light border-gray-300"
                    />
                    <label htmlFor="approve" className="ml-2 block text-sm text-gray-700">
                      Approve Application
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="reject"
                      name="decision"
                      value="rejected"
                      checked={decision === 'rejected'}
                      onChange={() => setDecision('rejected')}
                      className="h-4 w-4 text-red-500 focus:ring-red-200 border-gray-300"
                    />
                    <label htmlFor="reject" className="ml-2 block text-sm text-gray-700">
                      Reject Application
                    </label>
                  </div>
                </div>
                {decision === 'rejected' && (
                  <div className="mt-3">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Reason for Rejection
                    </label>
                    <textarea
                      value={rejectionReason}
                      onChange={(e) => setRejectionReason(e.target.value)}
                      required
                      rows="3"
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-200"
                      placeholder="Provide clear reason for rejection..."
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      This reason will be shared with the applicant
                    </p>
                  </div>
                )}
              </div>
              {/* Action buttons */}
              <div className="flex justify-end gap-3 pt-4">
                <Button type="button" variant="outline" onClick={onClose}>
                  {application.status === 'pending' ? 'Close' : 'Done'}
                </Button>
                <Button 
                  type="submit" 
                  disabled={isSubmitting || !decision || (decision === 'rejected' && !rejectionReason)}
                  variant={decision === 'rejected' ? 'danger' : 'primary'}
                  className="flex items-center gap-1"
                >
                  {decision === 'approved' ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <XCircle className="w-5 h-5" />
                  )}
                  {isSubmitting ? 'Processing...' : `Confirm ${decision}`}
                </Button>
              </div>
            </form>
          )}

          {/* View only for processed applications */}
          {application.status !== 'pending' && (
            <div>
              <h4 className="font-medium text-gray-800 mb-2">Decision</h4>
              <div className={`p-3 rounded-lg ${
                application.status === 'approved' 
                  ? 'bg-green-50 text-green-800' 
                  : 'bg-red-50 text-red-800'
              }`}>
                <div className="flex items-start gap-2">
                  {application.status === 'approved' ? (
                    <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  ) : (
                    <XCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  )}
                  <div>
                    <p className="font-medium">
                      Application {application.status}
                      {application.status === 'rejected' && ' - ' + application.reason}
                    </p>
                    <p className="text-sm mt-1">
                      Processed on {new Date().toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Modal>
  )
}

export default ApplicationReviewModal
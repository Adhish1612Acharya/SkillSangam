import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, AlertTriangle, Upload } from 'lucide-react'
import Card from '../../components/Card'
import Button from '../../components/Button'

const FileGrievance = () => {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    priority: 'medium',
    isAnonymous: false,
    documents: []
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleFileChange = (e) => {
    setFormData(prev => ({
      ...prev,
      documents: [...prev.documents, ...Array.from(e.target.files)]
    }))
  }

  const removeDocument = (index) => {
    setFormData(prev => ({
      ...prev,
      documents: prev.documents.filter((_, i) => i !== index)
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitSuccess(true)
    }, 1500)
  }

  if (submitSuccess) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card className="text-center py-8">
          <AlertTriangle className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Grievance Filed Successfully!</h2>
          <p className="text-gray-600 mb-6">
            Your grievance has been recorded with reference ID: GRV-2023-00123.
            You can track its status in your dashboard.
          </p>
          <div className="flex justify-center gap-4">
            <Button onClick={() => navigate('/')}>Go to Dashboard</Button>
            <Button variant="outline" onClick={() => navigate('/grievance/track/GRV-2023-00123')}>
              Track Status
            </Button>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-1 text-primary mb-4 hover:underline"
      >
        <ArrowLeft className="w-5 h-5" />
        Back
      </button>
      
      <h1 className="text-2xl font-bold mb-2">File a Grievance</h1>
      <p className="text-gray-600 mb-6">
        Please provide details about your issue. Our team will review and respond promptly.
      </p>
      
      <Card>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="Brief title of your grievance"
              />
            </div>
            
            <div>
              <label htmlFor="category">Category</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="">Select Category</option>
                <option value="pay">Pay & Allowances</option>
                <option value="promotion">Promotion</option>
                <option value="posting">Posting/Transfer</option>
                <option value="medical">Medical Benefits</option>
                <option value="pension">Pension</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
          
          <div>
            <label htmlFor="description">Detailed Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full min-h-[150px]"
              placeholder="Provide complete details about your grievance including dates, locations, and any other relevant information"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="priority">Priority</label>
              <select
                id="priority"
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                required
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>
            
            <div className="flex items-center pt-6">
              <input
                type="checkbox"
                id="isAnonymous"
                name="isAnonymous"
                checked={formData.isAnonymous}
                onChange={handleChange}
                className="mr-2"
              />
              <label htmlFor="isAnonymous">File anonymously</label>
            </div>
          </div>
          
          {/* Documents Upload */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Supporting Documents (Optional)</h3>
            
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Upload className="w-10 h-10 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600 mb-2">Upload relevant documents to support your grievance</p>
              <input
                type="file"
                id="documents"
                name="documents"
                onChange={handleFileChange}
                multiple
                className="hidden"
              />
              <label
                htmlFor="documents"
                className="inline-block bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-lg cursor-pointer transition-colors"
              >
                Select Files
              </label>
              <p className="text-xs text-gray-500 mt-2">PDF, JPG, or PNG up to 5MB each</p>
            </div>
            
            {formData.documents.length > 0 && (
              <div className="mt-4 space-y-2">
                <h4 className="font-medium">Selected Files:</h4>
                <ul className="space-y-2">
                  {formData.documents.map((file, index) => (
                    <li key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                      <span className="truncate">{file.name}</span>
                      <button
                        type="button"
                        onClick={() => removeDocument(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          
          <div className="pt-4 border-t border-gray-200">
            <div className="flex justify-end">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Submit Grievance'}
              </Button>
            </div>
          </div>
        </form>
      </Card>
    </div>
  )
}

export default FileGrievance
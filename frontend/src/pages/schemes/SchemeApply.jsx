import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, HelpCircle, Upload, CheckCircle } from 'lucide-react'
import Card from '../../components/Card'
import Button from '../../components/Button'

const SchemeApply = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  
  // In a real app, this would come from an API call
  const scheme = {
    id: id,
    title: 'Education Grant for Children',
    description: 'Financial assistance for education of soldiers children up to ₹50,000 per child annually',
    requiredDocuments: [
      'Service certificate copy',
      'Child birth certificate',
      'School/College admission proof',
      'Fee receipt of current academic year',
    ],
  }
  
  const [formData, setFormData] = useState({
    serviceNumber: '',
    rank: '',
    unit: '',
    childName: '',
    institutionName: '',
    course: '',
    academicYear: '',
    amountRequested: '',
    documents: [],
    termsAgreed: false,
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

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
          <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Application Submitted Successfully!</h2>
          <p className="text-gray-600 mb-6">
            Your application for {scheme.title} has been received. 
            You can track its status in your dashboard.
          </p>
          <div className="flex justify-center gap-4">
            <Button onClick={() => navigate('/')}>Go to Dashboard</Button>
            <Button variant="outline" onClick={() => navigate('/schemes')}>
              Browse More Schemes
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
        Back to Schemes
      </button>
      
      <h1 className="text-2xl font-bold mb-2">Apply for {scheme.title}</h1>
      <p className="text-gray-600 mb-6">{scheme.description}</p>
      
      <Card>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Service Details */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Service Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="serviceNumber">Service Number</label>
                <input
                  type="text"
                  id="serviceNumber"
                  name="serviceNumber"
                  value={formData.serviceNumber}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="rank">Rank</label>
                <input
                  type="text"
                  id="rank"
                  name="rank"
                  value={formData.rank}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="unit">Unit/Regiment</label>
                <input
                  type="text"
                  id="unit"
                  name="unit"
                  value={formData.unit}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>
          
          {/* Scheme Specific Details */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Education Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="childName">Child Name</label>
                <input
                  type="text"
                  id="childName"
                  name="childName"
                  value={formData.childName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="institutionName">Institution Name</label>
                <input
                  type="text"
                  id="institutionName"
                  name="institutionName"
                  value={formData.institutionName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="course">Course/Class</label>
                <input
                  type="text"
                  id="course"
                  name="course"
                  value={formData.course}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="academicYear">Academic Year</label>
                <input
                  type="text"
                  id="academicYear"
                  name="academicYear"
                  value={formData.academicYear}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="amountRequested">Amount Requested (₹)</label>
                <input
                  type="number"
                  id="amountRequested"
                  name="amountRequested"
                  value={formData.amountRequested}
                  onChange={handleChange}
                  required
                  min="0"
                  max="50000"
                />
              </div>
            </div>
          </div>
          
          {/* Documents Upload */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Required Documents</h3>
              <div className="flex items-center gap-1 text-sm text-primary">
                <HelpCircle className="w-4 h-4" />
                <span>AI Assistance Available</span>
              </div>
            </div>
            
            <ul className="list-disc pl-5 mb-4 space-y-1 text-sm text-gray-600">
              {scheme.requiredDocuments.map((doc, index) => (
                <li key={index}>{doc}</li>
              ))}
            </ul>
            
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Upload className="w-10 h-10 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600 mb-2">Drag & drop files here or click to browse</p>
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
          
          {/* Terms and Submit */}
          <div className="pt-4 border-t border-gray-200">
            <div className="flex items-start mb-6">
              <input
                type="checkbox"
                id="termsAgreed"
                name="termsAgreed"
                checked={formData.termsAgreed}
                onChange={handleChange}
                required
                className="mt-1 mr-2"
              />
              <label htmlFor="termsAgreed" className="text-sm text-gray-600">
                I declare that all the information provided is correct to the best of my knowledge.
                I understand that providing false information may lead to disciplinary action.
              </label>
            </div>
            
            <div className="flex justify-end">
              <Button type="submit" disabled={isSubmitting || !formData.termsAgreed}>
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
              </Button>
            </div>
          </div>
        </form>
      </Card>
    </div>
  )
}

export default SchemeApply
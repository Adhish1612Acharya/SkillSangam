import { useState } from 'react'
import { ArrowLeft, Upload, X } from 'lucide-react'
import Card from '../../components/Card'
import Button from '../../components/Button'

const PostItem = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    price: '',
    condition: '',
    location: '',
    contact: '',
    images: []
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files)
    if (files.length + formData.images.length > 5) {
      alert('Maximum 5 images allowed')
      return
    }
    setFormData(prev => ({ ...prev, images: [...prev.images, ...files] }))
  }

  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
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
      <div className="max-w-md mx-auto">
        <Card className="text-center py-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-2">Item Posted Successfully!</h2>
          <p className="text-gray-600 mb-6">
            Your item is now visible in the marketplace. You can manage it from your dashboard.
          </p>
          <div className="flex justify-center gap-4">
            <Button onClick={() => window.location.href = '/marketplace'}>
              View Marketplace
            </Button>
            <Button variant="outline" onClick={() => setSubmitSuccess(false)}>
              Post Another Item
            </Button>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <button 
        onClick={() => window.history.back()}
        className="flex items-center gap-1 text-primary mb-4 hover:underline"
      >
        <ArrowLeft className="w-5 h-5" />
        Back
      </button>
      
      <h1 className="text-2xl font-bold mb-2">Post New Item</h1>
      <p className="text-gray-600 mb-6">List an item for sale, donation, or exchange</p>
      
      <Card>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Images Upload */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Item Images</h3>
            <p className="text-sm text-gray-500 mb-3">Upload up to 5 images (first image will be the cover)</p>
            
            <div className="flex flex-wrap gap-3 mb-3">
              {formData.images.map((image, index) => (
                <div key={index} className="relative">
                  <img 
                    src={URL.createObjectURL(image)} 
                    alt={`Preview ${index}`}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
              
              {formData.images.length < 5 && (
                <label className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    multiple
                    className="hidden"
                  />
                  <Upload className="w-6 h-6 text-gray-400" />
                </label>
              )}
            </div>
          </div>
          
          {/* Item Details */}
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
                placeholder="What are you offering?"
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
                <option value="clothing">Clothing</option>
                <option value="gear">Gear & Equipment</option>
                <option value="books">Books & Media</option>
                <option value="electronics">Electronics</option>
                <option value="furniture">Furniture</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="price">Price (₹)</label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="0 for free/donation"
                min="0"
              />
            </div>
            
            <div>
              <label htmlFor="condition">Condition</label>
              <select
                id="condition"
                name="condition"
                value={formData.condition}
                onChange={handleChange}
                required
              >
                <option value="">Select Condition</option>
                <option value="new">Brand New</option>
                <option value="excellent">Like New</option>
                <option value="good">Good</option>
                <option value="fair">Fair</option>
                <option value="poor">Poor</option>
              </select>
            </div>
          </div>
          
          <div>
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full min-h-[100px]"
              placeholder="Provide detailed description of the item"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="location">Location</label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                placeholder="Where is the item located?"
              />
            </div>
            
            <div>
              <label htmlFor="contact">Contact Number</label>
              <input
                type="tel"
                id="contact"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                required
                placeholder="How can buyers reach you?"
              />
            </div>
          </div>
          
          <div className="pt-4 border-t border-gray-200">
            <div className="flex justify-end">
              <Button type="submit" disabled={isSubmitting || formData.images.length === 0}>
                {isSubmitting ? 'Posting...' : 'Post Item'}
              </Button>
            </div>
          </div>
        </form>
      </Card>
    </div>
  )
}

export default PostItem
import { useState } from 'react'
import { Star, Sparkles, CheckCircle, AlertCircle } from 'lucide-react'
import Card from '../../components/Card'

const AIBenefitRecommender = () => {
  const [serviceDetails, setServiceDetails] = useState({
    status: 'serving',
    rank: 'havaldar',
    yearsOfService: 8,
    familyMembers: 2,
    children: 1,
    disabilities: 'none'
  })

  const recommendedSchemes = [
    {
      id: 1,
      name: 'Education Grant for Children',
      match: 95,
      description: 'Financial assistance for education of soldiers children up to ₹50,000 per child annually',
      reason: 'Matches your profile: Serving personnel with children'
    },
    {
      id: 2,
      name: 'Housing Loan Subsidy',
      match: 85,
      description: 'Interest subsidy on home loans for serving personnel with minimum 5 years service',
      reason: 'You qualify with 8 years of service'
    },
    {
      id: 3,
      name: 'Family Health Care Plan',
      match: 75,
      description: 'Comprehensive healthcare coverage for family members',
      reason: 'You have 2 family members eligible for coverage'
    }
  ]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setServiceDetails(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <div className="bg-primary text-white p-2 rounded-full">
          <Sparkles className="w-6 h-6" />
        </div>
        <h1 className="text-2xl font-bold">AI Benefit Recommender</h1>
      </div>

      <p className="text-gray-600">
        Get personalized scheme recommendations based on your service profile and family details.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Input */}
        <div className="md:col-span-1">
          <Card>
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <User className="w-5 h-5" />
              Your Profile
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Service Status</label>
                <select
                  name="status"
                  value={serviceDetails.status}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg p-2"
                >
                  <option value="serving">Serving</option>
                  <option value="retired">Retired</option>
                  <option value="veteran">Veteran</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Rank</label>
                <select
                  name="rank"
                  value={serviceDetails.rank}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg p-2"
                >
                  <option value="sepoy">Sepoy</option>
                  <option value="naik">Naik</option>
                  <option value="havaldar">Havaldar</option>
                  <option value="subedar">Subedar</option>
                  <option value="lieutenant">Lieutenant</option>
                  <option value="captain">Captain</option>
                  <option value="major">Major</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Years of Service</label>
                <input
                  type="number"
                  name="yearsOfService"
                  value={serviceDetails.yearsOfService}
                  onChange={handleInputChange}
                  min="0"
                  max="40"
                  className="w-full border border-gray-300 rounded-lg p-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Family Members</label>
                <input
                  type="number"
                  name="familyMembers"
                  value={serviceDetails.familyMembers}
                  onChange={handleInputChange}
                  min="0"
                  max="10"
                  className="w-full border border-gray-300 rounded-lg p-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Children (under 25)</label>
                <input
                  type="number"
                  name="children"
                  value={serviceDetails.children}
                  onChange={handleInputChange}
                  min="0"
                  max="10"
                  className="w-full border border-gray-300 rounded-lg p-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Disabilities</label>
                <select
                  name="disabilities"
                  value={serviceDetails.disabilities}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg p-2"
                >
                  <option value="none">None</option>
                  <option value="service-related">Service Related</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
          </Card>
        </div>

        {/* Recommendations */}
        <div className="md:col-span-2 space-y-4">
          <Card className="bg-blue-50 border border-blue-100">
            <div className="flex items-start gap-3">
              <div className="bg-blue-100 p-2 rounded-full">
                <Star className="text-blue-600 w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-blue-800">AI-Powered Recommendations</h3>
                <p className="text-sm text-blue-600">
                  These schemes are personalized for you based on your service profile and family details.
                </p>
              </div>
            </div>
          </Card>

          {recommendedSchemes.map(scheme => (
            <Card key={scheme.id} className="hover:shadow-lg transition-shadow">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold">{scheme.name}</h3>
                    <span className="flex items-center gap-1 bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                      <span className="font-bold">{scheme.match}%</span> match
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">{scheme.description}</p>
                  <div className="flex items-center gap-2 text-sm text-blue-600">
                    <Sparkles className="w-4 h-4" />
                    <span>{scheme.reason}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors text-sm font-medium">
                    View Details
                  </button>
                  <button className="text-primary text-sm font-medium hover:underline">
                    Save for later
                  </button>
                </div>
              </div>
            </Card>
          ))}

          <Card className="border-l-4 border-yellow-500">
            <div className="flex items-start gap-3">
              <div className="bg-yellow-100 p-2 rounded-full">
                <AlertCircle className="text-yellow-600 w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-yellow-800">Improve Recommendations</h3>
                <p className="text-sm text-yellow-600">
                  Update your profile details for more accurate suggestions. The AI learns as you provide more information.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default AIBenefitRecommender
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, Filter, Star, Clock, CheckCircle } from 'lucide-react'
import Card from '../../components/Card'

const SchemeList = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filter, setFilter] = useState('all')
  
  const schemes = [
    {
      id: 1,
      title: 'Education Grant for Children',
      description: 'Financial assistance for education of soldiers children',
      category: 'education',
      eligibility: 'All serving personnel',
      deadline: '2023-12-31',
      recommended: true,
    },
    {
      id: 2,
      title: 'Housing Loan Subsidy',
      description: 'Interest subsidy on home loans for serving and retired personnel',
      category: 'housing',
      eligibility: 'Minimum 5 years of service',
      deadline: 'Ongoing',
      recommended: false,
    },
    {
      id: 3,
      title: 'Healthcare Coverage Extension',
      description: 'Extended healthcare benefits for family members',
      category: 'health',
      eligibility: 'All serving personnel',
      deadline: '2023-11-30',
      recommended: true,
    },
    {
      id: 4,
      title: 'Skill Development Program',
      description: 'Vocational training for retiring personnel',
      category: 'employment',
      eligibility: 'Personnel retiring within 2 years',
      deadline: '2024-03-15',
      recommended: false,
    },
  ]

  const filteredSchemes = schemes.filter(scheme => {
    const matchesSearch = scheme.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         scheme.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filter === 'all' || 
                         (filter === 'recommended' && scheme.recommended) || 
                         scheme.category === filter
    return matchesSearch && matchesFilter
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-2xl font-bold">Available Schemes</h1>
        <Link 
          to="/ai/recommender" 
          className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors"
        >
          <Star className="w-5 h-5" />
          <span>Get AI Recommendations</span>
        </Link>
      </div>
      
      {/* Search and Filter */}
      <Card>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search schemes..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-light"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <select
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-light"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All Schemes</option>
              <option value="recommended">Recommended</option>
              <option value="education">Education</option>
              <option value="housing">Housing</option>
              <option value="health">Health</option>
              <option value="employment">Employment</option>
            </select>
          </div>
        </div>
      </Card>
      
      {/* AI Recommendations Section */}
      {filter === 'recommended' && (
        <Card className="bg-blue-50 border border-blue-100">
          <div className="flex items-start gap-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <Star className="text-blue-600 w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-blue-800">AI-Powered Recommendations</h3>
              <p className="text-sm text-blue-600">
                These schemes are personalized for you based on your service profile, 
                family details, and previous applications.
              </p>
            </div>
          </div>
        </Card>
      )}
      
      {/* Scheme List */}
      <div className="grid grid-cols-1 gap-4">
        {filteredSchemes.length > 0 ? (
          filteredSchemes.map((scheme) => (
            <Card key={scheme.id} className="hover:shadow-lg transition-shadow">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-semibold">{scheme.title}</h2>
                    {scheme.recommended && (
                      <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                        <Star className="w-3 h-3" />
                        Recommended
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 mt-1">{scheme.description}</p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
                      {scheme.category}
                    </span>
                    <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
                      {scheme.eligibility}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>{scheme.deadline}</span>
                  </div>
                  <Link
                    to={`/schemes/apply/${scheme.id}`}
                    className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors text-sm font-medium"
                  >
                    Apply Now
                  </Link>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <Card className="text-center py-8">
            <p className="text-gray-500">No schemes found matching your criteria</p>
          </Card>
        )}
      </div>
    </div>
  )
}

export default SchemeList
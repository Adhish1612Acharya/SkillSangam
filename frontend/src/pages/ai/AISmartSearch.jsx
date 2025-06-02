import { useState } from 'react'
import { Search, Filter, FileText, Shield, HeartPulse, Home, Book, Briefcase } from 'lucide-react'
import Card from '../../components/Card'

const AISmartSearch = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [filters, setFilters] = useState({
    category: 'all',
    rank: 'all',
    status: 'all'
  })

  const searchResults = [
    {
      id: 1,
      title: 'Education Grant Application Process',
      type: 'scheme',
      category: 'education',
      rank: 'all',
      status: 'serving',
      excerpt: 'Step-by-step guide to apply for education grant for your children'
    },
    {
      id: 2,
      title: 'Pension Documents Checklist',
      type: 'article',
      category: 'pension',
      rank: 'all',
      status: 'retired',
      excerpt: 'List of required documents for pension processing'
    },
    {
      id: 3,
      title: 'Housing Loan Subsidy - Eligibility',
      type: 'scheme',
      category: 'housing',
      rank: 'havaldar',
      status: 'serving',
      excerpt: 'Details about housing loan subsidy for serving personnel'
    }
  ]

  const filteredResults = searchResults.filter(result => {
    const matchesSearch = result.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         result.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = filters.category === 'all' || result.category === filters.category
    const matchesRank = filters.rank === 'all' || result.rank === filters.rank || result.rank === 'all'
    const matchesStatus = filters.status === 'all' || result.status === filters.status
    
    return matchesSearch && matchesCategory && matchesRank && matchesStatus
  })

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'education': return <Book className="w-5 h-5 text-blue-500" />
      case 'health': return <HeartPulse className="w-5 h-5 text-red-500" />
      case 'housing': return <Home className="w-5 h-5 text-green-500" />
      case 'pension': return <Shield className="w-5 h-5 text-purple-500" />
      case 'employment': return <Briefcase className="w-5 h-5 text-yellow-500" />
      default: return <FileText className="w-5 h-5 text-gray-500" />
    }
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <div className="bg-primary text-white p-2 rounded-full">
          <Search className="w-6 h-6" />
        </div>
        <h1 className="text-2xl font-bold">Smart Search</h1>
      </div>

      <p className="text-gray-600">
        Find answers across schemes, documents, and resources using AI-powered search
      </p>

      <Card>
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search for schemes, documents, or information..."
            className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-light text-lg"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <select
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-light"
              value={filters.category}
              onChange={(e) => setFilters({...filters, category: e.target.value})}
            >
              <option value="all">All Categories</option>
              <option value="education">Education</option>
              <option value="health">Health</option>
              <option value="housing">Housing</option>
              <option value="pension">Pension</option>
              <option value="employment">Employment</option>
            </select>
          </div>

          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <select
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-light"
              value={filters.rank}
              onChange={(e) => setFilters({...filters, rank: e.target.value})}
            >
              <option value="all">All Ranks</option>
              <option value="sepoy">Sepoy</option>
              <option value="naik">Naik</option>
              <option value="havaldar">Havaldar</option>
              <option value="subedar">Subedar</option>
              <option value="officer">Officer</option>
            </select>
          </div>

          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <select
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-light"
              value={filters.status}
              onChange={(e) => setFilters({...filters, status: e.target.value})}
            >
              <option value="all">All Status</option>
              <option value="serving">Serving</option>
              <option value="retired">Retired</option>
              <option value="veteran">Veteran</option>
            </select>
          </div>
        </div>
      </Card>

      {searchQuery && (
        <div>
          <h2 className="text-xl font-semibold mb-4">
            {filteredResults.length} Results for "{searchQuery}"
          </h2>

          {filteredResults.length > 0 ? (
            <div className="space-y-4">
              {filteredResults.map(result => (
                <Card key={result.id} className="hover:shadow-lg transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="bg-gray-100 p-3 rounded-full">
                      {getCategoryIcon(result.category)}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">{result.title}</h3>
                      <p className="text-gray-600 mb-2">{result.excerpt}</p>
                      <div className="flex flex-wrap gap-2">
                        <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full capitalize">
                          {result.category}
                        </span>
                        <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full capitalize">
                          {result.rank === 'all' ? 'All ranks' : result.rank}
                        </span>
                        <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full capitalize">
                          {result.status}
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="text-center py-8">
              <p className="text-gray-500">No results found matching your search criteria</p>
              <p className="text-sm text-gray-400 mt-2">
                Try different keywords or adjust your filters
              </p>
            </Card>
          )}
        </div>
      )}

      {!searchQuery && (
        <Card className="text-center py-8">
          <div className="max-w-md mx-auto">
            <Search className="w-10 h-10 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">What are you looking for?</h3>
            <p className="text-gray-600 mb-4">
              Search across all schemes, documents, and resources using keywords or filters
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              <button 
                onClick={() => setSearchQuery('education grant')}
                className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm transition-colors"
              >
                education grant
              </button>
              <button 
                onClick={() => setSearchQuery('pension documents')}
                className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm transition-colors"
              >
                pension documents
              </button>
              <button 
                onClick={() => setSearchQuery('housing loan')}
                className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm transition-colors"
              >
                housing loan
              </button>
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}

export default AISmartSearch
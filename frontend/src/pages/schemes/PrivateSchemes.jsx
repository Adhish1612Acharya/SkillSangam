import { Link } from 'react-router-dom'
import { Shield, Star, FileText } from 'lucide-react'
import Card from '../../components/Card'

const PrivateSchemes = () => {
  const privateSchemes = [
    {
      id: 1,
      title: 'Veteran Healthcare Plan',
      description: 'Exclusive healthcare coverage for retired personnel',
      eligibility: 'Retired personnel with 20+ years service',
      sponsor: 'ABC Insurance Co.'
    },
    {
      id: 2,
      title: 'Defense Housing Loan',
      description: 'Special home loan rates for defense personnel',
      eligibility: 'All serving and retired personnel',
      sponsor: 'XYZ Bank'
    },
    {
      id: 3,
      title: 'Education Scholarship',
      description: 'Merit-based scholarships for children of defense personnel',
      eligibility: 'Children of serving/retired personnel with 80%+ marks',
      sponsor: 'PQR Foundation'
    }
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Shield className="w-8 h-8 text-primary" />
        <h1 className="text-2xl font-bold">Private Partner Schemes</h1>
      </div>
      
      <p className="text-gray-600">
        These schemes are offered by our trusted partners exclusively for defense personnel and their families.
      </p>
      
      <div className="grid grid-cols-1 gap-4">
        {privateSchemes.map((scheme) => (
          <Card key={scheme.id} className="hover:shadow-lg transition-shadow">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-semibold">{scheme.title}</h2>
                  <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
                    Partner: {scheme.sponsor}
                  </span>
                </div>
                <p className="text-gray-600 mt-1">{scheme.description}</p>
                <div className="flex flex-wrap gap-2 mt-3">
                  <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
                    {scheme.eligibility}
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <Link
                  to={`/schemes/apply/${scheme.id}`}
                  className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors text-sm font-medium"
                >
                  Apply Now
                </Link>
                <button className="flex items-center gap-1 text-sm text-primary">
                  <Star className="w-4 h-4" />
                  <span>Save for later</span>
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>
      
      <Card className="bg-blue-50 border border-blue-100">
        <div className="flex items-start gap-4">
          <div className="bg-blue-100 p-3 rounded-full">
            <FileText className="text-blue-600 w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-blue-800">Partner With Us</h3>
            <p className="text-sm text-blue-600 mb-2">
              Are you an organization looking to support our defense personnel? Partner with us to offer exclusive benefits.
            </p>
            <button className="text-sm font-medium text-blue-700 hover:underline">
              Learn more about partnership opportunities
            </button>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default PrivateSchemes
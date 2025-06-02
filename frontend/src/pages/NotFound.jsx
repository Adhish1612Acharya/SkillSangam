import { Link } from 'react-router-dom'
import { AlertTriangle, ArrowLeft } from 'lucide-react'
import Card from '../components/Card'

const NotFound = () => {
  return (
    <div className="flex items-center justify-center w-screen bg-gray-50">
      <Card className="text-center p-8 max-w-md">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <AlertTriangle className="w-8 h-8 text-red-500" />
        </div>
        <h1 className="text-2xl font-bold mb-2">404 - Page Not Found</h1>
        <p className="text-gray-600 mb-6">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex justify-center gap-4">
          <Link 
            to="/" 
            className="flex items-center gap-1 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Go to Home
          </Link>
        </div>
      </Card>
    </div>
  )
}

export default NotFound
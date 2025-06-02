import { MapPin, Navigation, Share2 } from 'lucide-react'
import Card from '../../components/Card'

const LocationMap = () => {
  // In a real app, this would use the Google Maps API
  const nearbyLocations = [
    { name: 'Military Hospital', distance: '1.2 km', type: 'medical' },
    { name: 'Unit HQ', distance: '0.5 km', type: 'military' },
    { name: 'Police Station', distance: '2.1 km', type: 'police' },
    { name: 'Fire Station', distance: '3.4 km', type: 'fire' }
  ]

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Emergency Map</h1>
      
      <Card className="p-0 overflow-hidden">
        {/* Placeholder for map - in a real app, this would be a Google Maps component */}
        <div className="h-64 bg-gray-200 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="w-10 h-10 text-red-500 mx-auto mb-2" />
            <p className="text-gray-600">Map would display here</p>
            <p className="text-sm text-gray-500">(Google Maps integration)</p>
          </div>
        </div>
        
        <div className="p-4 border-t border-gray-200">
          <div className="flex justify-between">
            <button className="flex items-center gap-1 text-primary">
              <Navigation className="w-5 h-5" />
              <span>Get Directions</span>
            </button>
            <button className="flex items-center gap-1 text-primary">
              <Share2 className="w-5 h-5" />
              <span>Share Location</span>
            </button>
          </div>
        </div>
      </Card>
      
      <Card>
        <h2 className="text-lg font-semibold mb-4">Nearby Emergency Services</h2>
        <div className="space-y-3">
          {nearbyLocations.map((location, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  location.type === 'medical' ? 'bg-red-100 text-red-500' :
                  location.type === 'military' ? 'bg-green-100 text-green-500' :
                  'bg-blue-100 text-blue-500'
                }`}>
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-medium">{location.name}</p>
                  <p className="text-sm text-gray-500">{location.distance} away</p>
                </div>
              </div>
              <button className="text-primary text-sm font-medium hover:underline">
                View
              </button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}

export default LocationMap
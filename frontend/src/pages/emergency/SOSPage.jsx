import { useState } from 'react'
import { AlertTriangle, Phone, MapPin, Users, ChevronDown } from 'lucide-react'
import Card from '../../components/Card'
import Button from '../../components/Button'

const SOSPage = () => {
  const [isActive, setIsActive] = useState(false)
  const [showContacts, setShowContacts] = useState(false)
  
  const emergencyContacts = [
    { name: 'Military Police', number: '1907' },
    { name: 'Medical Emergency', number: '1908' },
    { name: 'Unit HQ', number: '011-25678901' },
    { name: 'Family Contact', number: '+91 9876543210' }
  ]

  const handleSOS = () => {
    setIsActive(true)
    // In a real app, this would trigger actual emergency protocols
    setTimeout(() => {
      setIsActive(false)
    }, 5000)
  }

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">Emergency Assistance</h1>
      
      <Card className="text-center p-8">
        <div className={`mb-6 mx-auto w-24 h-24 rounded-full flex items-center justify-center ${
          isActive ? 'bg-red-500 animate-pulse' : 'bg-red-100'
        }`}>
          <AlertTriangle className="w-12 h-12 text-white" />
        </div>
        
        <h2 className="text-xl font-semibold mb-2">
          {isActive ? 'Emergency Alert Activated!' : 'Emergency SOS'}
        </h2>
        <p className="text-gray-600 mb-6">
          {isActive 
            ? 'Help is on the way. Stay calm and follow instructions.' 
            : 'Press the button below in case of emergency'}
        </p>
        
        <Button 
          variant={isActive ? 'danger' : 'primary'} 
          className="w-full mb-4"
          onClick={handleSOS}
          disabled={isActive}
        >
          {isActive ? 'Emergency Activated' : 'Activate Emergency SOS'}
        </Button>
        
        <button 
          onClick={() => setShowContacts(!showContacts)}
          className="flex items-center justify-center gap-1 text-primary"
        >
          <span>Emergency Contacts</span>
          <ChevronDown className={`w-5 h-5 transition-transform ${showContacts ? 'rotate-180' : ''}`} />
        </button>
      </Card>
      
      {showContacts && (
        <Card className="mt-4">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Users className="w-5 h-5" />
            Emergency Contacts
          </h3>
          <div className="space-y-3">
            {emergencyContacts.map((contact, index) => (
              <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <Phone className="w-5 h-5 text-gray-500" />
                  <span>{contact.name}</span>
                </div>
                <a 
                  href={`tel:${contact.number.replace(/[^0-9]/g, '')}`}
                  className="text-primary hover:underline"
                >
                  {contact.number}
                </a>
              </div>
            ))}
          </div>
        </Card>
      )}
      
      <Card className="mt-4">
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <MapPin className="w-5 h-5" />
          Share My Location
        </h3>
        <p className="text-gray-600 mb-4">
          Allow location access to share your current position with emergency responders.
        </p>
        <Button variant="outline" className="w-full">
          Share Location
        </Button>
      </Card>
    </div>
  )
}

export default SOSPage
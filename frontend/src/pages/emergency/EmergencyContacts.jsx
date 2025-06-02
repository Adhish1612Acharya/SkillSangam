import { Phone, MapPin, Users, Shield, HeartPulse } from 'lucide-react'
import Card from '../../components/Card'

const EmergencyContacts = () => {
  const contactCategories = [
    {
      title: 'Immediate Assistance',
      icon: <Phone className="w-5 h-5" />,
      contacts: [
        { name: 'Military Police', number: '1907' },
        { name: 'Medical Emergency', number: '1908' },
        { name: 'Fire & Rescue', number: '1909' }
      ]
    },
    {
      title: 'Unit Contacts',
      icon: <Shield className="w-5 h-5" />,
      contacts: [
        { name: 'Unit HQ', number: '011-25678901' },
        { name: 'CO Office', number: '011-25678902' },
        { name: 'Adjutant', number: '011-25678903' }
      ]
    },
    {
      title: 'Medical Facilities',
      icon: <HeartPulse className="w-5 h-5" />,
      contacts: [
        { name: 'Base Hospital', number: '011-25678910' },
        { name: 'Emergency Ward', number: '011-25678911' },
        { name: 'Dental Clinic', number: '011-25678912' }
      ]
    },
    {
      title: 'Family Support',
      icon: <Users className="w-5 h-5" />,
      contacts: [
        { name: 'AWWA Helpline', number: '011-25678920' },
        { name: 'Canteen Services', number: '011-25678921' },
        { name: 'School Liaison', number: '011-25678922' }
      ]
    }
  ]

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Emergency Contacts</h1>
      
      <Card>
        <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
          <MapPin className="w-5 h-5 text-blue-600" />
          <div>
            <h3 className="font-medium text-blue-800">Current Location: </h3>
            <p className="text-sm text-blue-600">Enable location services to show your nearest facilities</p>
          </div>
        </div>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {contactCategories.map((category, index) => (
          <Card key={index}>
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              {category.icon}
              {category.title}
            </h2>
            <div className="space-y-3">
              {category.contacts.map((contact, idx) => (
                <div key={idx} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span>{contact.name}</span>
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
        ))}
      </div>
    </div>
  )
}

export default EmergencyContacts
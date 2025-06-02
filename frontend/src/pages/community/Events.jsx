import { Calendar, MapPin, Clock, Users } from 'lucide-react'
import Card from '../../components/Card'

const Events = () => {
  const events = [
    {
      id: 1,
      title: 'Veteran Job Fair',
      date: '2023-11-15',
      time: '10:00 AM - 4:00 PM',
      location: 'Delhi Cantonment',
      attendees: 45,
      description: 'Exclusive job fair for retired defense personnel with top employers'
    },
    {
      id: 2,
      title: 'Family Wellness Workshop',
      date: '2023-11-20',
      time: '2:00 PM - 5:00 PM',
      location: 'Online',
      attendees: 32,
      description: 'Mental health and wellness session for military families'
    },
    {
      id: 3,
      title: 'Annual Sainik Meet',
      date: '2023-12-05',
      time: '9:00 AM - 6:00 PM',
      location: 'Bangalore Military Station',
      attendees: 120,
      description: 'Annual gathering of serving and retired personnel'
    }
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Upcoming Events</h1>
        <p className="text-gray-600">Community gatherings, workshops, and meetups</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map(event => (
          <Card key={event.id} className="hover:shadow-lg transition-shadow">
            <div className="p-6">
              <div className="flex items-center gap-2 text-primary mb-2">
                <Calendar className="w-5 h-5" />
                <span className="font-medium">
                  {new Date(event.date).toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric', 
                    year: 'numeric' 
                  })}
                </span>
              </div>
              
              <h3 className="text-xl font-semibold mb-3">{event.title}</h3>
              <p className="text-gray-600 mb-4">{event.description}</p>
              
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>{event.attendees} attending</span>
                </div>
              </div>
              
              <div className="mt-4 pt-3 border-t border-gray-200">
                <button className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary-dark transition-colors">
                  Register Now
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card className="bg-blue-50 border border-blue-100">
        <div className="flex items-start gap-4">
          <div className="bg-blue-100 p-3 rounded-full">
            <Calendar className="text-blue-600 w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-blue-800">Host Your Event</h3>
            <p className="text-sm text-blue-600 mb-2">
              Have an event for the defense community? List it here to reach the right audience.
            </p>
            <button className="text-sm font-medium text-blue-700 hover:underline">
              Submit Event Details
            </button>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default Events
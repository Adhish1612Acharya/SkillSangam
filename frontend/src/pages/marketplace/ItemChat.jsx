import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { ArrowLeft, Send, User, MessageSquare } from 'lucide-react'
import Card from '../../components/Card'
import Button from '../../components/Button'

const ItemChat = () => {
  const { id } = useParams()
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: 'Hello, is this item still available?',
      sender: 'buyer',
      time: '10:30 AM'
    },
    {
      id: 2,
      text: 'Yes, it is available. Are you interested?',
      sender: 'seller',
      time: '10:32 AM'
    },
    {
      id: 3,
      text: 'Yes, can you share more details about the condition?',
      sender: 'buyer',
      time: '10:33 AM'
    }
  ])

  // Mock item data
  const item = {
    id: id,
    title: 'Tactical Backpack',
    price: '₹2500',
    seller: 'Maj. Singh'
  }

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (!message.trim()) return

    const newMessage = {
      id: messages.length + 1,
      text: message,
      sender: 'buyer',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }

    setMessages([...messages, newMessage])
    setMessage('')
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <button 
          onClick={() => window.history.back()}
          className="flex items-center gap-1 text-primary"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-2xl font-bold">Chat with Seller</h1>
      </div>

      <Card className="mb-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-semibold">{item.title}</h3>
            <p className="text-primary font-medium">{item.price}</p>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <User className="w-4 h-4" />
            <span>{item.seller}</span>
          </div>
        </div>
      </Card>

      <Card className="h-[500px] flex flex-col">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`flex ${msg.sender === 'buyer' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[80%] p-3 rounded-lg ${
                  msg.sender === 'buyer' 
                    ? 'bg-primary text-white rounded-br-none' 
                    : 'bg-gray-100 text-gray-800 rounded-bl-none'
                }`}
              >
                <p>{msg.text}</p>
                <p className={`text-xs mt-1 ${
                  msg.sender === 'buyer' ? 'text-primary-200' : 'text-gray-500'
                }`}>
                  {msg.time}
                </p>
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={handleSendMessage} className="border-t border-gray-200 p-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-light"
              required
            />
            <Button type="submit" className="flex items-center gap-1">
              <Send className="w-4 h-4" />
              <span className="sr-only">Send</span>
            </Button>
          </div>
        </form>
      </Card>

      <div className="mt-4 text-center text-sm text-gray-500">
        <p>For your safety, keep all communications within the platform</p>
      </div>
    </div>
  )
}

export default ItemChat
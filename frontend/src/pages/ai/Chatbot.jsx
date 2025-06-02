import { useState } from 'react'
import { Send, Bot, User, Sparkles } from 'lucide-react'
import Card from '../../components/Card'
import Button from '../../components/Button'

const Chatbot = () => {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: 'Hello! I\'m your Sainik Sahayak AI assistant. How can I help you today?',
      sender: 'bot',
      time: new Date().toLocaleTimeString()
    }
  ])

  const sampleQuestions = [
    'How to apply for education grant?',
    'What documents are needed for pension?',
    'List benefits for retired personnel',
    'How to file a grievance?'
  ]

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (!message.trim()) return

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: message,
      sender: 'user',
      time: new Date().toLocaleTimeString()
    }

    setMessages([...messages, userMessage])
    setMessage('')

    // Simulate bot response after a delay
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        text: getBotResponse(message),
        sender: 'bot',
        time: new Date().toLocaleTimeString()
      }
      setMessages(prev => [...prev, botResponse])
    }, 1000)
  }

  const getBotResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase()
    
    if (lowerMessage.includes('education grant')) {
      return 'To apply for education grant, go to Schemes section, select Education Grant, and submit the required documents including service certificate and admission proof.'
    } else if (lowerMessage.includes('pension') || lowerMessage.includes('documents')) {
      return 'For pension processing, you need: 1) Discharge book, 2) PPO copy, 3) Bank details, 4) Aadhaar card, and 5) Recent photograph.'
    } else if (lowerMessage.includes('benefit') || lowerMessage.includes('retired')) {
      return 'Retired personnel benefits include: 1) Pension, 2) ECHS medical facilities, 3) Canteen privileges, 4) Rail/air travel concessions, and 5) Re-employment assistance.'
    } else if (lowerMessage.includes('grievance')) {
      return 'To file a grievance: 1) Go to Grievance section, 2) Click "File Grievance", 3) Fill details, 4) Submit. You can track status in your dashboard.'
    } else {
      return 'I can help with information about schemes, benefits, grievances, and more. Please ask specific questions for best assistance.'
    }
  }

  const handleSampleQuestion = (question) => {
    setMessage(question)
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-primary text-white p-2 rounded-full">
          <Bot className="w-6 h-6" />
        </div>
        <h1 className="text-2xl font-bold">AI Assistant</h1>
      </div>

      <Card className="h-[600px] flex flex-col">
        {/* Chat messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[80%] p-3 rounded-lg flex items-start gap-2 ${
                  msg.sender === 'user' 
                    ? 'bg-primary text-white rounded-br-none' 
                    : 'bg-gray-100 text-gray-800 rounded-bl-none'
                }`}
              >
                {msg.sender === 'bot' && (
                  <div className="bg-primary text-white p-1 rounded-full">
                    <Bot className="w-4 h-4" />
                  </div>
                )}
                <div>
                  <p>{msg.text}</p>
                  <p className={`text-xs mt-1 ${
                    msg.sender === 'user' ? 'text-primary-200' : 'text-gray-500'
                  }`}>
                    {msg.time}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Sample questions */}
        {messages.length === 1 && (
          <div className="px-4 pb-4">
            <h3 className="text-sm text-gray-500 mb-2 flex items-center gap-1">
              <Sparkles className="w-4 h-4" />
              Try asking:
            </h3>
            <div className="flex flex-wrap gap-2">
              {sampleQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleSampleQuestion(question)}
                  className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1 rounded-full transition-colors"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Message input */}
        <form onSubmit={handleSendMessage} className="border-t border-gray-200 p-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your question..."
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
        <p>AI assistant may occasionally generate incorrect information. Verify important details.</p>
      </div>
    </div>
  )
}

export default Chatbot
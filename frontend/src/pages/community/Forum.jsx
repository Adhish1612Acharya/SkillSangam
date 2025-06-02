import { useState } from 'react'
import { Search, MessageSquare, User, Clock, ThumbsUp, MessageCircle } from 'lucide-react'
import Card from '../../components/Card'
import Button from '../../components/Button'

const Forum = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeTab, setActiveTab] = useState('recent')

  const categories = [
    { id: 'general', name: 'General Discussion' },
    { id: 'benefits', name: 'Benefits & Schemes' },
    { id: 'health', name: 'Health & Wellness' },
    { id: 'housing', name: 'Housing & Posting' },
    { id: 'family', name: 'Family Support' }
  ]

  const posts = [
    {
      id: 1,
      title: 'Education grant application process',
      category: 'benefits',
      author: 'Capt. R. Sharma',
      replies: 12,
      likes: 24,
      lastReply: '2 hours ago',
      isLiked: false
    },
    {
      id: 2,
      title: 'Best schools in Pune cantonment area',
      category: 'family',
      author: 'Maj. S. Patel',
      replies: 8,
      likes: 15,
      lastReply: '1 day ago',
      isLiked: true
    },
    {
      id: 3,
      title: 'Posting after completing tenure',
      category: 'housing',
      author: 'Lt. Col. A. Singh',
      replies: 5,
      likes: 10,
      lastReply: '3 days ago',
      isLiked: false
    },
    {
      id: 4,
      title: 'Mental health resources for veterans',
      category: 'health',
      author: 'Dr. N. Gupta',
      replies: 18,
      likes: 32,
      lastReply: '5 days ago',
      isLiked: false
    }
  ]

  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.author.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const toggleLike = (postId) => {
    // In a real app, this would update the state or make an API call
    console.log(`Toggled like for post ${postId}`)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Community Forum</h1>
          <p className="text-gray-600">Connect with fellow service members and families</p>
        </div>
        <Button>
          <MessageSquare className="w-5 h-5 mr-2" />
          New Post
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Categories */}
        <div className="lg:col-span-1">
          <Card>
            <h2 className="text-lg font-semibold mb-4">Categories</h2>
            <ul className="space-y-2">
              {categories.map(category => (
                <li key={category.id}>
                  <button 
                    onClick={() => setActiveTab(category.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg ${
                      activeTab === category.id 
                        ? 'bg-primary text-white' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {category.name}
                  </button>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        {/* Posts */}
        <div className="lg:col-span-3 space-y-4">
          <Card>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search forum posts..."
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-light"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </Card>

          {filteredPosts.length > 0 ? (
            filteredPosts.map(post => (
              <Card key={post.id} className="hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold mb-1">{post.title}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                      <User className="w-4 h-4" />
                      <span>{post.author}</span>
                      <span>•</span>
                      <span className="bg-gray-100 px-2 py-1 rounded-full text-xs">
                        {categories.find(c => c.id === post.category)?.name}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Clock className="w-4 h-4" />
                    <span>{post.lastReply}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={() => toggleLike(post.id)}
                      className="flex items-center gap-1 text-gray-500 hover:text-primary"
                    >
                      <ThumbsUp className={`w-4 h-4 ${post.isLiked ? 'fill-primary text-primary' : ''}`} />
                      <span>{post.likes}</span>
                    </button>
                    <div className="flex items-center gap-1 text-gray-500">
                      <MessageCircle className="w-4 h-4" />
                      <span>{post.replies} replies</span>
                    </div>
                  </div>
                  <button className="text-primary hover:underline text-sm font-medium">
                    View Discussion
                  </button>
                </div>
              </Card>
            ))
          ) : (
            <Card className="text-center py-8">
              <p className="text-gray-500">No posts found matching your search</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

export default Forum
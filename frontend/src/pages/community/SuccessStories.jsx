import { Heart, Share2, MessageSquare } from 'lucide-react'
import Card from '../../components/Card'

const SuccessStories = () => {
  const stories = [
    {
      id: 1,
      title: 'From Battlefield to Business',
      author: 'Col. (Retd.) Rajesh Verma',
      excerpt: 'How I transitioned from military service to a successful entrepreneurship journey',
      likes: 45,
      comments: 12,
      image: '/placeholder-story1.jpg'
    },
    {
      id: 2,
      title: 'Education Grant Changed Our Lives',
      author: 'Mrs. Priya Sharma (Wife of Hav. Sharma)',
      excerpt: 'My daughter could attend medical college thanks to the education grant scheme',
      likes: 32,
      comments: 8,
      image: '/placeholder-story2.jpg'
    },
    {
      id: 3,
      title: 'Rehabilitated and Thriving',
      author: 'Maj. (Retd.) Arjun Singh',
      excerpt: 'My journey of recovery after injury and how the rehabilitation program helped me',
      likes: 28,
      comments: 5,
      image: '/placeholder-story3.jpg'
    }
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Success Stories</h1>
        <p className="text-gray-600">Inspiration from our defense community members</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stories.map(story => (
          <Card key={story.id} className="hover:shadow-lg transition-shadow overflow-hidden">
            {/* Story Image Placeholder */}
            <div className="h-48 bg-gray-200 flex items-center justify-center">
              <div className="text-center text-gray-500">
                <div className="w-12 h-12 bg-gray-300 rounded-full mx-auto mb-2"></div>
                Story Image
              </div>
            </div>
            
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{story.title}</h3>
              <p className="text-gray-600 mb-4">{story.excerpt}</p>
              
              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <span>By {story.author}</span>
              </div>
              
              <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-1 text-gray-500 hover:text-primary">
                    <Heart className="w-4 h-4" />
                    <span>{story.likes}</span>
                  </button>
                  <button className="flex items-center gap-1 text-gray-500 hover:text-primary">
                    <MessageSquare className="w-4 h-4" />
                    <span>{story.comments}</span>
                  </button>
                </div>
                <button className="text-primary hover:underline text-sm font-medium">
                  Read Full Story
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="flex justify-center">
        <button className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition-colors">
          Share Your Story
        </button>
      </div>
    </div>
  )
}

export default SuccessStories
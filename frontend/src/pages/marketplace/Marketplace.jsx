import { useState } from 'react'
import { Search, Filter, Heart, MessageSquare, ShoppingCart } from 'lucide-react'
import Card from '../../components/Card'

const Marketplace = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [category, setCategory] = useState('all')
  
  const items = [
    {
      id: 1,
      title: 'Military Boots (Size 10)',
      description: 'Gently used combat boots, excellent condition',
      price: '₹1200',
      category: 'clothing',
      location: 'Delhi Cantt',
      posted: '2 days ago',
      seller: 'Capt. Sharma',
      isFavorite: false
    },
    {
      id: 2,
      title: 'Tactical Backpack',
      description: 'Brand new, never used 30L backpack with multiple compartments',
      price: '₹2500',
      category: 'gear',
      location: 'Pune',
      posted: '1 week ago',
      seller: 'Maj. Singh',
      isFavorite: true
    },
    {
      id: 3,
      title: 'Military History Books',
      description: 'Collection of 5 books on Indian military history',
      price: '₹800',
      category: 'books',
      location: 'Bangalore',
      posted: '3 days ago',
      seller: 'Lt. Verma',
      isFavorite: false
    },
    {
      id: 4,
      title: 'Camping Tent',
      description: '4-person tent, used twice, includes rainfly',
      price: '₹3500',
      category: 'gear',
      location: 'Mumbai',
      posted: '5 days ago',
      seller: 'Hav. Kumar',
      isFavorite: false
    }
  ]

  const filteredItems = items.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         item.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = category === 'all' || item.category === category
    return matchesSearch && matchesCategory
  })

  const toggleFavorite = (id) => {
    // In a real app, this would update the state or make an API call
    console.log(`Toggled favorite for item ${id}`)
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Military Marketplace</h1>
      <p className="text-gray-600">
        Buy, sell, or donate items within the defense community
      </p>
      
      {/* Search and Filter */}
      <Card>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search items..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-light"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <select
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-light"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="all">All Categories</option>
              <option value="clothing">Clothing</option>
              <option value="gear">Gear & Equipment</option>
              <option value="books">Books & Media</option>
              <option value="electronics">Electronics</option>
              <option value="furniture">Furniture</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
      </Card>
      
      {/* Items List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <Card key={item.id} className="hover:shadow-lg transition-shadow">
              <div className="relative">
                {/* Placeholder for item image */}
                <div className="h-48 bg-gray-200 rounded-t-lg flex items-center justify-center">
                  <ShoppingCart className="w-10 h-10 text-gray-400" />
                </div>
                <button 
                  onClick={() => toggleFavorite(item.id)}
                  className="absolute top-3 right-3 bg-white p-2 rounded-full shadow"
                >
                  <Heart className={`w-5 h-5 ${item.isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
                </button>
              </div>
              
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <span className="font-bold text-primary">{item.price}</span>
                </div>
                
                <p className="text-gray-600 text-sm mb-3">{item.description}</p>
                
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>{item.location}</span>
                  <span>{item.posted}</span>
                </div>
                
                <div className="mt-4 pt-3 border-t border-gray-200 flex justify-between">
                  <button className="text-primary hover:underline text-sm font-medium">
                    View Details
                  </button>
                  <button className="flex items-center gap-1 text-primary text-sm font-medium">
                    <MessageSquare className="w-4 h-4" />
                    <span>Chat</span>
                  </button>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <Card className="md:col-span-3 text-center py-8">
            <p className="text-gray-500">No items found matching your criteria</p>
          </Card>
        )}
      </div>
      
      <div className="flex justify-center">
        <button className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition-colors">
          Post New Item
        </button>
      </div>
    </div>
  )
}

export default Marketplace
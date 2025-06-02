import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  FilterList, 
  Favorite, 
  FavoriteBorder, 
  LocationOn, 
  ShoppingBag 
} from '@mui/icons-material';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  TextField,
  InputAdornment,
  Button,
  Divider,
  Grid,
  Select,
  MenuItem,
  IconButton,
  Chip,
  Paper,
  Pagination
} from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)(({ theme }) => ({
  transition: 'transform 0.2s, box-shadow 0.2s',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[6],
  },
}));

const Marketplace = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;
  
  const items = [
    {
      id: 1,
      title: 'Military Boots',
      description: 'Gently used combat boots, excellent condition',
      price: '₹1200',
      category: 'clothing',
      size: '10',
      condition: 'excellent',
      location: 'Delhi Cantt, New Delhi',
      posted: '2 days ago',
      seller: 'Capt. Sharma',
      contact: '+91 9876543210',
      isFavorite: false,
      image: '/placeholder-boots.jpg'
    },
    {
      id: 2,
      title: 'Tactical Backpack',
      description: 'Brand new, never used 30L backpack with multiple compartments',
      price: '₹2500',
      category: 'gear',
      condition: 'new',
      location: 'Pune, Maharashtra',
      posted: '1 week ago',
      seller: 'Maj. Singh',
      contact: '+91 8765432109',
      isFavorite: true,
      image: '/placeholder-backpack.jpg'
    },
    {
      id: 3,
      title: 'Military History Books',
      description: 'Collection of 5 books on Indian military history',
      price: '₹800',
      category: 'books',
      condition: 'good',
      location: 'Bangalore, Karnataka',
      posted: '3 days ago',
      seller: 'Lt. Verma',
      contact: '+91 7654321098',
      isFavorite: false,
      image: '/placeholder-books.jpg'
    },
    {
      id: 4,
      title: 'Camping Tent',
      description: '4-person tent, used twice, includes rainfly',
      price: '₹3500',
      category: 'gear',
      condition: 'good',
      location: 'Mumbai, Maharashtra',
      posted: '5 days ago',
      seller: 'Hav. Kumar',
      contact: '+91 6543210987',
      isFavorite: false,
      image: '/placeholder-tent.jpg'
    },
    {
      id: 5,
      title: 'Olive Green Jacket',
      description: 'Military style jacket, size XL, excellent condition',
      price: '₹1500',
      category: 'clothing',
      size: 'XL',
      condition: 'excellent',
      location: 'Chennai, Tamil Nadu',
      posted: '1 day ago',
      seller: 'Col. Reddy',
      contact: '+91 9432109876',
      isFavorite: false,
      image: '/placeholder-jacket.jpg'
    },
    {
      id: 6,
      title: 'Field Binoculars',
      description: '10x42 magnification, waterproof, with case',
      price: '₹4200',
      category: 'gear',
      condition: 'good',
      location: 'Hyderabad, Telangana',
      posted: '1 week ago',
      seller: 'Maj. Khan',
      contact: '+91 8321098765',
      isFavorite: true,
      image: '/placeholder-binoculars.jpg'
    }
  ];

  const filteredItems = items.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = category === 'all' || item.category === category;
    return matchesSearch && matchesCategory;
  });

  const paginatedItems = filteredItems.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const toggleFavorite = (id) => {
    // In a real app, this would update the state or make an API call
    console.log(`Toggled favorite for item ${id}`);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
        Military Marketplace
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        Buy, sell, or donate items within the defense community
      </Typography>
      
      {/* Search and Filter */}
      <Card sx={{ mb: 3, p: 2, borderRadius: 2, boxShadow: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search color="action" />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              select
              variant="outlined"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FilterList color="action" />
                  </InputAdornment>
                ),
              }}
            >
              <MenuItem value="all">All Categories</MenuItem>
              <MenuItem value="clothing">Clothing</MenuItem>
              <MenuItem value="gear">Gear & Equipment</MenuItem>
              <MenuItem value="books">Books & Media</MenuItem>
              <MenuItem value="electronics">Electronics</MenuItem>
              <MenuItem value="furniture">Furniture</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </TextField>
          </Grid>
        </Grid>
      </Card>
      
      {/* Items List */}
      <Grid container spacing={3}>
        {paginatedItems.length > 0 ? (
          paginatedItems.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <StyledCard>
                <CardMedia
                  component="div"
                  sx={{
                    height: 200,
                    backgroundColor: 'grey.200',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <ShoppingBag sx={{ fontSize: 60, color: 'grey.500' }} />
                </CardMedia>
                <Box sx={{ position: 'absolute', top: 8, right: 8 }}>
                  <IconButton 
                    onClick={() => toggleFavorite(item.id)}
                    sx={{ backgroundColor: 'background.paper' }}
                  >
                    {item.isFavorite ? (
                      <Favorite color="error" />
                    ) : (
                      <FavoriteBorder />
                    )}
                  </IconButton>
                </Box>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="h6" component="h3" sx={{ fontWeight: 'medium' }}>
                      {item.title}
                      {item.size && ` (Size ${item.size})`}
                    </Typography>
                    <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>
                      {item.price}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {item.description}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Chip label={item.condition} size="small" color="primary" variant="outlined" />
                    <Chip label={item.location.split(',')[0]} size="small" />
                  </Box>
                  <Typography variant="caption" color="text.secondary">
                    {item.posted} • {item.seller}
                  </Typography>
                </CardContent>
                <Divider />
                <CardActions sx={{ justifyContent: 'space-between', p: 2 }}>
                  <Button 
                    size="small" 
                    color="primary"
                    onClick={() => navigate(`/marketplace/item/${item.id}`)}
                  >
                    View Details
                  </Button>
                  <Button 
                    size="small" 
                    color="primary"
                    startIcon={<LocationOn />}
                    onClick={() => navigate(`/marketplace/location/${item.id}`, { state: { location: item.location } })}
                  >
                    View Location
                  </Button>
                </CardActions>
              </StyledCard>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Paper sx={{ p: 4, textAlign: 'center' }}>
              <Typography variant="body1" color="text.secondary">
                No items found matching your criteria
              </Typography>
            </Paper>
          </Grid>
        )}
      </Grid>
      
      {filteredItems.length > itemsPerPage && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Pagination
            count={Math.ceil(filteredItems.length / itemsPerPage)}
            page={page}
            onChange={handlePageChange}
            color="primary"
            shape="rounded"
          />
        </Box>
      )}
      
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Button 
          variant="contained" 
          size="large" 
          sx={{ px: 4 }}
          onClick={() => navigate('/marketplace/post')}
        >
          Post New Item
        </Button>
      </Box>
    </Box>
  );
};

export default Marketplace;
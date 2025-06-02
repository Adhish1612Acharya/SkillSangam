import { useState } from 'react';
import { 
  Search, 
  FilterList, 
  Favorite, 
  FavoriteBorder, 
  Message, 
  ShoppingBag 
} from '@mui/icons-material';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardHeader,
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
  Paper
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
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');
  
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
      isFavorite: false,
      image: '/placeholder-boots.jpg'
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
      isFavorite: true,
      image: '/placeholder-backpack.jpg'
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
      isFavorite: false,
      image: '/placeholder-books.jpg'
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
      isFavorite: false,
      image: '/placeholder-tent.jpg'
    }
  ];

  const filteredItems = items.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = category === 'all' || item.category === category;
    return matchesSearch && matchesCategory;
  });

  const toggleFavorite = (id) => {
    // In a real app, this would update the state or make an API call
    console.log(`Toggled favorite for item ${id}`);
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
      <Card sx={{ mb: 3, p: 2 }}>
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
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
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
                    </Typography>
                    <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>
                      {item.price}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {item.description}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Chip label={item.location} size="small" />
                    <Typography variant="caption" color="text.secondary">
                      {item.posted}
                    </Typography>
                  </Box>
                </CardContent>
                <Divider />
                <CardActions sx={{ justifyContent: 'space-between', p: 2 }}>
                  <Button size="small" color="primary">
                    View Details
                  </Button>
                  <Button 
                    size="small" 
                    color="primary"
                    startIcon={<Message />}
                  >
                    Chat
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
      
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Button variant="contained" size="large" sx={{ px: 4 }}>
          Post New Item
        </Button>
      </Box>
    </Box>
  );
};

export default Marketplace;
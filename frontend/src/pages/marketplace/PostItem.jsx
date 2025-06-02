import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, X } from 'lucide-react';
import {
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  Button,
  Card,
  CardContent,
  Divider,
  Avatar,
  IconButton,
  InputAdornment,
  FormControl,
  InputLabel,
  Snackbar,
  Alert,
  Fade,
  Slide,
  Grow,
  Grid,
  Paper,
  Chip,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledTextarea = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    padding: theme.spacing(1.5),
    minHeight: 100,
    alignItems: 'flex-start'
  }
}));

const ImagePreviewContainer = styled(Paper)(({ theme }) => ({
  position: 'relative',
  width: 120,
  height: 120,
  borderRadius: theme.shape.borderRadius,
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '& img': {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  }
}));

const UploadLabel = styled('label')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: 120,
  height: 120,
  border: `2px dashed ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  cursor: 'pointer',
  transition: theme.transitions.create(['border-color', 'background-color']),
  '&:hover': {
    borderColor: theme.palette.primary.main,
    backgroundColor: theme.palette.action.hover
  }
}));

const PostItem = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    size: '',
    price: '',
    condition: '',
    location: '',
    contact: '',
    images: []
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + formData.images.length > 5) {
      setSnackbarMessage('Maximum 5 images allowed');
      setSnackbarOpen(true);
      return;
    }
    
    // Validate image types
    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    const invalidFiles = files.filter(file => !validTypes.includes(file.type));
    
    if (invalidFiles.length > 0) {
      setSnackbarMessage('Only JPG, PNG, and WEBP images are allowed');
      setSnackbarOpen(true);
      return;
    }
    
    setFormData(prev => ({ ...prev, images: [...prev.images, ...files] }));
  };

  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      // In a real app, you would navigate to marketplace or save the item
    }, 1500);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  if (submitSuccess) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
        <Slide in direction="up" timeout={500}>
          <Card sx={{ maxWidth: 600, width: '100%', p: 6, textAlign: 'center', boxShadow: 3 }}>
            <Avatar
              sx={{
                width: 80,
                height: 80,
                bgcolor: 'success.light',
                color: 'success.contrastText',
                mx: 'auto',
                mb: 3
              }}
            >
              <svg width={40} height={40} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </Avatar>
            <Typography variant="h4" component="h2" sx={{ fontWeight: 700, mb: 2 }}>
              Item Posted Successfully!
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              Your item is now visible in the marketplace. You can manage it from your dashboard.
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
              <Button 
                variant="contained" 
                size="large"
                onClick={() => navigate('/marketplace')}
                sx={{ borderRadius: 2, px: 4 }}
              >
                View Marketplace
              </Button>
              <Button 
                variant="outlined" 
                size="large"
                onClick={() => setSubmitSuccess(false)}
                sx={{ borderRadius: 2, px: 4 }}
              >
                Post Another Item
              </Button>
            </Box>
          </Card>
        </Slide>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 'md', mx: 'auto', p: { xs: 2, md: 4 } }}>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="error" onClose={handleSnackbarClose} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>

      <Button 
        startIcon={<ArrowLeft size={20} />}
        onClick={() => navigate(-1)}
        sx={{ mb: 3, color: 'text.secondary' }}
      >
        Back
      </Button>
      
      <Typography variant="h4" component="h1" sx={{ fontWeight: 700, mb: 1 }}>
        Post New Item
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 4 }}>
        List an item for sale, donation, or exchange
      </Typography>
      
      <Grow in timeout={500}>
        <Card sx={{ p: { xs: 2, md: 4 }, borderRadius: 2, boxShadow: 3 }}>
          <form onSubmit={handleSubmit}>
            {/* Images Upload */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" component="h3" sx={{ fontWeight: 600, mb: 2 }}>
                Item Images
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Upload up to 5 images (first image will be the cover)
              </Typography>
              
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2 }}>
                {formData.images.map((image, index) => (
                  <Fade in key={index} timeout={500}>
                    <ImagePreviewContainer variant="outlined">
                      <img 
                        src={URL.createObjectURL(image)} 
                        alt={`Preview ${index}`}
                      />
                      <Chip
                        label={<X size={16} />}
                        onClick={() => removeImage(index)}
                        sx={{
                          position: 'absolute',
                          top: 8,
                          right: 8,
                          backgroundColor: 'error.main',
                          color: 'error.contrastText',
                          '&:hover': {
                            backgroundColor: 'error.dark'
                          }
                        }}
                      />
                    </ImagePreviewContainer>
                  </Fade>
                ))}
                
                {formData.images.length < 5 && (
                  <div>
                    <input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      multiple
                      style={{ display: 'none' }}
                    />
                    <UploadLabel htmlFor="image-upload">
                      <Upload size={24} />
                      <Typography variant="caption" sx={{ mt: 1 }}>
                        Add Image
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        ({5 - formData.images.length} left)
                      </Typography>
                    </UploadLabel>
                  </div>
                )}
              </Box>
            </Box>
            
            <Divider sx={{ my: 4 }} />
            
            {/* Item Details */}
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Title"
                  variant="outlined"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  placeholder="What are you offering?"
                  sx={{ mb: 2 }}
                />
              </Grid>
              
              <Grid item xs={12} md={6}>
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel>Category</InputLabel>
                  <Select
                    label="Category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                  >
                    <MenuItem value="">Select Category</MenuItem>
                    <MenuItem value="clothing">Clothing</MenuItem>
                    <MenuItem value="gear">Gear & Equipment</MenuItem>
                    <MenuItem value="books">Books & Media</MenuItem>
                    <MenuItem value="electronics">Electronics</MenuItem>
                    <MenuItem value="furniture">Furniture</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              
              {formData.category === 'clothing' && (
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel>Size</InputLabel>
                    <Select
                      label="Size"
                      name="size"
                      value={formData.size}
                      onChange={handleChange}
                      required
                    >
                      <MenuItem value="">Select Size</MenuItem>
                      <MenuItem value="XS">XS</MenuItem>
                      <MenuItem value="S">S</MenuItem>
                      <MenuItem value="M">M</MenuItem>
                      <MenuItem value="L">L</MenuItem>
                      <MenuItem value="XL">XL</MenuItem>
                      <MenuItem value="XXL">XXL</MenuItem>
                      <MenuItem value="XXXL">XXXL</MenuItem>
                      <MenuItem value="custom">Custom Size</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              )}
              
              <Grid item xs={12} md={formData.category === 'clothing' ? 6 : 6}>
                <TextField
                  fullWidth
                  label="Price (₹)"
                  variant="outlined"
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="0 for free/donation"
                  min="0"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">₹</InputAdornment>
                    )
                  }}
                  sx={{ mb: 2 }}
                />
              </Grid>
              
              <Grid item xs={12} md={6}>
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel>Condition</InputLabel>
                  <Select
                    label="Condition"
                    name="condition"
                    value={formData.condition}
                    onChange={handleChange}
                    required
                  >
                    <MenuItem value="">Select Condition</MenuItem>
                    <MenuItem value="new">Brand New</MenuItem>
                    <MenuItem value="excellent">Like New</MenuItem>
                    <MenuItem value="good">Good</MenuItem>
                    <MenuItem value="fair">Fair</MenuItem>
                    <MenuItem value="poor">Poor</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12}>
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <StyledTextarea
                    label="Description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    placeholder="Provide detailed description of the item"
                    multiline
                    rows={4}
                  />
                </FormControl>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Location"
                  variant="outlined"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  placeholder="Where is the item located?"
                  sx={{ mb: 2 }}
                />
              </Grid>
              
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Contact Number"
                  variant="outlined"
                  type="tel"
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
                  required
                  placeholder="How can buyers reach you?"
                  sx={{ mb: 2 }}
                />
              </Grid>
            </Grid>
            
            <Divider sx={{ my: 4 }} />
            
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={isSubmitting || formData.images.length === 0}
                sx={{
                  px: 6,
                  borderRadius: 2,
                  fontWeight: 600,
                  minWidth: 150
                }}
                startIcon={isSubmitting ? <CircularProgress size={20} color="inherit" /> : null}
              >
                {isSubmitting ? 'Posting...' : 'Post Item'}
              </Button>
            </Box>
          </form>
        </Card>
      </Grow>
    </Box>
  );
};

export default PostItem;
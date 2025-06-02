import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowBack, 
  Warning, 
  Upload, 
  Delete,
  CheckCircle,
  Close
} from '@mui/icons-material';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Button, 
  TextField, 
  Select, 
  MenuItem, 
  FormControl, 
  InputLabel, 
  Checkbox, 
  FormControlLabel, 
  Chip,
  Divider,
  CircularProgress,
  useTheme,
  Paper,
  IconButton,
  Alert
} from '@mui/material';
import { styled } from '@mui/system';
import { motion } from 'framer-motion';

const StyledDropzone = styled('div')(({ theme }) => ({
  border: `2px dashed ${theme.palette.primary.main}`,
  borderRadius: '12px',
  padding: theme.spacing(4),
  textAlign: 'center',
  cursor: 'pointer',
  transition: 'all 0.3s',
  backgroundColor: theme.palette.primary.light + '10',
  '&:hover': {
    backgroundColor: theme.palette.primary.light + '20',
  }
}));

const FileGrievance = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    priority: 'medium',
    isAnonymous: false,
    documents: []
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.some(file => file.size > 5 * 1024 * 1024)) {
      setError('File size should be less than 5MB');
      return;
    }
    setError(null);
    setFormData(prev => ({
      ...prev,
      documents: [...prev.documents, ...files]
    }));
  };

  const removeDocument = (index) => {
    setFormData(prev => ({
      ...prev,
      documents: prev.documents.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.category || !formData.description) {
      setError('Please fill all required fields');
      return;
    }
    
    setIsSubmitting(true);
    setError(null);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
    }, 2000);
  };

  if (submitSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Box sx={{ maxWidth: 'md', mx: 'auto', p: 3 }}>
          <Card sx={{ 
            textAlign: 'center', 
            p: 6,
            borderRadius: '16px',
            boxShadow: theme.shadows[4]
          }}>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            >
              <CheckCircle sx={{ 
                fontSize: '80px', 
                color: theme.palette.success.main,
                mb: 3
              }} />
            </motion.div>
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
              Grievance Filed Successfully!
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              Your grievance has been recorded with reference ID: <strong>GRV-2023-00123</strong>.
              You can track its status in your dashboard.
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
              <Button 
                variant="contained" 
                onClick={() => navigate('/')}
                sx={{ borderRadius: '8px' }}
              >
                Go to Dashboard
              </Button>
              <Button 
                variant="outlined" 
                onClick={() => navigate('/grievance/track/GRV-2023-00123')}
                sx={{ borderRadius: '8px' }}
              >
                Track Status
              </Button>
            </Box>
          </Card>
        </Box>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Box sx={{ maxWidth: 'lg', mx: 'auto', p: 3 }}>
        <Button 
          startIcon={<ArrowBack />}
          onClick={() => navigate(-1)}
          sx={{ mb: 3 }}
        >
          Back
        </Button>
        
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          File a Grievance
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Please provide details about your issue. Our team will review and respond promptly.
        </Typography>
        
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}
        
        <Card sx={{ 
          p: 4,
          borderRadius: '16px',
          boxShadow: theme.shadows[2]
        }}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Title"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  placeholder="Brief title of your grievance"
                  variant="outlined"
                />
              </Grid>
              
              <Grid item xs={12} md={6}>
                <FormControl fullWidth required>
                  <InputLabel id="category-label">Category</InputLabel>
                  <Select
                    labelId="category-label"
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    label="Category"
                  >
                    <MenuItem value=""><em>Select Category</em></MenuItem>
                    <MenuItem value="pay">Pay & Allowances</MenuItem>
                    <MenuItem value="promotion">Promotion</MenuItem>
                    <MenuItem value="posting">Posting/Transfer</MenuItem>
                    <MenuItem value="medical">Medical Benefits</MenuItem>
                    <MenuItem value="pension">Pension</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Detailed Description"
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  multiline
                  rows={6}
                  placeholder="Provide complete details about your grievance including dates, locations, and any other relevant information"
                  variant="outlined"
                />
              </Grid>
              
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel id="priority-label">Priority</InputLabel>
                  <Select
                    labelId="priority-label"
                    id="priority"
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                    label="Priority"
                  >
                    <MenuItem value="low">Low</MenuItem>
                    <MenuItem value="medium">Medium</MenuItem>
                    <MenuItem value="high">High</MenuItem>
                    <MenuItem value="urgent">Urgent</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.isAnonymous}
                      onChange={handleChange}
                      name="isAnonymous"
                      color="primary"
                    />
                  }
                  label="File anonymously"
                  sx={{ mt: 2 }}
                />
              </Grid>
              
              <Grid item xs={12}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                  Supporting Documents (Optional)
                </Typography>
                
                <input
                  type="file"
                  id="documents"
                  name="documents"
                  onChange={handleFileChange}
                  multiple
                  accept=".pdf,.jpg,.jpeg,.png"
                  style={{ display: 'none' }}
                />
                <label htmlFor="documents">
                  <StyledDropzone>
                    <Upload sx={{ 
                      fontSize: '40px', 
                      color: theme.palette.primary.main,
                      mb: 1
                    }} />
                    <Typography variant="body1" color="primary" sx={{ mb: 1 }}>
                      Upload relevant documents
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Drag & drop files here or click to browse
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      PDF, JPG, or PNG up to 5MB each
                    </Typography>
                  </StyledDropzone>
                </label>
                
                {formData.documents.length > 0 && (
                  <Box sx={{ mt: 3 }}>
                    <Typography variant="subtitle2" sx={{ mb: 1 }}>
                      Selected Files:
                    </Typography>
                    <Paper variant="outlined" sx={{ p: 2 }}>
                      {formData.documents.map((file, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <Box sx={{ 
                            display: 'flex', 
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            p: 1,
                            mb: 1,
                            borderRadius: '4px',
                            backgroundColor: 'action.hover'
                          }}>
                            <Typography variant="body2" sx={{ flex: 1, ml: 1 }}>
                              {file.name}
                            </Typography>
                            <IconButton
                              size="small"
                              onClick={() => removeDocument(index)}
                              color="error"
                            >
                              <Delete fontSize="small" />
                            </IconButton>
                          </Box>
                        </motion.div>
                      ))}
                    </Paper>
                  </Box>
                )}
              </Grid>
              
              <Grid item xs={12}>
                <Divider sx={{ my: 2 }} />
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={isSubmitting}
                    startIcon={isSubmitting ? <CircularProgress size={20} /> : null}
                    sx={{ borderRadius: '8px' }}
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Grievance'}
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </Card>
      </Box>
    </motion.div>
  );
};

export default FileGrievance;
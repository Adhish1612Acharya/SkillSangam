import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  ArrowBack,
  HelpOutline,
  CloudUpload,
  CheckCircle,
  DeleteOutline,
  InfoOutlined
} from '@mui/icons-material'
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  TextField,
  Grid,
  FormControlLabel,
  Checkbox,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Paper,
  Fade,
  Grow,
  Slide,
  Zoom,
  useTheme,
  styled
} from '@mui/material'
import { LoadingButton } from '@mui/lab'

const AnimatedCard = styled(Card)(({ theme }) => ({
  transition: theme.transitions.create(['transform', 'box-shadow'], {
    duration: theme.transitions.duration.standard,
  }),
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: theme.shadows[8],
  },
}))

const FileUploadArea = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  border: `2px dashed ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  textAlign: 'center',
  cursor: 'pointer',
  transition: theme.transitions.create(['border-color', 'background-color'], {
    duration: theme.transitions.duration.short,
  }),
  '&:hover': {
    borderColor: theme.palette.primary.main,
    backgroundColor: theme.palette.action.hover,
  },
}))

const SchemeApply = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const theme = useTheme()
  
  const scheme = {
    id: id,
    title: 'Education Grant for Children',
    description: 'Financial assistance for education of soldiers children up to ₹50,000 per child annually',
    requiredDocuments: [
      'Service certificate copy',
      'Child birth certificate',
      'School/College admission proof',
      'Fee receipt of current academic year',
    ],
  }
  
  const [formData, setFormData] = useState({
    serviceNumber: '',
    rank: '',
    unit: '',
    childName: '',
    institutionName: '',
    course: '',
    academicYear: '',
    amountRequested: '',
    documents: [],
    termsAgreed: false,
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files)
    setFormData(prev => ({
      ...prev,
      documents: [...prev.documents, ...newFiles]
    }))
  }

  const removeDocument = (index) => {
    setFormData(prev => ({
      ...prev,
      documents: prev.documents.filter((_, i) => i !== index)
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitSuccess(true)
    }, 1500)
  }

  if (submitSuccess) {
    return (
      <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
        <Zoom in={true} style={{ transitionDelay: '100ms' }}>
          <AnimatedCard>
            <CardContent sx={{ textAlign: 'center', py: 6 }}>
              <CheckCircle 
                color="success" 
                sx={{ fontSize: 60, mb: 2 }} 
              />
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
                Application Submitted Successfully!
              </Typography>
              <Typography color="text.secondary" paragraph sx={{ mb: 4 }}>
                Your application for <strong>{scheme.title}</strong> has been received. 
                You can track its status in your dashboard.
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                <Button 
                  variant="contained" 
                  onClick={() => navigate('/')}
                  size="large"
                >
                  Go to Dashboard
                </Button>
                <Button 
                  variant="outlined" 
                  onClick={() => navigate('/schemes')}
                  size="large"
                >
                  Browse More Schemes
                </Button>
              </Box>
            </CardContent>
          </AnimatedCard>
        </Zoom>
      </Box>
    )
  }

  return (
    <Box sx={{ maxWidth: 'lg', mx: 'auto', px: { xs: 2, md: 4 }, py: 4 }}>
      <Slide direction="right" in={true}>
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate(-1)}
          sx={{ mb: 3 }}
        >
          Back to Schemes
        </Button>
      </Slide>
      
      <Fade in={true}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h3" component="h1" sx={{ fontWeight: 700, mb: 1 }}>
            Apply for {scheme.title}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            {scheme.description}
          </Typography>
        </Box>
      </Fade>
      
      <Grow in={true}>
        <AnimatedCard>
          <CardContent>
            <form onSubmit={handleSubmit}>
              {/* Service Details */}
              <Box sx={{ mb: 6 }}>
                <Typography variant="h5" component="h3" sx={{ fontWeight: 600, mb: 3 }}>
                  Service Details
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={4}>
                    <TextField
                      fullWidth
                      label="Service Number"
                      id="serviceNumber"
                      name="serviceNumber"
                      value={formData.serviceNumber}
                      onChange={handleChange}
                      required
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      fullWidth
                      label="Rank"
                      id="rank"
                      name="rank"
                      value={formData.rank}
                      onChange={handleChange}
                      required
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      fullWidth
                      label="Unit/Regiment"
                      id="unit"
                      name="unit"
                      value={formData.unit}
                      onChange={handleChange}
                      required
                      variant="outlined"
                    />
                  </Grid>
                </Grid>
              </Box>
              
              <Divider sx={{ my: 4 }} />
              
              {/* Scheme Specific Details */}
              <Box sx={{ mb: 6 }}>
                <Typography variant="h5" component="h3" sx={{ fontWeight: 600, mb: 3 }}>
                  Education Details
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Child Name"
                      id="childName"
                      name="childName"
                      value={formData.childName}
                      onChange={handleChange}
                      required
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Institution Name"
                      id="institutionName"
                      name="institutionName"
                      value={formData.institutionName}
                      onChange={handleChange}
                      required
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Course/Class"
                      id="course"
                      name="course"
                      value={formData.course}
                      onChange={handleChange}
                      required
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Academic Year"
                      id="academicYear"
                      name="academicYear"
                      value={formData.academicYear}
                      onChange={handleChange}
                      required
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Amount Requested (₹)"
                      id="amountRequested"
                      name="amountRequested"
                      type="number"
                      value={formData.amountRequested}
                      onChange={handleChange}
                      required
                      variant="outlined"
                      inputProps={{
                        min: "0",
                        max: "50000",
                        step: "1000"
                      }}
                      InputProps={{
                        startAdornment: (
                          <Typography color="text.secondary" sx={{ mr: 1 }}>₹</Typography>
                        ),
                      }}
                    />
                  </Grid>
                </Grid>
              </Box>
              
              <Divider sx={{ my: 4 }} />
              
              {/* Documents Upload */}
              <Box sx={{ mb: 6 }}>
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  mb: 3 
                }}>
                  <Typography variant="h5" component="h3" sx={{ fontWeight: 600 }}>
                    Required Documents
                  </Typography>
                  <Chip
                    icon={<HelpOutline />}
                    label="AI Assistance Available"
                    color="primary"
                    variant="outlined"
                    clickable
                  />
                </Box>
                
                <List dense sx={{ mb: 3 }}>
                  {scheme.requiredDocuments.map((doc, index) => (
                    <ListItem key={index} sx={{ px: 0 }}>
                      <ListItemIcon sx={{ minWidth: 32 }}>
                        <InfoOutlined color="primary" fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary={doc} />
                    </ListItem>
                  ))}
                </List>
                
                <input
                  type="file"
                  id="documents"
                  name="documents"
                  onChange={handleFileChange}
                  multiple
                  style={{ display: 'none' }}
                />
                <label htmlFor="documents">
                  <FileUploadArea elevation={0}>
                    <CloudUpload sx={{ 
                      fontSize: 48, 
                      mb: 1, 
                      color: theme.palette.text.disabled 
                    }} />
                    <Typography variant="body1" color="text.secondary" gutterBottom>
                      Drag & drop files here or click to browse
                    </Typography>
                    <Button 
                      variant="contained" 
                      component="span"
                      sx={{ mb: 1 }}
                    >
                      Select Files
                    </Button>
                    <Typography variant="caption" color="text.disabled">
                      PDF, JPG, or PNG up to 5MB each
                    </Typography>
                  </FileUploadArea>
                </label>
                
                {formData.documents.length > 0 && (
                  <Box sx={{ mt: 3 }}>
                    <Typography variant="subtitle2" gutterBottom>
                      Selected Files:
                    </Typography>
                    <List dense>
                      {formData.documents.map((file, index) => (
                        <ListItem 
                          key={index} 
                          secondaryAction={
                            <Button
                              startIcon={<DeleteOutline />}
                              onClick={() => removeDocument(index)}
                              color="error"
                              size="small"
                            >
                              Remove
                            </Button>
                          }
                          sx={{
                            bgcolor: 'action.hover',
                            borderRadius: 1,
                            mb: 1
                          }}
                        >
                          <ListItemText 
                            primary={file.name} 
                            secondary={`${(file.size / 1024).toFixed(2)} KB`} 
                          />
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                )}
              </Box>
              
              <Divider sx={{ my: 4 }} />
              
              {/* Terms and Submit */}
              <Box sx={{ pt: 2 }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      id="termsAgreed"
                      name="termsAgreed"
                      checked={formData.termsAgreed}
                      onChange={handleChange}
                      required
                      color="primary"
                    />
                  }
                  label={
                    <Typography variant="body2" color="text.secondary">
                      I declare that all the information provided is correct to the best of my knowledge.
                      I understand that providing false information may lead to disciplinary action.
                    </Typography>
                  }
                  sx={{ mb: 4 }}
                />
                
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <LoadingButton
                    type="submit"
                    variant="contained"
                    size="large"
                    loading={isSubmitting}
                    disabled={!formData.termsAgreed}
                    sx={{ minWidth: 200 }}
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Application'}
                  </LoadingButton>
                </Box>
              </Box>
            </form>
          </CardContent>
        </AnimatedCard>
      </Grow>
    </Box>
  )
}

export default SchemeApply
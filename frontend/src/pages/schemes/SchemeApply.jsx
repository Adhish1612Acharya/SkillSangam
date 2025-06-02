import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  ArrowBack,
  HelpOutline,
  CloudUpload,
  CheckCircle,
  DeleteOutline,
  InfoOutlined,
  Description
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
  styled,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  RadioGroup,
  Radio,
  FormLabel
} from '@mui/material'
import { LoadingButton } from '@mui/lab'
import dayjs from 'dayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'

// Mock API function to fetch scheme form configuration
const fetchSchemeFormConfig = async (schemeId) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500))
  
  // Mock data - in a real app, this would come from your backend
  const schemeForms = {
    'education-grant': {
      id: 'education-grant',
      title: 'Education Grant for Children',
      description: 'Financial assistance for education of soldiers children up to ₹50,000 per child annually',
      formSections: [
        {
          title: 'Service Details',
          fields: [
            {
              name: 'serviceNumber',
              label: 'Service Number',
              type: 'text',
              required: true,
              grid: { xs: 12, md: 4 }
            },
            {
              name: 'rank',
              label: 'Rank',
              type: 'select',
              options: [
                'Sepoy', 'Naik', 'Havaldar', 'Subedar',
                'Lieutenant', 'Captain', 'Major', 'Colonel'
              ],
              required: true,
              grid: { xs: 12, md: 4 }
            },
            {
              name: 'unit',
              label: 'Unit/Regiment',
              type: 'text',
              required: true,
              grid: { xs: 12, md: 4 }
            }
          ]
        },
        {
          title: 'Education Details',
          fields: [
            {
              name: 'childName',
              label: 'Child Name',
              type: 'text',
              required: true,
              grid: { xs: 12, md: 6 }
            },
            {
              name: 'institutionName',
              label: 'Institution Name',
              type: 'text',
              required: true,
              grid: { xs: 12, md: 6 }
            },
            {
              name: 'course',
              label: 'Course/Class',
              type: 'text',
              required: true,
              grid: { xs: 12, md: 6 }
            },
            {
              name: 'academicYear',
              label: 'Academic Year',
              type: 'text',
              required: true,
              grid: { xs: 12, md: 6 }
            },
            {
              name: 'amountRequested',
              label: 'Amount Requested',
              type: 'number',
              required: true,
              inputProps: { min: 0, max: 50000, step: 1000 },
              grid: { xs: 12, md: 6 }
            }
          ]
        }
      ],
      requiredDocuments: [
        'Service certificate copy',
        'Child birth certificate',
        'School/College admission proof',
        'Fee receipt of current academic year',
      ]
    },
    'housing-loan': {
      id: 'housing-loan',
      title: 'Housing Loan Subsidy',
      description: 'Interest subsidy on home loans for serving and retired personnel',
      formSections: [
        {
          title: 'Applicant Details',
          fields: [
            {
              name: 'serviceNumber',
              label: 'Service Number',
              type: 'text',
              required: true,
              grid: { xs: 12, md: 6 }
            },
            {
              name: 'applicantType',
              label: 'Applicant Type',
              type: 'radio',
              options: ['Serving', 'Retired'],
              required: true,
              grid: { xs: 12, md: 6 }
            }
          ]
        },
        {
          title: 'Property Details',
          fields: [
            {
              name: 'propertyAddress',
              label: 'Property Address',
              type: 'text',
              required: true,
              grid: { xs: 12 }
            },
            {
              name: 'propertyType',
              label: 'Property Type',
              type: 'select',
              options: ['Flat', 'House', 'Plot'],
              required: true,
              grid: { xs: 12, md: 6 }
            },
            {
              name: 'loanAmount',
              label: 'Loan Amount (₹)',
              type: 'number',
              required: true,
              grid: { xs: 12, md: 6 }
            },
            {
              name: 'purchaseDate',
              label: 'Purchase Date',
              type: 'date',
              required: true,
              grid: { xs: 12, md: 6 }
            }
          ]
        }
      ],
      requiredDocuments: [
        'Service certificate',
        'Property documents',
        'Loan sanction letter',
        'Bank account details'
      ]
    }
  }
  
  return schemeForms[schemeId] || schemeForms['education-grant']
}

// Styled components
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
  
  const [scheme, setScheme] = useState(null)
  const [formData, setFormData] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [loading, setLoading] = useState(true)

  // Fetch scheme form configuration
  useEffect(() => {
    const loadScheme = async () => {
      try {
        const schemeData = await fetchSchemeFormConfig(id)
        setScheme(schemeData)
        
        // Initialize form data with empty values based on the scheme fields
        const initialFormData = {}
        schemeData.formSections.forEach(section => {
          section.fields.forEach(field => {
            initialFormData[field.name] = field.type === 'date' ? null : ''
          })
        })
        initialFormData.documents = []
        initialFormData.termsAgreed = false
        
        setFormData(initialFormData)
      } catch (error) {
        console.error('Error loading scheme:', error)
        navigate('/schemes', { replace: true })
      } finally {
        setLoading(false)
      }
    }
    
    loadScheme()
  }, [id, navigate])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleDateChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
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
    
    // Simulate API submission
    setTimeout(() => {
      console.log('Form submitted:', formData)
      setIsSubmitting(false)
      setSubmitSuccess(true)
    }, 1500)
  }

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <Typography variant="h6">Loading application form...</Typography>
      </Box>
    )
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

  const renderFormField = (field) => {
    switch (field.type) {
      case 'text':
        return (
          <TextField
            fullWidth
            label={field.label}
            name={field.name}
            value={formData[field.name] || ''}
            onChange={handleChange}
            required={field.required}
            variant="outlined"
            InputProps={field.inputProps}
          />
        )
      case 'number':
        return (
          <TextField
            fullWidth
            label={field.label}
            name={field.name}
            type="number"
            value={formData[field.name] || ''}
            onChange={handleChange}
            required={field.required}
            variant="outlined"
            inputProps={field.inputProps}
          />
        )
      case 'select':
        return (
          <FormControl fullWidth required={field.required}>
            <InputLabel>{field.label}</InputLabel>
            <Select
              label={field.label}
              name={field.name}
              value={formData[field.name] || ''}
              onChange={handleChange}
            >
              {field.options.map((option, index) => (
                <MenuItem key={index} value={option}>{option}</MenuItem>
              ))}
            </Select>
          </FormControl>
        )
      case 'radio':
        return (
          <FormControl component="fieldset" fullWidth>
            <FormLabel component="legend">{field.label}</FormLabel>
            <RadioGroup
              row
              name={field.name}
              value={formData[field.name] || ''}
              onChange={handleChange}
            >
              {field.options.map((option, index) => (
                <FormControlLabel 
                  key={index} 
                  value={option} 
                  control={<Radio />} 
                  label={option} 
                />
              ))}
            </RadioGroup>
          </FormControl>
        )
      case 'date':
        return (
          <DatePicker
            label={field.label}
            value={formData[field.name] ? dayjs(formData[field.name]) : null}
            onChange={(newValue) => handleDateChange(field.name, newValue)}
            slotProps={{ textField: { fullWidth: true, required: field.required } }}
          />
        )
      default:
        return (
          <TextField
            fullWidth
            label={field.label}
            name={field.name}
            value={formData[field.name] || ''}
            onChange={handleChange}
            required={field.required}
            variant="outlined"
          />
        )
    }
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
              {/* Dynamic Form Sections */}
              {scheme.formSections.map((section, sectionIndex) => (
                <Box key={sectionIndex} sx={{ mb: 6 }}>
                  <Typography variant="h5" component="h3" sx={{ fontWeight: 600, mb: 3 }}>
                    {section.title}
                  </Typography>
                  <Grid container spacing={3} columns={12}>
                    {section.fields.map((field, fieldIndex) => (
                      <Box 
                        key={fieldIndex}
                        sx={{ gridColumn: `span ${field.grid?.md || 12}` }}
                        // Optionally, you can use gridRow if needed
                      >
                        {renderFormField(field)}
                      </Box>
                    ))}
                  </Grid>
                  
                  {sectionIndex < scheme.formSections.length - 1 && (
                    <Divider sx={{ my: 4 }} />
                  )}
                </Box>
              ))}
              
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
                        <Description color="primary" fontSize="small" />
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
                
                {formData.documents?.length > 0 && (
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
                      name="termsAgreed"
                      checked={formData.termsAgreed || false}
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
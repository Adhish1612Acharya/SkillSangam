import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  Container, 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Select, 
  MenuItem, 
  FormControl, 
  InputLabel, 
  Alert, 
  Fade,
  Slide,
  Paper,
  Avatar,
  Grid,
  Divider,
  Chip,
  IconButton,
  Tooltip,
  Collapse,
  Card,
  CardContent
} from '@mui/material';
import { 
  MilitaryTech, 
  PersonAdd, 
  Info as InfoIcon,
  CheckCircle,
  Cancel
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { v4 as uuidv4 } from 'uuid';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: theme.shadows[10],
  background: 'linear-gradient(145deg, #ffffff, #f5f5f5)',
}));

const generateFamilyCode = () => {
  const prefix = 'SAINIK';
  const randomPart = uuidv4().split('-')[0].toUpperCase();
  return `${prefix}-${randomPart}`;
};

const RegisterSoldier = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    serviceNumber: '',
    rank: '',
    unit: '',
    joiningDate: '',
  });
  const [familyMembers, setFamilyMembers] = useState([]);
  const [currentFamilyMember, setCurrentFamilyMember] = useState({
    name: '',
    relation: '',
    email: ''
  });
  const [familyCode] = useState(generateFamilyCode());
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [showFamilyForm, setShowFamilyForm] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFamilyMemberChange = (e) => {
    const { name, value } = e.target;
    setCurrentFamilyMember(prev => ({ ...prev, [name]: value }));
  };

  const addFamilyMember = () => {
    if (!currentFamilyMember.name || !currentFamilyMember.relation) {
      setError('Name and relation are required for family member');
      return;
    }
    
    setFamilyMembers(prev => [...prev, { ...currentFamilyMember, id: Date.now() }]);
    setCurrentFamilyMember({ name: '', relation: '', email: '' });
    setShowFamilyForm(false);
    setError('');
  };

  const removeFamilyMember = (id) => {
    setFamilyMembers(prev => prev.filter(member => member.id !== id));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      return setError('Passwords do not match');
    }
    
    setError('');
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data
      const userData = {
        id: '123',
        name: formData.name,
        email: formData.email,
        role: 'soldier',
        familyCode,
        serviceDetails: {
          serviceNumber: formData.serviceNumber,
          rank: formData.rank,
          unit: formData.unit,
          joiningDate: formData.joiningDate,
        },
        familyMembers,
        token: 'mock-token'
      };
      
      register(userData);
      setSuccess('Registration successful! Redirecting...');
      setTimeout(() => navigate('/'), 2000);
    } catch (err) {
      setError('Failed to register. Please try again.');
      setLoading(false);
    }
  };

  return (
    <Container maxWidth={false} disableGutters sx={{ width: '100vw', minHeight: '100vh', px: 0, py: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #f5f5f5 60%, #e3e3e3 100%)' }}>
      <Slide direction="up" in={true} mountOnEnter unmountOnExit>
        <Box>
          <StyledPaper elevation={3}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4 }}>
              <Avatar sx={{ m: 1, bgcolor: 'primary.main', width: 60, height: 60 }}>
                <MilitaryTech sx={{ fontSize: 30 }} />
              </Avatar>
              <Typography component="h1" variant="h4" sx={{ mt: 2, fontWeight: 'bold', color: 'primary.dark' }}>
                Soldier Registration
              </Typography>
              <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
                Join the Sainik Sahayak platform
              </Typography>
            </Box>

            {error && (
              <Fade in={!!error}>
                <Alert severity="error" sx={{ mb: 3 }}>
                  {error}
                </Alert>
              </Fade>
            )}

            {success && (
              <Fade in={!!success}>
                <Alert severity="success" sx={{ mb: 3 }}>
                  {success}
                </Alert>
              </Fade>
            )}

            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <Typography variant="h6" gutterBottom sx={{ color: 'primary.main', mt: 2 }}>
                Personal Information
              </Typography>
              
              <Grid container spacing={2}>
                <Grid sx={{ gridColumn: { xs: 'span 12', sm: 'span 6' } }}>
                  <TextField
                    required
                    fullWidth
                    id="name"
                    label="Full Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    variant="outlined"
                  />
                </Grid>
                <Grid sx={{ gridColumn: { xs: 'span 12', sm: 'span 6' } }}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    variant="outlined"
                  />
                </Grid>
                <Grid sx={{ gridColumn: { xs: 'span 12', sm: 'span 6' } }}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    value={formData.password}
                    onChange={handleChange}
                    variant="outlined"
                  />
                </Grid>
                <Grid sx={{ gridColumn: { xs: 'span 12', sm: 'span 6' } }}>
                  <TextField
                    required
                    fullWidth
                    name="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    id="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    variant="outlined"
                  />
                </Grid>
              </Grid>

              <Typography variant="h6" gutterBottom sx={{ color: 'primary.main', mt: 4 }}>
                Service Details
              </Typography>
              
              <Grid container spacing={2}>
                <Grid sx={{ gridColumn: { xs: 'span 12', sm: 'span 6' } }}>
                  <TextField
                    required
                    fullWidth
                    id="serviceNumber"
                    label="Service Number"
                    name="serviceNumber"
                    value={formData.serviceNumber}
                    onChange={handleChange}
                    variant="outlined"
                  />
                </Grid>
                <Grid sx={{ gridColumn: { xs: 'span 12', sm: 'span 6' } }}>
                  <FormControl fullWidth>
                    <InputLabel id="rank-label">Rank</InputLabel>
                    <Select
                      labelId="rank-label"
                      id="rank"
                      name="rank"
                      value={formData.rank}
                      label="Rank"
                      onChange={handleChange}
                      required
                    >
                      <MenuItem value="sepoy">Sepoy</MenuItem>
                      <MenuItem value="naik">Naik</MenuItem>
                      <MenuItem value="havaldar">Havaldar</MenuItem>
                      <MenuItem value="subedar">Subedar</MenuItem>
                      <MenuItem value="lieutenant">Lieutenant</MenuItem>
                      <MenuItem value="captain">Captain</MenuItem>
                      <MenuItem value="major">Major</MenuItem>
                      <MenuItem value="colonel">Colonel</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid sx={{ gridColumn: { xs: 'span 12', sm: 'span 6' } }}>
                  <TextField
                    required
                    fullWidth
                    id="unit"
                    label="Unit/Regiment"
                    name="unit"
                    value={formData.unit}
                    onChange={handleChange}
                    variant="outlined"
                  />
                </Grid>
                <Grid sx={{ gridColumn: { xs: 'span 12', sm: 'span 6' } }}>
                  <TextField
                    required
                    fullWidth
                    id="joiningDate"
                    label="Joining Date"
                    name="joiningDate"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    value={formData.joiningDate}
                    onChange={handleChange}
                    variant="outlined"
                  />
                </Grid>
              </Grid>

              <Typography variant="h6" gutterBottom sx={{ color: 'primary.main', mt: 4 }}>
                Family Information
              </Typography>
              
              <Card variant="outlined" sx={{ mb: 3, backgroundColor: '#f5f5f5' }}>
                <CardContent>
                  <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'bold' }}>
                    Your Family Code
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    Share this code with your family members to allow them to register under your account:
                  </Typography>
                  <Chip 
                    label={familyCode} 
                    color="primary" 
                    variant="outlined"
                    sx={{ 
                      fontSize: '1.1rem',
                      padding: '8px',
                      fontWeight: 'bold'
                    }}
                  />
                  <Typography variant="body2" sx={{ mt: 2, color: 'text.secondary' }}>
                    <InfoIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 0.5 }} />
                    Family members can use this code during their registration
                  </Typography>
                </CardContent>
              </Card>

              {familyMembers.length > 0 && (
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle1" sx={{ mb: 1 }}>
                    Added Family Members ({familyMembers.length})
                  </Typography>
                  <Grid container spacing={2}>
                    {familyMembers.map(member => (
                      <Grid sx={{ gridColumn: { xs: 'span 12', sm: 'span 6' } }} key={member.id}>
                        <Paper variant="outlined" sx={{ p: 2, position: 'relative' }}>
                          <Box sx={{ 
                            position: 'absolute', 
                            top: 8, 
                            right: 8,
                            display: 'flex',
                            gap: 1
                          }}>
                            <Tooltip title="Remove">
                              <IconButton 
                                size="small" 
                                onClick={() => removeFamilyMember(member.id)}
                                color="error"
                              >
                                <Cancel fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          </Box>
                          <Typography variant="subtitle2">{member.name}</Typography>
                          <Typography variant="body2" color="text.secondary">
                            {member.relation}
                          </Typography>
                          {member.email && (
                            <Typography variant="body2" color="text.secondary">
                              {member.email}
                            </Typography>
                          )}
                        </Paper>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              )}

              {!showFamilyForm ? (
                <Button
                  startIcon={<PersonAdd />}
                  variant="outlined"
                  onClick={() => setShowFamilyForm(true)}
                  sx={{ mb: 3 }}
                >
                  Add Family Member
                </Button>
              ) : (
                <Collapse in={showFamilyForm}>
                  <Paper variant="outlined" sx={{ p: 3, mb: 3 }}>
                    <Typography variant="subtitle1" sx={{ mb: 2 }}>
                      Add Family Member
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid sx={{ gridColumn: { xs: 'span 12', sm: 'span 6' } }}>
                        <TextField
                          fullWidth
                          label="Name"
                          name="name"
                          value={currentFamilyMember.name}
                          onChange={handleFamilyMemberChange}
                          variant="outlined"
                          required
                        />
                      </Grid>
                      <Grid sx={{ gridColumn: { xs: 'span 12', sm: 'span 6' } }}>
                        <FormControl fullWidth>
                          <InputLabel>Relation</InputLabel>
                          <Select
                            name="relation"
                            value={currentFamilyMember.relation}
                            onChange={handleFamilyMemberChange}
                            label="Relation"
                            required
                          >
                            <MenuItem value="spouse">Spouse</MenuItem>
                            <MenuItem value="parent">Parent</MenuItem>
                            <MenuItem value="child">Child</MenuItem>
                            <MenuItem value="sibling">Sibling</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid sx={{ gridColumn: { xs: 'span 12' } }}>
                        <TextField
                          fullWidth
                          label="Email (Optional)"
                          name="email"
                          type="email"
                          value={currentFamilyMember.email}
                          onChange={handleFamilyMemberChange}
                          variant="outlined"
                        />
                      </Grid>
                    </Grid>
                    <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
                      <Button
                        variant="contained"
                        onClick={addFamilyMember}
                        startIcon={<CheckCircle />}
                      >
                        Add Member
                      </Button>
                      <Button
                        variant="outlined"
                        onClick={() => setShowFamilyForm(false)}
                      >
                        Cancel
                      </Button>
                    </Box>
                  </Paper>
                </Collapse>
              )}

              <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={loading}
                  size="large"
                  sx={{ 
                    mt: 3, 
                    mb: 2, 
                    py: 1.5,
                    borderRadius: 2,
                    background: 'linear-gradient(45deg, #1976d2 30%, #2196f3 90%)',
                    boxShadow: '0 3px 5px 2px rgba(33, 150, 243, .3)',
                  }}
                >
                  {loading ? 'Registering...' : 'Complete Registration'}
                </Button>
              </motion.div>
              
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link 
                    to="/login" 
                    variant="body2"
                    component={Link}
                    sx={{ color: 'primary.main', fontWeight: 'medium' }}
                  >
                    Already have an account? Login
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </StyledPaper>
          
          <Box sx={{ mt: 4, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              Honoring our brave soldiers and their families
            </Typography>
          </Box>
        </Box>
      </Slide>
    </Container>
  );
};

export default RegisterSoldier;
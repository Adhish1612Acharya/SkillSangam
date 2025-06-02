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
  Tooltip
} from '@mui/material';
import { 
  FamilyRestroom,
  Info as InfoIcon,
  MilitaryTech
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: theme.shadows[10],
  background: 'linear-gradient(145deg, #ffffff, #f5f5f5)',
}));

const RegisterFamily = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    relation: '',
    soldierId: '',
    familyCode: '',
    address: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [soldierInfo, setSoldierInfo] = useState(null);
  const [verifyingCode, setVerifyingCode] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const verifyFamilyCode = async () => {
    if (!formData.familyCode) {
      setError('Please enter a family code');
      return;
    }
    
    setVerifyingCode(true);
    setError('');
    
    try {
      // Simulate API call to verify code
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock response - in real app, this would come from API
      if (formData.familyCode.startsWith('SAINIK-')) {
        setSoldierInfo({
          name: 'Captain Rajesh Kumar',
          serviceNumber: 'IC-789654',
          unit: '14th Battalion, The Sikh Regiment'
        });
      } else {
        setError('Invalid family code. Please check and try again.');
      }
    } catch (err) {
      setError('Failed to verify code. Please try again.');
    } finally {
      setVerifyingCode(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!soldierInfo) {
      return setError('Please verify your family code first');
    }
    
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
        role: 'family',
        familyDetails: {
          relation: formData.relation,
          soldierId: formData.soldierId,
          familyCode: formData.familyCode,
          address: formData.address,
          soldierInfo
        },
        token: 'mock-token'
      };
      
      register(userData);
      navigate('/');
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
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main', width: 60, height: 60 }}>
                <FamilyRestroom sx={{ fontSize: 30 }} />
              </Avatar>
              <Typography component="h1" variant="h4" sx={{ mt: 2, fontWeight: 'bold', color: 'secondary.dark' }}>
                Family Member Registration
              </Typography>
              <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
                Join as a family member of our brave soldier
              </Typography>
            </Box>

            {error && (
              <Fade in={!!error}>
                <Alert severity="error" sx={{ mb: 3 }}>
                  {error}
                </Alert>
              </Fade>
            )}

            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <Typography variant="h6" gutterBottom sx={{ color: 'secondary.main', mt: 2 }}>
                Family Verification
              </Typography>
              
              <Grid container spacing={2} alignItems="flex-end">
                <Grid sx={{ gridColumn: { xs: 'span 12', sm: 'span 8' } }}>
                  <TextField
                    fullWidth
                    id="familyCode"
                    label="Family Code"
                    name="familyCode"
                    value={formData.familyCode}
                    onChange={handleChange}
                    variant="outlined"
                    placeholder="Enter the family code provided by your soldier"
                    disabled={!!soldierInfo}
                  />
                </Grid>
                <Grid sx={{ gridColumn: { xs: 'span 12', sm: 'span 4' } }}>
                  <Button
                    fullWidth
                    variant={soldierInfo ? "outlined" : "contained"}
                    color={soldierInfo ? "success" : "primary"}
                    onClick={verifyFamilyCode}
                    disabled={verifyingCode || !!soldierInfo}
                    sx={{ height: '56px' }}
                  >
                    {verifyingCode ? 'Verifying...' : 
                     soldierInfo ? 'Verified' : 'Verify Code'}
                  </Button>
                </Grid>
              </Grid>

              {soldierInfo && (
                <Fade in={!!soldierInfo}>
                  <Paper variant="outlined" sx={{ p: 2, mt: 2, backgroundColor: '#f5f5f5' }}>
                    <Typography variant="subtitle1" sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
                      <MilitaryTech color="primary" sx={{ mr: 1 }} />
                      Soldier Information
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid sx={{ gridColumn: { xs: 'span 12', sm: 'span 6' } }}>
                        <Typography variant="body2" color="text.secondary">
                          Soldier Name
                        </Typography>
                        <Typography variant="body1">
                          {soldierInfo.name}
                        </Typography>
                      </Grid>
                      <Grid sx={{ gridColumn: { xs: 'span 12', sm: 'span 6' } }}>
                        <Typography variant="body2" color="text.secondary">
                          Service Number
                        </Typography>
                        <Typography variant="body1">
                          {soldierInfo.serviceNumber}
                        </Typography>
                      </Grid>
                      <Grid sx={{ gridColumn: 'span 12' }}>
                        <Typography variant="body2" color="text.secondary">
                          Unit/Regiment
                        </Typography>
                        <Typography variant="body1">
                          {soldierInfo.unit}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Paper>
                </Fade>
              )}

              <Divider sx={{ my: 4 }} />

              <Typography variant="h6" gutterBottom sx={{ color: 'secondary.main' }}>
                Your Information
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
                  <FormControl fullWidth>
                    <InputLabel id="relation-label">Relation to Soldier</InputLabel>
                    <Select
                      labelId="relation-label"
                      id="relation"
                      name="relation"
                      value={formData.relation}
                      onChange={handleChange}
                      label="Relation to Soldier"
                      required
                    >
                      <MenuItem value="spouse">Spouse</MenuItem>
                      <MenuItem value="parent">Parent</MenuItem>
                      <MenuItem value="child">Child</MenuItem>
                      <MenuItem value="sibling">Sibling</MenuItem>
                    </Select>
                  </FormControl>
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
                    id="soldierId"
                    label="Your ID Proof Number"
                    name="soldierId"
                    value={formData.soldierId}
                    onChange={handleChange}
                    variant="outlined"
                    placeholder="Aadhar, Passport, etc."
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

              <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={loading || !soldierInfo}
                  size="large"
                  sx={{ 
                    mt: 3, 
                    mb: 2, 
                    py: 1.5,
                    borderRadius: 2,
                    background: 'linear-gradient(45deg, #9c27b0 30%, #e91e63 90%)',
                    boxShadow: '0 3px 5px 2px rgba(156, 39, 176, .3)',
                  }}
                >
                  {loading ? 'Registering...' : 'Complete Registration'}
                </Button>
              </motion.div>
              
              <Grid container justifyContent="flex-end">
                <Grid>
                  <Link 
                    to="/login" 
                    variant="body2"
                    component={Link}
                    sx={{ color: 'secondary.main', fontWeight: 'medium' }}
                  >
                    Already have an account? Login
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </StyledPaper>
          
          <Box sx={{ mt: 4, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              Supporting the families who support our heroes
            </Typography>
          </Box>
        </Box>
      </Slide>
    </Container>
  );
};

export default RegisterFamily;
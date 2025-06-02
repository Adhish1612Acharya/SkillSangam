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
  InputAdornment,
  Checkbox,
  FormControlLabel
} from '@mui/material';
import { 
  AccountBalance,
  VerifiedUser,
  Badge,
  Email,
  Lock,
  Visibility,
  VisibilityOff,
  Info as InfoIcon
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: theme.shadows[10],
  background: 'linear-gradient(145deg, #ffffff, #f5f5f5)',
}));

const RegisterGovt = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    department: '',
    designation: '',
    officialId: '',
    isVerified: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      return setError('Passwords do not match');
    }
    
    if (!formData.isVerified) {
      return setError('Please verify that you are an authorized government official');
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
        role: 'govt',
        govtDetails: {
          department: formData.department,
          designation: formData.designation,
          officialId: formData.officialId,
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
              <Avatar sx={{ m: 1, bgcolor: 'success.main', width: 60, height: 60 }}>
                <AccountBalance sx={{ fontSize: 30 }} />
              </Avatar>
              <Typography component="h1" variant="h4" sx={{ mt: 2, fontWeight: 'bold', color: 'success.dark' }}>
                Government Official Registration
              </Typography>
              <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
                Register to access defense personnel support portal
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
              <Typography variant="h6" gutterBottom sx={{ color: 'success.main', mt: 2 }}>
                Official Information
              </Typography>
              
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="name"
                    label="Full Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Badge color="action" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Official Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Email color="action" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    value={formData.password}
                    onChange={handleChange}
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock color="action" />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleTogglePassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    name="confirmPassword"
                    label="Confirm Password"
                    type={showPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock color="action" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>

              <Divider sx={{ my: 4 }} />

              <Typography variant="h6" gutterBottom sx={{ color: 'success.main' }}>
                Official Details
              </Typography>
              
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel id="department-label">Department</InputLabel>
                    <Select
                      labelId="department-label"
                      id="department"
                      name="department"
                      value={formData.department}
                      onChange={handleChange}
                      label="Department"
                      required
                    >
                      <MenuItem value="defense">Ministry of Defense</MenuItem>
                      <MenuItem value="ex-servicemen">Department of Ex-Servicemen Welfare</MenuItem>
                      <MenuItem value="pension">Pension Department</MenuItem>
                      <MenuItem value="health">Armed Forces Medical Services</MenuItem>
                      <MenuItem value="veteran">Department of Veterans Affairs</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="designation"
                    label="Designation"
                    name="designation"
                    value={formData.designation}
                    onChange={handleChange}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="officialId"
                    label="Official ID Number"
                    name="officialId"
                    value={formData.officialId}
                    onChange={handleChange}
                    variant="outlined"
                    placeholder="Your government issued ID"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <VerifiedUser color="action" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData.isVerified}
                        onChange={(e) => setFormData({...formData, isVerified: e.target.checked})}
                        color="success"
                      />
                    }
                    label={
                      <Typography variant="body2">
                        I verify that I am an authorized government official with access to defense personnel records
                      </Typography>
                    }
                  />
                </Grid>
              </Grid>

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
                    background: 'linear-gradient(45deg, #2e7d32 30%, #4caf50 90%)',
                    boxShadow: '0 3px 5px 2px rgba(46, 125, 50, .3)',
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
                    sx={{ color: 'success.main', fontWeight: 'medium' }}
                  >
                    Already have an account? Login
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </StyledPaper>
          
          <Box sx={{ mt: 4, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              Secure portal for authorized government personnel only
            </Typography>
          </Box>
        </Box>
      </Slide>
    </Container>
  );
};

export default RegisterGovt;
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  Container, 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Alert, 
  Fade,
  Slide,
  Paper,
  Avatar,
  Grid,
  Divider,
  Chip,
  IconButton,
  InputAdornment,
  Tooltip
} from '@mui/material';
import { 
  AdminPanelSettings,
  Lock,
  Visibility,
  VisibilityOff,
  Security,
  VerifiedUser,
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

const RegisterAdmin = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    adminKey: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showAdminKey, setShowAdminKey] = useState(false);
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

  const handleToggleAdminKey = () => {
    setShowAdminKey(!showAdminKey);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      return setError('Passwords do not match');
    }
    
    if (formData.adminKey !== 'SAINIK123') {
      return setError('Invalid admin key');
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
        role: 'admin',
        token: 'mock-token'
      };
      
      register(userData);
      navigate('/admin/dashboard');
    } catch (err) {
      setError('Failed to register. Please try again.');
      setLoading(false);
    }
  };

  return (
    <Container maxWidth={false} disableGutters sx={{ width: '100vw', minHeight: '100vh', px: 0, py: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #f5f5f5 60%, #e3e3e3 100%)' }}>
      <Slide direction="down" in={true} mountOnEnter unmountOnExit>
        <Box>
          <StyledPaper elevation={3}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4 }}>
              <Avatar sx={{ m: 1, bgcolor: 'error.main', width: 60, height: 60 }}>
                <AdminPanelSettings sx={{ fontSize: 30 }} />
              </Avatar>
              <Typography component="h1" variant="h4" sx={{ mt: 2, fontWeight: 'bold', color: 'error.dark' }}>
                Admin Registration
              </Typography>
              <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
                Restricted to authorized personnel only
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
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                variant="outlined"
                sx={{ mb: 2 }}
              />
              
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                variant="outlined"
                sx={{ mb: 2 }}
              />
              
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={formData.password}
                onChange={handleChange}
                variant="outlined"
                sx={{ mb: 2 }}
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
              
              <TextField
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type={showPassword ? 'text' : 'password'}
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                variant="outlined"
                sx={{ mb: 2 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock color="action" />
                    </InputAdornment>
                  ),
                }}
              />

              <Divider sx={{ my: 3 }} />

              <Typography variant="subtitle1" gutterBottom sx={{ color: 'error.main' }}>
                Admin Authorization
              </Typography>
              
              <TextField
                margin="normal"
                required
                fullWidth
                name="adminKey"
                label="Admin Key"
                type={showAdminKey ? 'text' : 'password'}
                id="adminKey"
                value={formData.adminKey}
                onChange={handleChange}
                variant="outlined"
                sx={{ mb: 2 }}
                placeholder="Enter admin authorization key"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Security color="action" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <Tooltip title={showAdminKey ? 'Hide key' : 'Show key'}>
                        <IconButton
                          aria-label="toggle admin key visibility"
                          onClick={handleToggleAdminKey}
                          edge="end"
                        >
                          {showAdminKey ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </Tooltip>
                    </InputAdornment>
                  ),
                }}
              />
              
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, p: 1.5, bgcolor: '#fff8e1', borderRadius: 1 }}>
                <InfoIcon color="warning" sx={{ mr: 1 }} />
                <Typography variant="body2" color="text.secondary">
                  Admin keys are provided by the system administrator only
                </Typography>
              </Box>

              <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={loading}
                  size="large"
                  sx={{ 
                    mt: 2, 
                    mb: 2, 
                    py: 1.5,
                    borderRadius: 2,
                    background: 'linear-gradient(45deg, #d32f2f 30%, #f44336 90%)',
                    boxShadow: '0 3px 5px 2px rgba(211, 47, 47, .3)',
                  }}
                >
                  {loading ? 'Registering...' : 'Register Admin Account'}
                </Button>
              </motion.div>
              
              <Grid container justifyContent="flex-end">
                <Grid>
                  <Link 
                    to="/login" 
                    variant="body2"
                    component={Link}
                    sx={{ color: 'error.main', fontWeight: 'medium' }}
                  >
                    Already have an account? Login
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </StyledPaper>
          
          <Box sx={{ mt: 4, textAlign: 'center' }}>
            <Chip 
              icon={<VerifiedUser />} 
              label="High Security Area" 
              color="error" 
              variant="outlined"
            />
          </Box>
        </Box>
      </Slide>
    </Container>
  );
};

export default RegisterAdmin;
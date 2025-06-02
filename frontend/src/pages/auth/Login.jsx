import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  Link
} from '@mui/material';
import { LockOutlined, MilitaryTech, FamilyRestroom, AdminPanelSettings, AccountBalance } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: theme.shadows[10],
  background: 'linear-gradient(145deg, #ffffff, #f5f5f5)',
}));

const RoleIcon = ({ role }) => {
  const icons = {
    soldier: <MilitaryTech color="primary" fontSize="large" />,
    family: <FamilyRestroom color="secondary" fontSize="large" />,
    admin: <AdminPanelSettings color="error" fontSize="large" />,
    govt: <AccountBalance color="success" fontSize="large" />
  };
  return icons[role] || <MilitaryTech color="primary" fontSize="large" />;
};

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('soldier');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data
      const userData = {
        id: '123',
        name: 'Test User',
        email,
        role,
        token: 'mock-token'
      };
      
      login(userData);
      navigate('/');
    } catch (err) {
      setError('Failed to login. Please check your credentials.');
      setLoading(false);
    }
  };

  return (
    <Container maxWidth={false} disableGutters sx={{ width: '100vw', minHeight: '100vh', px: 0, py: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #f5f5f5 60%, #e3e3e3 100%)' }}>
      <Slide direction="down" in={true} mountOnEnter unmountOnExit>
        <Box>
          <StyledPaper elevation={3}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4 }}>
              <Avatar sx={{ m: 1, bgcolor: 'primary.main', width: 60, height: 60 }}>
                <LockOutlined sx={{ fontSize: 30 }} />
              </Avatar>
              <Typography component="h1" variant="h4" sx={{ mt: 2, fontWeight: 'bold', color: 'primary.dark' }}>
                Sainik Sahayak
              </Typography>
              <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
                Login to your account
              </Typography>
            </Box>

            <Fade in={!!error}>
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            </Fade>

            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                variant="outlined"
                sx={{ mb: 2 }}
              />
              
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                variant="outlined"
                sx={{ mb: 2 }}
              />
              
              <FormControl fullWidth margin="normal" sx={{ mb: 3 }}>
                <InputLabel id="role-label">Role</InputLabel>
                <Select
                  labelId="role-label"
                  id="role"
                  value={role}
                  label="Role"
                  onChange={(e) => setRole(e.target.value)}
                >
                  <MenuItem value="soldier">
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <MilitaryTech color="primary" /> Soldier
                    </Box>
                  </MenuItem>
                  <MenuItem value="family">
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <FamilyRestroom color="secondary" /> Family Member
                    </Box>
                  </MenuItem>
                  <MenuItem value="govt">
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <AccountBalance color="success" /> Government Official
                    </Box>
                  </MenuItem>
                  <MenuItem value="admin">
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <AdminPanelSettings color="error" /> Admin
                    </Box>
                  </MenuItem>
                </Select>
              </FormControl>

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
                    background: 'linear-gradient(45deg, #1976d2 30%, #2196f3 90%)',
                    boxShadow: '0 3px 5px 2px rgba(33, 150, 243, .3)',
                  }}
                >
                  {loading ? 'Logging in...' : 'Login'}
                </Button>
              </motion.div>
              
              <Grid container sx={{ mt: 3 }}>
                <Grid item xs>
                  <Link href="/forgot-password" variant="body2" sx={{ color: 'text.secondary' }}>
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <br></br>
                  <br></br>
                  <br></br>
                  <Link 
                    href={role === 'soldier' ? '/register/soldier' : 
                          role === 'family' ? '/register/family' : 
                          role === 'govt' ? '/register/govt' : '/register/admin'} 
                    variant="body2"
                    sx={{ color: 'primary.main', fontWeight: 'medium' }}
                  >
                    Don't have an account? Register
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </StyledPaper>
          
          <Box sx={{ mt: 4, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              Serving those who serve the nation
            </Typography>
          </Box>
        </Box>
      </Slide>
    </Container>
  );
};

export default Login;
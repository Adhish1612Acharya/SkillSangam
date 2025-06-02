import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/logo.svg';
import { 
  Home,
  User,
  FileText,
  AlertCircle,
  ShoppingCart,
  MessageSquare,
  Heart,
  Calendar,
  Settings,
  LogOut,
  ChevronDown,
  Briefcase,
  Shield,
  Users as UsersIcon,
  BarChart2,
  HelpCircle,
  Bell
} from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Menu,
  MenuItem,
  Divider,
  ListItemIcon,
  ListItemText,
  Badge,
  Box,
  Container,
  Avatar,
  useTheme,
  useMediaQuery
} from '@mui/material';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const handleLogout = () => {
    logout();
    navigate('/login');
    handleClose();
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setMobileMoreAnchorEl(null);
  };

  // Common links for all roles
  const commonLinks = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Schemes', path: '/schemes', icon: FileText },
    { name: 'Marketplace', path: '/marketplace', icon: ShoppingCart },
    { name: 'Community', path: '/community/forum', icon: MessageSquare },
    { name: 'Emergency', path: '/emergency', icon: AlertCircle },
  ];

  // Role-specific links
  const getRoleLinks = () => {
    if (!user) return [];
    
    switch(user.role) {
      case 'soldier':
        return [
          { name: 'My Profile', path: '/profile', icon: User },
          { name: 'Success Stories', path: '/community/stories', icon: Heart },
          { name: 'Events', path: '/community/events', icon: Calendar },
          { name: 'AI Tools', path: '/ai/chatbot', icon: Settings },
        ];
      case 'family':
        return [
          { name: 'Family Profile', path: '/profile', icon: User },
          { name: 'Benefits', path: '/family/benefits', icon: Heart },
          { name: 'Support', path: '/family/support', icon: HelpCircle },
        ];
      case 'govt':
        return [
          { name: 'Applications', path: '/applications', icon: Briefcase },
          { name: 'Grievances', path: '/grievances', icon: AlertCircle },
          { name: 'Scheme Mgmt', path: '/schemes/manage', icon: Settings },
        ];
      case 'admin':
        return [
          { name: 'User Management', path: '/admin/users', icon: UsersIcon },
          { name: 'Analytics', path: '/admin/analytics', icon: BarChart2 },
          { name: 'Content Mod', path: '/admin/moderation', icon: Shield },
        ];
      default:
        return [];
    }
  };

  const allLinks = [...commonLinks, ...getRoleLinks()];
  const primaryLinks = allLinks.slice(0, 5);
  const secondaryLinks = allLinks.slice(5);

  const renderDesktopMenu = (
    <>
      <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', ml: 4 }}>
        {primaryLinks.map((link) => (
          <Button
            key={link.path}
            component={Link}
            to={link.path}
            color="inherit"
            startIcon={<link.icon size={18} />}
            sx={{ mx: 0.5 }}
          >
            {link.name}
          </Button>
        ))}
      </Box>
      <Box sx={{ flexGrow: 1 }} />
      {user ? (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="error">
              <Bell size={20} />
            </Badge>
          </IconButton>
          <Button
            color="inherit"
            onClick={handleMenuOpen}
            startIcon={
              <Avatar sx={{ width: 30, height: 30, bgcolor: 'primary.light' }}>
                <User size={16} />
              </Avatar>
            }
            endIcon={<ChevronDown size={16} />}
            sx={{ ml: 1 }}
          >
            {!isMobile && user.name}
          </Button>
        </Box>
      ) : (
        <Box>
          <Button 
            component={Link}
            to="/login"
            color="inherit"
            variant="outlined"
            sx={{ mr: 1 }}
          >
            Login
          </Button>
          <Button 
            component={Link}
            to="/register/soldier"
            color="primary"
            variant="contained"
            sx={{ color: 'white' }}
          >
            Register
          </Button>
        </Box>
      )}
    </>
  );

  const renderMobileMenu = (
    <>
      <IconButton
        size="large"
        color="inherit"
        onClick={handleMobileMenuOpen}
        sx={{ display: { xs: 'flex', md: 'none' } }}
      >
        <Bell size={20} />
      </IconButton>
      <IconButton
        size="large"
        color="inherit"
        onClick={handleMenuOpen}
        sx={{ display: { xs: 'flex', md: 'none' } }}
      >
        <User size={20} />
      </IconButton>
    </>
  );

  return (
    <AppBar position="static" elevation={1} sx={{ bgcolor: 'background.paper', color: 'text.primary' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box component={Link} to="/" sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit' }}>
            <Box
    component="img"
    src={logo}
    alt="Logo"
    sx={{ width: 70, height: 70 }}
  />
            <Typography
              variant="h6"
              noWrap
              sx={{
                ml: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.2rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              SAINIK SAHAYAK
            </Typography>
          </Box>

          {renderDesktopMenu}
          {isMobile && renderMobileMenu}

          {/* Desktop User Menu */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                mt: 1.5,
                minWidth: 220,
                '& .MuiAvatar-root': {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                '&:before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: 'background.paper',
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            {user && (
              <>
                <MenuItem onClick={handleClose} sx={{ pt: 2, pb: 1 }}>
                  <ListItemIcon>
                    <Avatar sx={{ bgcolor: 'primary.main' }}>
                      <User size={16} />
                    </Avatar>
                  </ListItemIcon>
                  <ListItemText 
                    primary={user.name} 
                    secondary={user.role.charAt(0).toUpperCase() + user.role.slice(1)} 
                  />
                </MenuItem>
                <Divider />
              </>
            )}

            {secondaryLinks.map((link) => (
              <MenuItem 
                key={link.path}
                component={Link}
                to={link.path}
                onClick={handleClose}
              >
                <ListItemIcon>
                  <link.icon size={18} />
                </ListItemIcon>
                <ListItemText primary={link.name} />
              </MenuItem>
            ))}

            {user && (
              <>
                <Divider />
                <MenuItem onClick={handleLogout}>
                  <ListItemIcon>
                    <LogOut size={18} />
                  </ListItemIcon>
                  <ListItemText primary="Logout" />
                </MenuItem>
              </>
            )}

            {!user && (
              <>
                <MenuItem component={Link} to="/login" onClick={handleClose}>
                  <ListItemText primary="Login" />
                </MenuItem>
                <MenuItem component={Link} to="/register/soldier" onClick={handleClose}>
                  <ListItemText primary="Register" />
                </MenuItem>
              </>
            )}
          </Menu>

          {/* Mobile Menu */}
          <Menu
            anchorEl={mobileMoreAnchorEl}
            open={Boolean(mobileMoreAnchorEl)}
            onClose={handleClose}
            PaperProps={{
              sx: {
                width: '100%',
                maxWidth: 360,
              },
            }}
          >
            {primaryLinks.map((link) => (
              <MenuItem 
                key={link.path}
                component={Link}
                to={link.path}
                onClick={handleClose}
              >
                <ListItemIcon>
                  <link.icon size={18} />
                </ListItemIcon>
                <ListItemText primary={link.name} />
              </MenuItem>
            ))}
          </Menu>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
import { 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText, 
  Divider, 
  Box, 
  Typography,
  Avatar,
  useTheme
} from '@mui/material';
import logo from '../assets/logo.svg';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Person, 
  Description, 
  Warning, 
  ShoppingCart, 
  Forum, 
  Favorite, 
  Event, 
  Settings 
} from '@mui/icons-material';

const Sidebar = ({ role }) => {
  const location = useLocation();
  const theme = useTheme();

  const commonLinks = [
    { name: 'Dashboard', path: '/', icon: Home },
    { name: 'Schemes', path: '/schemes', icon: Description },
    { name: 'Marketplace', path: '/marketplace', icon: ShoppingCart },
    { name: 'Community', path: '/community/forum', icon: Forum },
    { name: 'Emergency', path: '/emergency', icon: Warning },
  ];

  const soldierLinks = [
    { name: 'My Profile', path: '/profile', icon: Person },
    { name: 'Success Stories', path: '/community/stories', icon: Favorite },
    { name: 'Events', path: '/community/events', icon: Event },
    { name: 'AI Tools', path: '/ai/chatbot', icon: Settings },
  ];

  const familyLinks = [
    { name: 'Family Profile', path: '/profile', icon: Person },
    { name: 'Success Stories', path: '/community/stories', icon: Favorite },
    { name: 'Events', path: '/community/events', icon: Event },
  ];

  const govtLinks = [
    { name: 'Applications', path: '/applications', icon: Description },
    { name: 'Grievances', path: '/grievances', icon: Warning },
    { name: 'Scheme Management', path: '/schemes/manage', icon: Settings },
  ];

  const adminLinks = [
    { name: 'User Management', path: '/admin/users', icon: Person },
    { name: 'Content Moderation', path: '/admin/moderation', icon: Settings },
  ];

  const getRoleSpecificLinks = () => {
    switch (role) {
      case 'soldier': return soldierLinks;
      case 'family': return familyLinks;
      case 'govt': return govtLinks;
      case 'admin': return adminLinks;
      default: return [];
    }
  };

  const allLinks = [...commonLinks, ...getRoleSpecificLinks()];

  return (
    <Box
      sx={{
        width: 280,
        height: '100vh',
        backgroundColor: 'background.paper',
        boxShadow: theme.shadows[3],
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Box sx={{ p: 3, textAlign: 'center' }}>
  <Box
    component="img"
    src={logo}
    alt="Logo"
    sx={{ width: 110, height: 110, mx: 'auto' }} // 👈 centers the image horizontally
  />
  <Typography variant="h6" fontWeight="bold" color="primary">
    Sainik Sahayak
  </Typography>
  <Typography variant="caption" color="text.secondary">
    {role ? `${role} Portal` : 'Portal'}
  </Typography>
</Box>

      
      <Divider />
      
      <List sx={{ flexGrow: 1, p: 0 }}>
        {allLinks.map((link) => (
          <ListItem key={link.path} disablePadding>
            <ListItemButton
              component={Link}
              to={link.path}
              selected={location.pathname === link.path}
              sx={{
                px: 3,
                py: 1.5,
                '&.Mui-selected': {
                  backgroundColor: theme.palette.primary.light,
                  color: theme.palette.primary.main,
                  '& .MuiListItemIcon-root': {
                    color: theme.palette.primary.main,
                  },
                },
                '&.Mui-selected:hover': {
                  backgroundColor: theme.palette.primary.light,
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>
                <link.icon />
              </ListItemIcon>
              <ListItemText primary={link.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;
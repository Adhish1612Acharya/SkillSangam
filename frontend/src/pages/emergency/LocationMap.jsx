import React from 'react';
import { 
  LocationOn, 
  Navigation, 
  Share, 
  LocalHospital,
  MilitaryTech,
  LocalPolice,
  FireTruck
} from '@mui/icons-material';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  CardHeader, 
  Avatar, 
  Grid, 
  List, 
  ListItem, 
  ListItemAvatar, 
  ListItemText, 
  Button,
  Divider,
  useTheme,
  Paper
} from '@mui/material';
import { styled } from '@mui/system';
import { motion } from 'framer-motion';

const MapContainer = styled('div')(({ theme }) => ({
  height: '400px',
  background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.dark} 100%)`,
  borderRadius: '12px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.common.white,
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundImage: 'radial-gradient(circle at 50% 50%, transparent 60%, rgba(0,0,0,0.1) 100%)',
  }
}));

const PulseDot = styled('div')(({ theme }) => ({
  position: 'absolute',
  width: '20px',
  height: '20px',
  borderRadius: '50%',
  backgroundColor: theme.palette.error.main,
  boxShadow: `0 0 0 0 rgba(${theme.palette.error.main.replace(/[^\d,]/g, '').split(',').join(', ')}, 1)`,
  transform: 'translate(-50%, -50%)',
  animation: 'pulse 2s infinite',
  '@keyframes pulse': {
    '0%': {
      transform: 'translate(-50%, -50%) scale(0.95)',
      boxShadow: `0 0 0 0 rgba(${theme.palette.error.main.replace(/[^\d,]/g, '').split(',').join(', ')}, 0.7)`
    },
    '70%': {
      transform: 'translate(-50%, -50%) scale(1.3)',
      boxShadow: `0 0 0 15px rgba(${theme.palette.error.main.replace(/[^\d,]/g, '').split(',').join(', ')}, 0)`
    },
    '100%': {
      transform: 'translate(-50%, -50%) scale(0.95)',
      boxShadow: `0 0 0 0 rgba(${theme.palette.error.main.replace(/[^\d,]/g, '').split(',').join(', ')}, 0)`
    }
  }
}));

const LocationMap = () => {
  const theme = useTheme();
  
  const nearbyLocations = [
    { name: 'Military Hospital', distance: '1.2 km', type: 'medical' },
    { name: 'Unit HQ', distance: '0.5 km', type: 'military' },
    { name: 'Police Station', distance: '2.1 km', type: 'police' },
    { name: 'Fire Station', distance: '3.4 km', type: 'fire' }
  ];

  const getLocationIcon = (type) => {
    switch (type) {
      case 'medical': return <LocalHospital />;
      case 'military': return <MilitaryTech />;
      case 'police': return <LocalPolice />;
      case 'fire': return <FireTruck />;
      default: return <LocationOn />;
    }
  };

  const getLocationColor = (type) => {
    switch (type) {
      case 'medical': return theme.palette.error.main;
      case 'military': return theme.palette.success.main;
      case 'police': return theme.palette.info.main;
      case 'fire': return theme.palette.warning.main;
      default: return theme.palette.primary.main;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 700, mb: 4 }}>
          Emergency Map
        </Typography>
        
        <Card sx={{ mb: 4, borderRadius: '12px', overflow: 'hidden' }}>
          <MapContainer>
            <PulseDot style={{ top: '50%', left: '50%' }} />
            <Box textAlign="center" zIndex={1}>
              <LocationOn sx={{ fontSize: '60px', mb: 1 }} />
              <Typography variant="h6">Your Current Location</Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Map would display here with interactive features
              </Typography>
            </Box>
          </MapContainer>
          
          <Divider />
          
          <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Button 
              startIcon={<Navigation />} 
              variant="text" 
              color="primary"
              sx={{ textTransform: 'none' }}
            >
              Get Directions
            </Button>
            <Button 
              startIcon={<Share />} 
              variant="text" 
              color="primary"
              sx={{ textTransform: 'none' }}
            >
              Share Location
            </Button>
          </Box>
        </Card>
        
        <Card sx={{ borderRadius: '12px' }}>
          <CardHeader
            title={
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Nearby Emergency Services
              </Typography>
            }
          />
          <CardContent sx={{ pt: 0 }}>
            <List>
              {nearbyLocations.map((location, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <ListItem 
                    sx={{ 
                      '&:hover': { 
                        bgcolor: 'action.hover',
                        borderRadius: '8px'
                      },
                      transition: 'background-color 0.3s'
                    }}
                    secondaryAction={
                      <Button 
                        variant="outlined" 
                        size="small"
                        sx={{ borderRadius: '20px' }}
                      >
                        View
                      </Button>
                    }
                  >
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: getLocationColor(location.type) }}>
                        {getLocationIcon(location.type)}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={location.name}
                      secondary={`${location.distance} away`}
                    />
                  </ListItem>
                  {index < nearbyLocations.length - 1 && <Divider variant="inset" component="li" />}
                </motion.div>
              ))}
            </List>
          </CardContent>
        </Card>
      </Box>
    </motion.div>
  );
};

export default LocationMap;
import React, { useState } from 'react';
import {  
  Phone, 
  LocationOn, 
  People, 
  KeyboardArrowDown,
  KeyboardArrowUp
} from '@mui/icons-material';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Button, 
  List, 
  ListItem, 
  ListItemAvatar, 
  ListItemText, 
  Avatar,
  Collapse,
  Divider,
  useTheme,
  CircularProgress
} from '@mui/material';
import { styled, keyframes } from '@mui/system';
import { motion } from 'framer-motion';

const pulse = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7); }
  70% { box-shadow: 0 0 0 20px rgba(239, 68, 68, 0); }
  100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); }
`;

const SOSButton = styled(Button)(({ theme, active }) => {
  // Fallback for MUI v6+ where theme.shadows is not an array
  const safeShadow = Array.isArray(theme.shadows) ? theme.shadows[6] : (theme.shadows?.lg || '0px 3px 6px rgba(0,0,0,0.1)');
  return {
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    boxShadow: active ? `0 0 0 10px ${theme.palette.error.light}` : safeShadow,
    animation: active ? `${pulse} 2s infinite` : 'none',
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: active ? 'none' : 'scale(1.05)',
      boxShadow: active ? `0 0 0 10px ${theme.palette.error.light}` : safeShadow,
    },
  };
});

const SOSPage = () => {
  const theme = useTheme();
  const [isActive, setIsActive] = useState(false);
  const [showContacts, setShowContacts] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const emergencyContacts = [
    { name: 'Military Police', number: '1907' },
    { name: 'Medical Emergency', number: '1908' },
    { name: 'Unit HQ', number: '011-25678901' },
    { name: 'Family Contact', number: '+91 9876543210' }
  ];

  const handleSOS = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsActive(true);
      setIsSubmitting(false);
    }, 1500);
    
    setTimeout(() => {
      setIsActive(false);
    }, 10000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Box sx={{ 
        maxWidth: 'md', 
        mx: 'auto', 
        p: 3,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 700, mb: 2 }}>
          Emergency Assistance
        </Typography>
        
        <Card sx={{ 
          width: '100%', 
          maxWidth: '500px', 
          textAlign: 'center', 
          p: 4,
          borderRadius: '16px',
          boxShadow: theme.shadows[4]
        }}>
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            mb: 4
          }}>
            <motion.div
              animate={{ 
                scale: isActive ? [1, 1.1, 1] : 1,
                transition: isActive ? { repeat: Infinity, duration: 1.5 } : {}
              }}
            >
              <SOSButton
                variant="contained"
                color="error"
                active={isActive ? true : undefined}
                onClick={handleSOS}
                disabled={isActive || isSubmitting}
                sx={{ mb: 3 }}
              >
                {isSubmitting ? (
                  <CircularProgress size={24} color="inherit" />
                ) : isActive ? (
                  'ACTIVATED'
                ) : (
                  'SOS'
                )}
              </SOSButton>
            </motion.div>
            
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
              {isActive ? 'Emergency Alert Activated!' : 'Emergency SOS'}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {isActive 
                ? 'Help is on the way. Stay calm and follow instructions.' 
                : 'Press the button in case of emergency'}
            </Typography>
          </Box>
          
          <Button 
            variant="text" 
            color="primary"
            endIcon={showContacts ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
            onClick={() => setShowContacts(!showContacts)}
            sx={{ mb: 2 }}
          >
            Emergency Contacts
          </Button>
          
          <Collapse in={showContacts} timeout="auto" unmountOnExit>
            <Card sx={{ 
              backgroundColor: 'background.paper',
              borderRadius: '12px',
              mb: 2
            }}>
              <CardContent>
                <Typography variant="h6" sx={{ 
                  fontWeight: 600, 
                  mb: 2,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1
                }}>
                  <People />
                  Emergency Contacts
                </Typography>
                <List>
                  {emergencyContacts.map((contact, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <ListItem 
                        sx={{ 
                          '&:hover': { 
                            bgcolor: 'action.hover',
                            borderRadius: '8px'
                          }
                        }}
                        secondaryAction={
                          <Button 
                            component="a" 
                            href={`tel:${contact.number.replace(/[^0-9]/g, '')}`}
                            variant="outlined" 
                            size="small"
                            startIcon={<Phone />}
                            sx={{ borderRadius: '20px' }}
                          >
                            Call
                          </Button>
                        }
                      >
                        <ListItemAvatar>
                          <Avatar sx={{ bgcolor: 'primary.main' }}>
                            <Phone fontSize="small" />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={contact.name}
                          secondary={contact.number}
                        />
                      </ListItem>
                      {index < emergencyContacts.length - 1 && <Divider variant="inset" component="li" />}
                    </motion.div>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Collapse>
          
          <Card sx={{ 
            backgroundColor: 'background.paper',
            borderRadius: '12px'
          }}>
            <CardContent>
              <Typography variant="h6" sx={{ 
                fontWeight: 600, 
                mb: 2,
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}>
                <LocationOn />
                Share My Location
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Allow location access to share your current position with emergency responders.
              </Typography>
              <Button 
                variant="contained" 
                fullWidth
                startIcon={<LocationOn />}
                sx={{ borderRadius: '8px' }}
              >
                Share Location
              </Button>
            </CardContent>
          </Card>
        </Card>
      </Box>
    </motion.div>
  );
};

export default SOSPage;
import React from 'react';
import { 
  Phone, 
  LocationOn, 
  People, 
  Security, 
  LocalHospital,
  ExpandMore
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
  IconButton, 
  Collapse,
  Divider,
  useTheme
} from '@mui/material';
import { styled, keyframes } from '@mui/system';
import { motion } from 'framer-motion';

const pulseAnimation = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const StyledCard = styled(Card)(({ theme }) => ({
  transition: 'transform 0.3s, box-shadow 0.3s',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[8],
  },
  borderRadius: '12px',
}));

const EmergencyContacts = () => {
  const theme = useTheme();
  const [expandedCategory, setExpandedCategory] = React.useState(null);

  const handleExpandClick = (index) => {
    setExpandedCategory(expandedCategory === index ? null : index);
  };

  const contactCategories = [
    {
      title: 'Immediate Assistance',
      icon: <Phone />,
      color: theme.palette.error.main,
      contacts: [
        { name: 'Military Police', number: '1907' },
        { name: 'Medical Emergency', number: '1908' },
        { name: 'Fire & Rescue', number: '1909' }
      ]
    },
    {
      title: 'Unit Contacts',
      icon: <Security />,
      color: theme.palette.primary.main,
      contacts: [
        { name: 'Unit HQ', number: '011-25678901' },
        { name: 'CO Office', number: '011-25678902' },
        { name: 'Adjutant', number: '011-25678903' }
      ]
    },
    {
      title: 'Medical Facilities',
      icon: <LocalHospital />,
      color: theme.palette.success.main,
      contacts: [
        { name: 'Base Hospital', number: '011-25678910' },
        { name: 'Emergency Ward', number: '011-25678911' },
        { name: 'Dental Clinic', number: '011-25678912' }
      ]
    },
    {
      title: 'Family Support',
      icon: <People />,
      color: theme.palette.warning.main,
      contacts: [
        { name: 'AWWA Helpline', number: '011-25678920' },
        { name: 'Canteen Services', number: '011-25678921' },
        { name: 'School Liaison', number: '011-25678922' }
      ]
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 700, mb: 4 }}>
          Emergency Contacts
        </Typography>
        
        <StyledCard sx={{ mb: 4 }}>
          <CardContent sx={{ display: 'flex', alignItems: 'center', p: 3 }}>
            <Avatar sx={{ bgcolor: theme.palette.info.main, mr: 2 }}>
              <LocationOn />
            </Avatar>
            <Box>
              <Typography variant="h6" color="primary">
                Current Location
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Enable location services to show your nearest facilities
              </Typography>
            </Box>
          </CardContent>
        </StyledCard>
        
        <Grid container spacing={3}>
          {contactCategories.map((category, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <StyledCard>
                <CardHeader
                  avatar={
                    <Avatar sx={{ bgcolor: category.color }}>
                      {category.icon}
                    </Avatar>
                  }
                  action={
                    <IconButton
                      onClick={() => handleExpandClick(index)}
                      aria-expanded={expandedCategory === index}
                      aria-label="show more"
                    >
                      <ExpandMore sx={{ 
                        transform: expandedCategory === index ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.3s'
                      }} />
                    </IconButton>
                  }
                  title={
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {category.title}
                    </Typography>
                  }
                  sx={{
                    '& .MuiCardHeader-action': {
                      alignSelf: 'center',
                      m: 0
                    }
                  }}
                />
                <Collapse in={expandedCategory === index} timeout="auto" unmountOnExit>
                  <Divider />
                  <CardContent sx={{ pt: 0 }}>
                    <List dense>
                      {category.contacts.map((contact, idx) => (
                        <ListItem 
                          key={idx} 
                          sx={{ 
                            '&:hover': { 
                              bgcolor: 'action.hover',
                              borderRadius: 1
                            },
                            animation: `${pulseAnimation} 2s infinite`,
                            animationDelay: `${idx * 0.1}s`
                          }}
                        >
                          <ListItemAvatar>
                            <Avatar sx={{ bgcolor: 'background.default', color: category.color }}>
                              <Phone fontSize="small" />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary={contact.name}
                            secondary={contact.number}
                          />
                          <Box component="a" href={`tel:${contact.number.replace(/[^0-9]/g, '')}`}>
                            <IconButton color="primary">
                              <Phone />
                            </IconButton>
                          </Box>
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                </Collapse>
              </StyledCard>
            </Grid>
          ))}
        </Grid>
      </Box>
    </motion.div>
  );
};

export default EmergencyContacts;
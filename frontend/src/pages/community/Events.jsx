import { useState } from 'react';
import { CalendarToday, LocationOn, Schedule, People, Add } from '@mui/icons-material';
import { 
  Card, 
  CardContent, 
  CardMedia, 
  Typography, 
  Button, 
  Grid, 
  Container,
  Box,
  Chip,
  TextField,
  InputAdornment,
  Avatar,
  Divider,
  Fade,
  Grow,
  Slide
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';

const EventCard = styled(Card)(({ theme }) => ({
  transition: theme.transitions.create(['transform', 'box-shadow'], {
    duration: theme.transitions.duration.standard,
  }),
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[8],
  },
}));

const HighlightCard = styled(Card)(({ theme }) => ({
  background: 'linear-gradient(135deg, #1976d2 0%, #2196f3 100%)',
  color: theme.palette.common.white,
  borderRadius: theme.shape.borderRadius * 2,
}));

const Events = () => {
  const events = [
    {
      id: 1,
      title: 'Veteran Job Fair',
      date: '2023-11-15',
      time: '10:00 AM - 4:00 PM',
      location: 'Delhi Cantonment',
      attendees: 45,
      description: 'Exclusive job fair for retired defense personnel with top employers',
      image: '/images/events/job-fair.jpg'
    },
    {
      id: 2,
      title: 'Family Wellness Workshop',
      date: '2023-11-20',
      time: '2:00 PM - 5:00 PM',
      location: 'Online',
      attendees: 32,
      description: 'Mental health and wellness session for military families',
      image: '/images/events/wellness.jpg'
    },
    {
      id: 3,
      title: 'Annual Sainik Meet',
      date: '2023-12-05',
      time: '9:00 AM - 6:00 PM',
      location: 'Bangalore Military Station',
      attendees: 120,
      description: 'Annual gathering of serving and retired personnel',
      image: '/images/events/sainik-meet.jpg'
    }
  ];

  return (
    <Container maxWidth="xl" sx={{ py: 6 }}>
      <Fade in={true} timeout={800}>
        <Box textAlign="center" mb={6}>
          <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 700, color: 'primary.main' }}>
            Upcoming Events
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Community gatherings, workshops, and meetups for our defense community
          </Typography>
        </Box>
      </Fade>

      <Grid container spacing={4} justifyContent="center">
        {events.map((event, index) => (
          <Grid item xs={12} sm={6} md={4} key={event.id}>
            <Grow in={true} timeout={index * 300}>
              <EventCard>
                <CardMedia
                  component="img"
                  height="180"
                  image={event.image}
                  alt={event.title}
                />
                <CardContent>
                  <Box display="flex" alignItems="center" mb={1}>
                    <CalendarToday color="primary" fontSize="small" sx={{ mr: 1 }} />
                    <Typography variant="body2" color="primary" fontWeight="medium">
                      {new Date(event.date).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric', 
                        year: 'numeric' 
                      })}
                    </Typography>
                  </Box>
                  
                  <Typography variant="h5" component="h3" gutterBottom>
                    {event.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" mb={2}>
                    {event.description}
                  </Typography>
                  
                  <Box display="flex" alignItems="center" mb={1}>
                    <Schedule color="action" fontSize="small" sx={{ mr: 1 }} />
                    <Typography variant="body2" color="text.secondary">
                      {event.time}
                    </Typography>
                  </Box>
                  
                  <Box display="flex" alignItems="center" mb={1}>
                    <LocationOn color="action" fontSize="small" sx={{ mr: 1 }} />
                    <Typography variant="body2" color="text.secondary">
                      {event.location}
                    </Typography>
                  </Box>
                  
                  <Box display="flex" alignItems="center">
                    <People color="action" fontSize="small" sx={{ mr: 1 }} />
                    <Typography variant="body2" color="text.secondary">
                      {event.attendees} attending
                    </Typography>
                  </Box>
                  
                  <Box mt={3}>
                    <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                      <Button 
                        fullWidth 
                        variant="contained" 
                        color="primary"
                        size="medium"
                      >
                        Register Now
                      </Button>
                    </motion.div>
                  </Box>
                </CardContent>
              </EventCard>
            </Grow>
          </Grid>
        ))}
      </Grid>

      <Slide direction="up" in={true} timeout={1000}>
        <Box mt={6}>
          <HighlightCard>
            <Box p={4} display="flex" alignItems="center">
              <Avatar sx={{ bgcolor: 'white', color: 'primary.main', mr: 3 }}>
                <Add />
              </Avatar>
              <Box>
                <Typography variant="h6" gutterBottom>
                  Host Your Event
                </Typography>
                <Typography variant="body2" mb={2}>
                  Have an event for the defense community? List it here to reach the right audience.
                </Typography>
                <Button variant="outlined" color="inherit">
                  Submit Event Details
                </Button>
              </Box>
            </Box>
          </HighlightCard>
        </Box>
      </Slide>
    </Container>
  );
};

export default Events;
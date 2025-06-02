import { Favorite, Share, Comment, Add } from '@mui/icons-material';
import { Badge } from '@mui/material';
import {
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  Box,
  Grid,
  Avatar,
  Chip,
  Divider,
  Fade,
  Grow,
  Slide
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';

const StoryCard = styled(Card)(({ theme }) => ({
  transition: theme.transitions.create(['transform', 'box-shadow'], {
    duration: theme.transitions.duration.standard,
  }),
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[8],
  },
}));

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

const SuccessStories = () => {
  const stories = [
    {
      id: 1,
      title: 'From Battlefield to Business',
      author: 'Col. (Retd.) Rajesh Verma',
      excerpt: 'How I transitioned from military service to a successful entrepreneurship journey',
      likes: 45,
      comments: 12,
      image: '/images/stories/business.jpg',
      tags: ['Entrepreneurship', 'Transition']
    },
    {
      id: 2,
      title: 'Education Grant Changed Our Lives',
      author: 'Mrs. Priya Sharma (Wife of Hav. Sharma)',
      excerpt: 'My daughter could attend medical college thanks to the education grant scheme',
      likes: 32,
      comments: 8,
      image: '/images/stories/education.jpg',
      tags: ['Education', 'Benefits']
    },
    {
      id: 3,
      title: 'Rehabilitated and Thriving',
      author: 'Maj. (Retd.) Arjun Singh',
      excerpt: 'My journey of recovery after injury and how the rehabilitation program helped me',
      likes: 28,
      comments: 5,
      image: '/images/stories/rehab.jpg',
      tags: ['Health', 'Recovery']
    }
  ];

  return (
    <Container maxWidth="xl" sx={{ py: 6 }}>
      <Fade in={true} timeout={800}>
        <Box textAlign="center" mb={6}>
          <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 700, color: 'primary.main' }}>
            Success Stories
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Inspiration from our defense community members
          </Typography>
        </Box>
      </Fade>

      <Grid container spacing={4} justifyContent="center">
        {stories.map((story, index) => (
          <Grid item xs={12} sm={6} md={4} key={story.id}>
            <Grow in={true} timeout={index * 300}>
              <StoryCard>
                <CardMedia
                  component="img"
                  height="220"
                  image={story.image}
                  alt={story.title}
                />
                <CardContent>
                  <Box mb={2}>
                    {story.tags.map((tag, i) => (
                      <Chip 
                        key={i}
                        label={tag}
                        size="small"
                        color="primary"
                        variant="outlined"
                        sx={{ mr: 1, mb: 1 }}
                      />
                    ))}
                  </Box>
                  
                  <Typography variant="h5" component="h3" gutterBottom>
                    {story.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" mb={3}>
                    {story.excerpt}
                  </Typography>
                  
                  <Box display="flex" alignItems="center" mb={3}>
                    <Avatar sx={{ width: 40, height: 40, mr: 2 }} />
                    <Typography variant="subtitle2">
                      {story.author}
                    </Typography>
                  </Box>
                  
                  <Divider sx={{ my: 2 }} />
                  
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Box display="flex" alignItems="center" gap={2}>
                      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                        <Button 
                          startIcon={
                            <StyledBadge badgeContent={story.likes} color="primary">
                              <Favorite />
                            </StyledBadge>
                          }
                          size="small"
                        >
                          Like
                        </Button>
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                        <Button 
                          startIcon={
                            <StyledBadge badgeContent={story.comments} color="primary">
                              <Comment />
                            </StyledBadge>
                          }
                          size="small"
                        >
                          Comment
                        </Button>
                      </motion.div>
                    </Box>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button 
                        variant="contained" 
                        color="primary"
                        size="small"
                      >
                        Read Full Story
                      </Button>
                    </motion.div>
                  </Box>
                </CardContent>
              </StoryCard>
            </Grow>
          </Grid>
        ))}
      </Grid>

      <Slide direction="up" in={true} timeout={1000}>
        <Box mt={6} textAlign="center">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button 
              variant="contained" 
              color="primary"
              size="large"
              startIcon={<Add />}
              sx={{ px: 6, py: 1.5 }}
            >
              Share Your Story
            </Button>
          </motion.div>
        </Box>
      </Slide>
    </Container>
  );
};

export default SuccessStories;
import { useState } from 'react';
import { 
  Forum as ForumIcon,
  Search,
  Person,
  Schedule,
  ThumbUp,
  Comment,
  Add,
  Category
} from '@mui/icons-material';
import {
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  Box,
  Grid,
  TextField,
  InputAdornment,
  Avatar,
  Chip,
  Divider,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Badge,
  Fade,
  Grow,
  Slide
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';

const ForumCard = styled(Card)(({ theme }) => ({
  transition: theme.transitions.create(['transform', 'box-shadow'], {
    duration: theme.transitions.duration.standard,
  }),
  '&:hover': {
    transform: 'translateY(-3px)',
    boxShadow: theme.shadows[6],
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

const Forum = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('general');
  const [activeTab, setActiveTab] = useState('recent');

  const categories = [
    { id: 'general', name: 'General Discussion', icon: <ForumIcon /> },
    { id: 'benefits', name: 'Benefits & Schemes', icon: <Category /> },
    { id: 'health', name: 'Health & Wellness', icon: <Category /> },
    { id: 'housing', name: 'Housing & Posting', icon: <Category /> },
    { id: 'family', name: 'Family Support', icon: <Category /> }
  ];

  const posts = [
    {
      id: 1,
      title: 'Education grant application process',
      category: 'benefits',
      author: 'Capt. R. Sharma',
      replies: 12,
      likes: 24,
      lastReply: '2 hours ago',
      isLiked: false,
      isPinned: true
    },
    {
      id: 2,
      title: 'Best schools in Pune cantonment area',
      category: 'family',
      author: 'Maj. S. Patel',
      replies: 8,
      likes: 15,
      lastReply: '1 day ago',
      isLiked: true,
      isPinned: false
    },
    {
      id: 3,
      title: 'Posting after completing tenure',
      category: 'housing',
      author: 'Lt. Col. A. Singh',
      replies: 5,
      likes: 10,
      lastReply: '3 days ago',
      isLiked: false,
      isPinned: true
    },
    {
      id: 4,
      title: 'Mental health resources for veterans',
      category: 'health',
      author: 'Dr. N. Gupta',
      replies: 18,
      likes: 32,
      lastReply: '5 days ago',
      isLiked: false,
      isPinned: false
    }
  ];

  const filteredPosts = posts.filter(post => 
    (post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.author.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (activeCategory === 'general' || post.category === activeCategory)
  );

  const toggleLike = (postId) => {
    console.log(`Toggled like for post ${postId}`);
  };

  return (
    <Container maxWidth="xl" sx={{ py: 6 }}>
      <Fade in={true} timeout={800}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={6}>
          <Box>
            <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 700, color: 'primary.main' }}>
              Community Forum
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Connect with fellow service members and families
            </Typography>
          </Box>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button variant="contained" color="primary" size="large" startIcon={<Add />}>
              New Post
            </Button>
          </motion.div>
        </Box>
      </Fade>

      <Grid container spacing={4}>
        {/* Categories */}
        <Grid item xs={12} md={3}>
          <Slide direction="right" in={true} timeout={500}>
            <Card sx={{ borderRadius: 2 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                  Categories
                </Typography>
                <List>
                  {categories.map((category, index) => (
                    <ListItem key={category.id} disablePadding>
                      <ListItemButton
                        selected={activeCategory === category.id}
                        onClick={() => setActiveCategory(category.id)}
                        sx={{
                          borderRadius: 1,
                          '&.Mui-selected': {
                            backgroundColor: 'primary.light',
                            color: 'primary.main',
                          },
                          '&.Mui-selected:hover': {
                            backgroundColor: 'primary.light',
                          },
                        }}
                      >
                        <ListItemIcon sx={{ minWidth: 36 }}>
                          {category.icon}
                        </ListItemIcon>
                        <ListItemText primary={category.name} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Slide>
        </Grid>

        {/* Posts */}
        <Grid item xs={12} md={9}>
          <Fade in={true} timeout={800}>
            <Box mb={4}>
              <TextField
                fullWidth
                placeholder="Search forum posts..."
                variant="outlined"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                  sx: { borderRadius: 2 }
                }}
              />
            </Box>
          </Fade>

          <Tabs 
            value={activeTab} 
            onChange={(e, newValue) => setActiveTab(newValue)}
            sx={{ mb: 3 }}
          >
            <Tab label="Recent" value="recent" />
            <Tab label="Popular" value="popular" />
            <Tab label="Unanswered" value="unanswered" />
          </Tabs>

          {filteredPosts.length > 0 ? (
            <Grid container spacing={3}>
              {filteredPosts.map((post, index) => (
                <Grid item xs={12} key={post.id}>
                  <Grow in={true} timeout={index * 200}>
                    <ForumCard>
                      <CardContent>
                        <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                          <Box>
                            <Box display="flex" alignItems="center" mb={1}>
                              {post.isPinned && (
                                <Chip 
                                  label="Pinned" 
                                  size="small" 
                                  color="primary" 
                                  sx={{ mr: 1 }} 
                                />
                              )}
                              <Typography variant="h6" component="h3">
                                {post.title}
                              </Typography>
                            </Box>
                            <Box display="flex" alignItems="center" mb={2}>
                              <Avatar sx={{ width: 24, height: 24, mr: 1 }} />
                              <Typography variant="body2" color="text.secondary" mr={2}>
                                {post.author}
                              </Typography>
                              <Chip 
                                label={categories.find(c => c.id === post.category)?.name}
                                size="small"
                                variant="outlined"
                              />
                            </Box>
                          </Box>
                          <Box display="flex" alignItems="center">
                            <Schedule color="action" fontSize="small" sx={{ mr: 1 }} />
                            <Typography variant="body2" color="text.secondary">
                              {post.lastReply}
                            </Typography>
                          </Box>
                        </Box>

                        <Divider sx={{ my: 2 }} />

                        <Box display="flex" justifyContent="space-between" alignItems="center">
                          <Box display="flex" alignItems="center" gap={3}>
                            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                              <Button 
                                startIcon={
                                  <StyledBadge badgeContent={post.likes} color="primary">
                                    <ThumbUp color={post.isLiked ? "primary" : "action"} />
                                  </StyledBadge>
                                }
                                onClick={() => toggleLike(post.id)}
                                sx={{ textTransform: 'none' }}
                              >
                                Like
                              </Button>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                              <Button 
                                startIcon={
                                  <StyledBadge badgeContent={post.replies} color="primary">
                                    <Comment color="action" />
                                  </StyledBadge>
                                }
                                sx={{ textTransform: 'none' }}
                              >
                                Comments
                              </Button>
                            </motion.div>
                          </Box>
                          <Button 
                            variant="outlined" 
                            color="primary"
                            size="small"
                          >
                            View Discussion
                          </Button>
                        </Box>
                      </CardContent>
                    </ForumCard>
                  </Grow>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Slide direction="up" in={true} timeout={500}>
              <Card sx={{ textAlign: 'center', p: 4 }}>
                <Typography variant="h6" color="text.secondary">
                  No posts found matching your search
                </Typography>
                <Button variant="text" color="primary" sx={{ mt: 2 }}>
                  Clear search
                </Button>
              </Card>
            </Slide>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Forum;
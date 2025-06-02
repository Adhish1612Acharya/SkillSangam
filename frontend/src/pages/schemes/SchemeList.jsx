import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, FilterAlt, Star, AccessTime, CheckCircle } from '@mui/icons-material';
import {
  Box,
  Typography,
  Button,
  TextField,
  InputAdornment,
  MenuItem,
  Select,
  Card,
  CardContent,
  CardActions,
  Chip,
  Grid,
  Container,
  Avatar,
  Divider,
  Slide,
  Fade,
  Grow,
  Skeleton
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { indigo, blue, amber, green, red, grey } from '@mui/material/colors';

const StyledCard = styled(Card)(({ theme }) => ({
  transition: theme.transitions.create(['transform', 'box-shadow'], {
    duration: theme.transitions.duration.standard,
  }),
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[8],
  },
}));

const CategoryChip = styled(Chip)(({ theme }) => ({
  marginRight: theme.spacing(1),
  marginBottom: theme.spacing(1),
}));

const RecommendedBadge = styled(Chip)(({ theme }) => ({
  backgroundColor: amber[100],
  color: amber[800],
  marginLeft: theme.spacing(1),
  '& .MuiChip-icon': {
    color: amber[600],
  },
}));

const SchemeList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(false);

  // Simulate loading
  setTimeout(() => setLoading(false), 1000);

  const schemes = [
    {
      id: 1,
      title: 'Education Grant for Children',
      description: 'Financial assistance for education of soldiers children up to graduation level with annual renewal option.',
      category: 'education',
      eligibility: 'All serving personnel',
      deadline: '2023-12-31',
      recommended: true,
      icon: 'school',
    },
    {
      id: 2,
      title: 'Housing Loan Subsidy Scheme',
      description: 'Interest subsidy on home loans for serving and retired personnel with flexible repayment options.',
      category: 'housing',
      eligibility: 'Minimum 5 years of service',
      deadline: 'Ongoing',
      recommended: false,
      icon: 'home',
    },
    {
      id: 3,
      title: 'Comprehensive Healthcare Coverage',
      description: 'Extended healthcare benefits for family members including dental and vision coverage.',
      category: 'health',
      eligibility: 'All serving personnel',
      deadline: '2023-11-30',
      recommended: true,
      icon: 'medical_services',
    },
    {
      id: 4,
      title: 'Vocational Training Program',
      description: 'Skill development and certification programs for retiring personnel in high-demand fields.',
      category: 'employment',
      eligibility: 'Personnel retiring within 2 years',
      deadline: '2024-03-15',
      recommended: false,
      icon: 'work',
    },
    {
      id: 5,
      title: 'Family Welfare Assistance',
      description: 'Monthly stipend for families of personnel deployed in high-risk zones.',
      category: 'welfare',
      eligibility: 'Active deployment status',
      deadline: '2024-06-30',
      recommended: true,
      icon: 'family_restroom',
    },
  ];

  const categoryColors = {
    education: blue[500],
    housing: indigo[500],
    health: green[500],
    employment: amber[600],
    welfare: red[500],
  };

  const filteredSchemes = schemes.filter(scheme => {
    const matchesSearch = scheme.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         scheme.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || 
                         (filter === 'recommended' && scheme.recommended) || 
                         scheme.category === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Slide direction="down" in={true} mountOnEnter unmountOnExit>
        <Box sx={{ mb: 4 }}>
          <Grid container justifyContent="space-between" alignItems="center" spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="h4" component="h1" fontWeight="bold" color="primary">
                Available Schemes
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                Browse and apply for benefits tailored for defense personnel
              </Typography>
            </Grid>
            <Grid item xs={12} md={6} sx={{ textAlign: { xs: 'left', md: 'right' } }}>
              <Button
                component={Link}
                to="/ai/recommender"
                variant="contained"
                color="primary"
                size="large"
                startIcon={<Star />}
                sx={{
                  px: 3,
                  py: 1.5,
                  borderRadius: 2,
                  boxShadow: 2,
                  '&:hover': {
                    boxShadow: 4,
                  }
                }}
              >
                Get AI Recommendations
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Slide>

      {/* Search and Filter */}
      <Fade in={true} timeout={800}>
        <Card sx={{ mb: 3, p: 3, borderRadius: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Search schemes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search color="action" />
                    </InputAdornment>
                  ),
                  sx: { borderRadius: 2 }
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: grey[300],
                    },
                    '&:hover fieldset': {
                      borderColor: 'primary.main',
                    },
                  }
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Select
                fullWidth
                variant="outlined"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                startAdornment={
                  <InputAdornment position="start" sx={{ mr: 1 }}>
                    <FilterAlt color="action" />
                  </InputAdornment>
                }
                sx={{
                  borderRadius: 2,
                  '& .MuiSelect-select': {
                    display: 'flex',
                    alignItems: 'center',
                    pl: 1,
                  }
                }}
              >
                <MenuItem value="all">All Schemes</MenuItem>
                <MenuItem value="recommended">Recommended</MenuItem>
                <MenuItem value="education">Education</MenuItem>
                <MenuItem value="housing">Housing</MenuItem>
                <MenuItem value="health">Health</MenuItem>
                <MenuItem value="employment">Employment</MenuItem>
                <MenuItem value="welfare">Welfare</MenuItem>
              </Select>
            </Grid>
          </Grid>
        </Card>
      </Fade>

      {/* AI Recommendations Section */}
      {filter === 'recommended' && (
        <Fade in={true} timeout={1000}>
          <Card sx={{ 
            mb: 3, 
            p: 3, 
            borderRadius: 3,
            backgroundColor: blue[50],
            borderLeft: `4px solid ${blue[500]}`,
            boxShadow: 'none'
          }}>
            <Grid container alignItems="center" spacing={2}>
              <Grid item xs="auto">
                <Avatar sx={{ bgcolor: blue[100], width: 48, height: 48 }}>
                  <Star sx={{ color: blue[600] }} />
                </Avatar>
              </Grid>
              <Grid item xs>
                <Typography variant="h6" color={blue[800]} fontWeight="medium">
                  AI-Powered Recommendations
                </Typography>
                <Typography variant="body2" color={blue[600]}>
                  These schemes are personalized for you based on your service profile, 
                  family details, and previous applications.
                </Typography>
              </Grid>
            </Grid>
          </Card>
        </Fade>
      )}

      {/* Scheme List */}
      <Box sx={{ mt: 4 }}>
        {loading ? (
          <Grid container spacing={3}>
            {[1, 2, 3].map((item) => (
              <Grid item xs={12} key={item}>
                <Skeleton variant="rectangular" height={150} sx={{ borderRadius: 2 }} />
              </Grid>
            ))}
          </Grid>
        ) : filteredSchemes.length > 0 ? (
          <Grid container spacing={3}>
            {filteredSchemes.map((scheme, index) => (
              <Grid item xs={12} key={scheme.id}>
                <Grow in={true} timeout={(index + 1) * 200}>
                  <StyledCard>
                    <CardContent>
                      <Grid container spacing={2}>
                        <Grid item xs={12} md={8}>
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                            <Typography variant="h5" component="h2" fontWeight="medium">
                              {scheme.title}
                            </Typography>
                            {scheme.recommended && (
                              <RecommendedBadge
                                icon={<Star fontSize="small" />}
                                label="Recommended"
                                size="small"
                              />
                            )}
                          </Box>
                          <Typography variant="body1" color="text.secondary" paragraph>
                            {scheme.description}
                          </Typography>
                          <Box sx={{ mt: 1 }}>
                            <CategoryChip
                              label={scheme.category}
                              size="small"
                              sx={{ 
                                backgroundColor: `${categoryColors[scheme.category]}20`,
                                color: categoryColors[scheme.category]
                              }}
                            />
                            <CategoryChip
                              label={scheme.eligibility}
                              size="small"
                              variant="outlined"
                            />
                          </Box>
                        </Grid>
                        <Grid item xs={12} md={4}>
                          <Box sx={{ 
                            display: 'flex', 
                            flexDirection: 'column', 
                            height: '100%',
                            justifyContent: 'space-between',
                            alignItems: { xs: 'flex-start', md: 'flex-end' }
                          }}>
                            <Box sx={{ 
                              display: 'flex', 
                              alignItems: 'center',
                              mb: { xs: 2, md: 0 },
                              color: scheme.deadline === 'Ongoing' ? green[600] : 'text.secondary'
                            }}>
                              <AccessTime fontSize="small" sx={{ mr: 1 }} />
                              <Typography variant="body2">
                                {scheme.deadline === 'Ongoing' ? 'No Deadline' : `Deadline: ${scheme.deadline}`}
                              </Typography>
                            </Box>
                            <Button
                              component={Link}
                              to={`/schemes/apply/${scheme.id}`}
                              variant="contained"
                              color="primary"
                              size="medium"
                              fullWidth={false}
                              sx={{
                                alignSelf: { xs: 'stretch', md: 'flex-end' },
                                borderRadius: 2,
                                px: 3,
                                py: 1.5,
                                textTransform: 'none',
                                fontWeight: 'medium'
                              }}
                            >
                              Apply Now
                            </Button>
                          </Box>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </StyledCard>
                </Grow>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Fade in={true} timeout={1000}>
            <Card sx={{ textAlign: 'center', p: 8, borderRadius: 3 }}>
              <Box sx={{ maxWidth: 400, margin: '0 auto' }}>
                <Search sx={{ fontSize: 60, color: grey[400], mb: 2 }} />
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  No schemes found
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph>
                  We couldn't find any schemes matching your search criteria. Try adjusting your filters.
                </Typography>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => {
                    setSearchTerm('');
                    setFilter('all');
                  }}
                  sx={{ mt: 2 }}
                >
                  Reset Filters
                </Button>
              </Box>
            </Card>
          </Fade>
        )}
      </Box>
    </Container>
  );
};

export default SchemeList;
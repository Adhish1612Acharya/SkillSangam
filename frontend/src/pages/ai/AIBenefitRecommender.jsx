import { 
  useState,
  useEffect 
} from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  CardHeader, 
  Avatar, 
  Button, 
  TextField, 
  Select, 
  MenuItem, 
  InputLabel, 
  FormControl,
  Chip,
  Divider,
  Alert,
  useTheme
} from '@mui/material';
import { 
  Stars, 
  AutoAwesome, 
  CheckCircle, 
  Warning, 
  School, 
  HomeWork, 
  HealthAndSafety 
} from '@mui/icons-material';

const AIBenefitRecommender = () => {
  const theme = useTheme();
  const [serviceDetails, setServiceDetails] = useState({
    status: 'serving',
    rank: 'havaldar',
    yearsOfService: 8,
    familyMembers: 2,
    children: 1,
    disabilities: 'none'
  });

  const [recommendedSchemes, setRecommendedSchemes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setRecommendedSchemes([
        {
          id: 1,
          name: 'Education Grant for Children',
          match: 95,
          description: 'Financial assistance for education of soldiers children up to ₹50,000 per child annually',
          reason: 'Matches your profile: Serving personnel with children',
          icon: <School color="primary" />,
          category: 'education'
        },
        {
          id: 2,
          name: 'Housing Loan Subsidy',
          match: 85,
          description: 'Interest subsidy on home loans for serving personnel with minimum 5 years service',
          reason: 'You qualify with 8 years of service',
          icon: <HomeWork color="primary" />,
          category: 'housing'
        },
        {
          id: 3,
          name: 'Family Health Care Plan',
          match: 75,
          description: 'Comprehensive healthcare coverage for family members',
          reason: 'You have 2 family members eligible for coverage',
          icon: <HealthAndSafety color="primary" />,
          category: 'health'
        }
      ]);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [serviceDetails]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setServiceDetails(prev => ({
      ...prev,
      [name]: value
    }));
    setIsLoading(true);
  };

  const getMatchColor = (match) => {
    if (match > 90) return 'success';
    if (match > 75) return 'primary';
    return 'warning';
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
        <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
          <AutoAwesome />
        </Avatar>
        <Typography variant="h4" component="h1" fontWeight="bold">
          AI Benefit Recommender
        </Typography>
      </Box>

      <Typography variant="body1" color="text.secondary" mb={4}>
        Get personalized scheme recommendations based on your service profile and family details.
      </Typography>

      <Grid container spacing={4}>
        {/* Profile Input */}
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardHeader 
              title={
                <Typography variant="h6" component="h2">
                  Your Service Profile
                </Typography>
              }
              avatar={
                <Avatar sx={{ bgcolor: 'primary.light' }}>
                  <Person />
                </Avatar>
              }
            />
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>Service Status</InputLabel>
                    <Select
                      name="status"
                      value={serviceDetails.status}
                      onChange={handleInputChange}
                      label="Service Status"
                    >
                      <MenuItem value="serving">Serving</MenuItem>
                      <MenuItem value="retired">Retired</MenuItem>
                      <MenuItem value="veteran">Veteran</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>Rank</InputLabel>
                    <Select
                      name="rank"
                      value={serviceDetails.rank}
                      onChange={handleInputChange}
                      label="Rank"
                    >
                      <MenuItem value="sepoy">Sepoy</MenuItem>
                      <MenuItem value="naik">Naik</MenuItem>
                      <MenuItem value="havaldar">Havaldar</MenuItem>
                      <MenuItem value="subedar">Subedar</MenuItem>
                      <MenuItem value="lieutenant">Lieutenant</MenuItem>
                      <MenuItem value="captain">Captain</MenuItem>
                      <MenuItem value="major">Major</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    type="number"
                    name="yearsOfService"
                    label="Years of Service"
                    value={serviceDetails.yearsOfService}
                    onChange={handleInputChange}
                    inputProps={{ min: 0, max: 40 }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    type="number"
                    name="familyMembers"
                    label="Family Members"
                    value={serviceDetails.familyMembers}
                    onChange={handleInputChange}
                    inputProps={{ min: 0, max: 10 }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    type="number"
                    name="children"
                    label="Children (under 25)"
                    value={serviceDetails.children}
                    onChange={handleInputChange}
                    inputProps={{ min: 0, max: 10 }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>Disabilities</InputLabel>
                    <Select
                      name="disabilities"
                      value={serviceDetails.disabilities}
                      onChange={handleInputChange}
                      label="Disabilities"
                    >
                      <MenuItem value="none">None</MenuItem>
                      <MenuItem value="service-related">Service Related</MenuItem>
                      <MenuItem value="other">Other</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Recommendations */}
        <Grid item xs={12} md={8}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Alert 
              severity="info" 
              icon={<Stars />}
              sx={{ 
                backgroundColor: theme.palette.info.light,
                color: theme.palette.info.dark
              }}
            >
              <Typography variant="subtitle2" fontWeight="bold">
                AI-Powered Recommendations
              </Typography>
              <Typography variant="body2">
                These schemes are personalized for you based on your service profile and family details.
              </Typography>
            </Alert>

            {isLoading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
                <CircularProgress />
              </Box>
            ) : (
              recommendedSchemes.map(scheme => (
                <Card key={scheme.id} sx={{ transition: 'box-shadow 0.3s', '&:hover': { boxShadow: 6 } }}>
                  <CardContent>
                    <Grid container spacing={2} alignItems="center">
                      <Grid item xs="auto">
                        <Avatar sx={{ bgcolor: `${scheme.category}.light` }}>
                          {scheme.icon}
                        </Avatar>
                      </Grid>
                      <Grid item xs>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <Typography variant="h6" component="h3" sx={{ mr: 2 }}>
                            {scheme.name}
                          </Typography>
                          <Chip 
                            label={`${scheme.match}% match`} 
                            color={getMatchColor(scheme.match)}
                            size="small"
                          />
                        </Box>
                        <Typography variant="body2" color="text.secondary" paragraph>
                          {scheme.description}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <AutoAwesome fontSize="small" color="primary" />
                          <Typography variant="caption" color="primary">
                            {scheme.reason}
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs="auto">
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                          <Button variant="contained" size="small">
                            View Details
                          </Button>
                          <Button variant="text" size="small" color="primary">
                            Save for later
                          </Button>
                        </Box>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              ))
            )}

            <Alert 
              severity="warning" 
              icon={<Warning />}
              sx={{ 
                backgroundColor: theme.palette.warning.light,
                color: theme.palette.warning.dark
              }}
            >
              <Typography variant="subtitle2" fontWeight="bold">
                Improve Recommendations
              </Typography>
              <Typography variant="body2">
                Update your profile details for more accurate suggestions. The AI learns as you provide more information.
              </Typography>
            </Alert>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AIBenefitRecommender;
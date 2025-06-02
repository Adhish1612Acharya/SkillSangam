import { Link } from 'react-router-dom';
import { Description, Warning, Favorite, Chat } from '@mui/icons-material';
import { 
  Grid, 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  Button,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  Paper,
  Chip,
  Grow,
  Fade
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { blue, green, orange, purple } from '@mui/material/colors';

const BenefitCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(2),
  background: `linear-gradient(135deg, ${blue[50]}, ${theme.palette.background.paper})`,
  borderLeft: `4px solid ${orange[500]}`,
  transition: 'transform 0.3s',
  '&:hover': {
    transform: 'translateY(-3px)',
  },
}));

const FamilyDashboard = () => {
  const stats = [
    { title: 'Active Applications', value: 2, icon: Description, color: blue[500], link: '/applications' },
    { title: 'Recommended Schemes', value: 4, icon: Favorite, color: green[500], link: '/schemes' },
    { title: 'Family Benefits', value: 3, icon: Favorite, color: orange[500], link: '/schemes' },
    { title: 'Community Updates', value: 5, icon: Chat, color: purple[500], link: '/community/forum' },
  ];

  const quickActions = [
    { title: 'Apply for Scheme', icon: Description, link: '/schemes' },
    { title: 'File Grievance', icon: Warning, link: '/grievance/file' },
    { title: 'Success Stories', icon: Favorite, link: '/community/stories' },
    { title: 'Community Forum', icon: Chat, link: '/community/forum' },
  ];

  const benefits = [
    { 
      title: 'Education Grant for Children', 
      description: 'Up to ₹50,000 per child annually',
      icon: <Description color="primary" sx={{ fontSize: 40 }} />
    },
    { 
      title: 'Healthcare Coverage', 
      description: 'Free treatment at military hospitals',
      icon: <Favorite color="primary" sx={{ fontSize: 40 }} />
    },
    { 
      title: 'Housing Subsidy', 
      description: 'Interest subsidy on home loans',
      icon: <Description color="primary" sx={{ fontSize: 40 }} />
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Fade in={true} timeout={500}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ 
          fontWeight: 'bold',
          color: 'primary.main',
          mb: 4,
          display: 'flex',
          alignItems: 'center'
        }}>
          <img 
            src="/assets/indian-army-logo.png" 
            alt="Indian Army" 
            style={{ height: '40px', marginRight: '16px' }} 
          />
          Family Dashboard
        </Typography>
      </Fade>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat, index) => (
          <Grow in={true} timeout={500} key={index} style={{ transitionDelay: `${index * 100}ms` }}>
            <Grid sx={{ gridColumn: { xs: 'span 12', sm: 'span 6', md: 'span 3' } }}>
              <Link to={stat.link} style={{ textDecoration: 'none' }}>
                <Card sx={{ 
                  height: '100%',
                  borderLeft: `4px solid ${stat.color}`,
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: 3,
                  }
                }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Avatar sx={{ bgcolor: stat.color, mr: 2 }}>
                        <stat.icon sx={{ color: 'white' }} />
                      </Avatar>
                      <Typography variant="h6" color="text.secondary">
                        {stat.title}
                      </Typography>
                    </Box>
                    <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                      {stat.value}
                    </Typography>
                  </CardContent>
                </Card>
              </Link>
            </Grid>
          </Grow>
        ))}
      </Grid>

      {/* Quick Actions */}
      <Grow in={true} timeout={800}>
        <Card sx={{ mb: 4, p: 2 }}>
          <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
            Quick Actions
          </Typography>
          <Grid container spacing={2}>
            {quickActions.map((action, index) => (
              <Grid sx={{ gridColumn: { xs: 'span 12', sm: 'span 6', md: 'span 3' } }} key={index}>
                <Link to={action.link} style={{ textDecoration: 'none' }}>
                  <Button 
                    variant="contained" 
                    fullWidth 
                    sx={{ 
                      p: 3,
                      display: 'flex',
                      flexDirection: 'column',
                      backgroundColor: 'primary.main',
                      '&:hover': {
                        backgroundColor: 'primary.dark',
                      }
                    }}
                    startIcon={
                      <action.icon sx={{ 
                        fontSize: 32, 
                        mb: 1,
                        color: 'white'
                      }} />
                    }
                  >
                    <Typography variant="body1" sx={{ color: 'white', textAlign: 'center' }}>
                      {action.title}
                    </Typography>
                  </Button>
                </Link>
              </Grid>
            ))}
          </Grid>
        </Card>
      </Grow>

      {/* Family Benefits */}
      <Grow in={true} timeout={1000}>
        <Card sx={{ p: 2 }}>
          <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
            Available Family Benefits
          </Typography>
          <Grid container spacing={3}>
            {benefits.map((benefit, index) => (
              <Grow in={true} timeout={500} key={index} style={{ transitionDelay: `${index * 100}ms` }}>
                <Grid sx={{ gridColumn: { xs: 'span 12', md: 'span 4' } }}>
                  <BenefitCard elevation={3}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      {benefit.icon}
                      <Typography variant="h6" sx={{ fontWeight: 'bold', ml: 2 }}>
                        {benefit.title}
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      {benefit.description}
                    </Typography>
                    <Button 
                      variant="outlined" 
                      sx={{ mt: 2, color: 'primary.main', borderColor: 'primary.main' }}
                      component={Link}
                      to="/schemes"
                    >
                      Learn More
                    </Button>
                  </BenefitCard>
                </Grid>
              </Grow>
            ))}
          </Grid>
        </Card>
      </Grow>
    </Box>
  );
};

export default FamilyDashboard;
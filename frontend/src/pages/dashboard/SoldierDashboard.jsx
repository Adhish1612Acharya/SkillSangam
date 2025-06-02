import { Link } from 'react-router-dom';
import { Home, Description, Warning, ShoppingCart, Chat, Favorite, CheckCircle } from '@mui/icons-material';
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
  Fade,
  useTheme
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { blue, green, orange, red, purple } from '@mui/material/colors';

const EmergencyButton = styled(Button)(({ theme }) => ({
  background: `linear-gradient(45deg, ${red[600]}, ${orange[500]})`,
  color: 'white',
  fontWeight: 'bold',
  padding: theme.spacing(2),
  fontSize: '1rem',
  boxShadow: theme.shadows[4],
  '&:hover': {
    background: `linear-gradient(45deg, ${red[700]}, ${orange[600]})`,
    boxShadow: theme.shadows[8],
  },
}));

const SoldierDashboard = () => {
  const theme = useTheme();
  const stats = [
    { title: 'Pending Applications', value: 3, icon: Description, color: blue[500], link: '/applications' },
    { title: 'Active Grievances', value: 1, icon: Warning, color: orange[500], link: '/grievance/track' },
    { title: 'Recommended Schemes', value: 5, icon: Favorite, color: green[500], link: '/schemes' },
    { title: 'New Marketplace Items', value: 8, icon: ShoppingCart, color: purple[500], link: '/marketplace' },
  ];

  const quickActions = [
    { title: 'Apply for Scheme', icon: Description, link: '/schemes' },
    { title: 'File Grievance', icon: Warning, link: '/grievance/file' },
    { title: 'Post to Marketplace', icon: ShoppingCart, link: '/marketplace/post' },
    { title: 'Community Forum', icon: Chat, link: '/community/forum' },
    { title: 'Success Stories', icon: Favorite, link: '/community/stories' },
    { title: 'Emergency SOS', icon: Warning, link: '/emergency', isEmergency: true },
  ];

  const activities = [
    { 
      description: 'Your application for Education Grant was approved', 
      time: '2 days ago',
      icon: <CheckCircle color="success" />
    },
    { 
      description: 'New scheme Housing Loan Subsidy matches your profile', 
      time: '4 days ago',
      icon: <Description color="primary" />
    },
    { 
      description: 'Your grievance #GRV-2023-001 is being processed', 
      time: '1 week ago',
      icon: <Warning color="warning" />
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Fade in={true} timeout={500}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom sx={{ 
            fontWeight: 'bold',
            color: 'primary.main',
            display: 'flex',
            alignItems: 'center'
          }}>
            <img 
              src="/assets/indian-army-logo.png" 
              alt="Indian Army" 
              style={{ height: '40px', marginRight: '16px' }} 
            />
            Welcome Back, Soldier
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Thank you for your service to the nation
          </Typography>
        </Box>
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
                  background: `linear-gradient(135deg, ${theme.palette.background.paper}, ${theme.palette.background.default})`,
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
        <Card sx={{ mb: 4, p: 2, background: `linear-gradient(135deg, ${theme.palette.background.paper}, ${theme.palette.background.default})` }}>
          <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
            Quick Actions
          </Typography>
          <Grid container spacing={2}>
            {quickActions.map((action, index) => (
              <Grid sx={{ gridColumn: { xs: 'span 12', sm: 'span 6', md: 'span 4', lg: 'span 2' } }} key={index}>
                <Link to={action.link} style={{ textDecoration: 'none' }}>
                  {action.isEmergency ? (
                    <EmergencyButton 
                      fullWidth 
                      sx={{ 
                        p: 2,
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                      }}
                      startIcon={
                        <action.icon sx={{ 
                          fontSize: 32, 
                          mb: 1,
                          color: 'white'
                        }} />
                      }
                    >
                      {action.title}
                    </EmergencyButton>
                  ) : (
                    <Button 
                      variant="contained" 
                      fullWidth 
                      sx={{ 
                        p: 2,
                        height: '100%',
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
                      {action.title}
                    </Button>
                  )}
                </Link>
              </Grid>
            ))}
          </Grid>
        </Card>
      </Grow>

      {/* Recent Activity */}
      <Grow in={true} timeout={1000}>
        <Card sx={{ p: 2 }}>
          <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
            Recent Activity
          </Typography>
          <List sx={{ width: '100%' }}>
            {activities.map((activity, index) => (
              <Grow in={true} timeout={500} key={index} style={{ transitionDelay: `${index * 100}ms` }}>
                <Paper elevation={0} sx={{ 
                  mb: 2,
                  borderLeft: `4px solid ${
                    activity.icon.props.color === 'success' ? green[500] : 
                    activity.icon.props.color === 'warning' ? orange[500] : 
                    blue[500]
                  }`,
                  backgroundColor: 'background.default'
                }}>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar sx={{ 
                        bgcolor: activity.icon.props.color === 'success' ? green[100] : 
                                 activity.icon.props.color === 'warning' ? orange[100] : 
                                 blue[100],
                        color: activity.icon.props.color === 'success' ? green[800] : 
                               activity.icon.props.color === 'warning' ? orange[800] : 
                               blue[800]
                      }}>
                        {activity.icon}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Typography variant="subtitle1">
                            {activity.description}
                          </Typography>
                          <Chip 
                            label={activity.time} 
                            size="small" 
                            sx={{ ml: 2, fontSize: '0.7rem' }} 
                          />
                        </Box>
                      }
                    />
                  </ListItem>
                </Paper>
              </Grow>
            ))}
          </List>
        </Card>
      </Grow>
    </Box>
  );
};

export default SoldierDashboard;
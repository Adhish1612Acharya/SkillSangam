import { Link } from 'react-router-dom';
import { Description, Warning, People, CheckCircle } from '@mui/icons-material';
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
import { blue, green, red, purple } from '@mui/material/colors';

const ActivityItem = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  borderLeft: `4px solid ${blue[500]}`,
  backgroundColor: theme.palette.background.default,
  transition: 'all 0.3s',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const GovtDashboard = () => {
  const stats = [
    { title: 'Pending Approvals', value: 12, icon: Description, color: blue[500], link: '/applications' },
    { title: 'New Grievances', value: 8, icon: Warning, color: red[500], link: '/grievances' },
    { title: 'Schemes Managed', value: 15, icon: CheckCircle, color: green[500], link: '/schemes/manage' },
    { title: 'Users Registered', value: 245, icon: People, color: purple[500], link: '/admin/users' },
  ];

  const quickActions = [
    { title: 'Review Applications', icon: Description, link: '/applications' },
    { title: 'Process Grievances', icon: Warning, link: '/grievances' },
    { title: 'Manage Schemes', icon: CheckCircle, link: '/schemes/manage' },
    { title: 'User Management', icon: People, link: '/admin/users' },
  ];

  const activities = [
    { 
      description: '5 new applications received for Education Grant', 
      time: '2 hours ago',
      icon: <Description color="primary" />
    },
    { 
      description: 'Grievance #GRV-2023-045 marked as resolved', 
      time: '1 day ago',
      icon: <CheckCircle color="success" />
    },
    { 
      description: 'New scheme Healthcare Expansion published', 
      time: '3 days ago',
      icon: <CheckCircle color="primary" />
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
            src="/assets/indian-govt-logo.png" 
            alt="Government of India" 
            style={{ height: '40px', marginRight: '16px' }} 
          />
          Government Official Dashboard
        </Typography>
      </Fade>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat, index) => (
          <Grow in={true} timeout={500} key={index} style={{ transitionDelay: `${index * 100}ms` }}>
            <Grid item xs={12} sm={6} md={3}>
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
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Link to={action.link} style={{ textDecoration: 'none' }}>
                  <Button 
                    variant="outlined" 
                    fullWidth 
                    sx={{ 
                      p: 3,
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      borderColor: 'divider',
                      '&:hover': {
                        borderColor: 'primary.main',
                        backgroundColor: 'action.hover'
                      }
                    }}
                    startIcon={
                      <action.icon sx={{ 
                        fontSize: 32, 
                        mb: 1,
                        color: 'primary.main'
                      }} />
                    }
                  >
                    <Typography variant="body1" sx={{ textAlign: 'center' }}>
                      {action.title}
                    </Typography>
                  </Button>
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
                <ActivityItem elevation={0}>
                  <ListItem disableGutters>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: 'transparent' }}>
                        {activity.icon}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={activity.description}
                      secondary={
                        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                          <Chip 
                            label={activity.time} 
                            size="small" 
                            sx={{ fontSize: '0.7rem' }} 
                          />
                        </Box>
                      }
                    />
                  </ListItem>
                </ActivityItem>
              </Grow>
            ))}
          </List>
        </Card>
      </Grow>
    </Box>
  );
};

export default GovtDashboard;
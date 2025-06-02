import { Link } from 'react-router-dom';
import { People, Warning, Description, Settings, Chat } from '@mui/icons-material';
import { 
  Grid, 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  Button, 
  Paper,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  Chip,
  Grow,
  Fade
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { indigo, amber, green, red, deepOrange } from '@mui/material/colors';

const StyledCard = styled(Card)(({ theme }) => ({
  transition: 'transform 0.3s, box-shadow 0.3s',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[8],
  },
  borderLeft: `4px solid ${theme.palette.primary.main}`,
  height: '100%',
}));

const AlertCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  borderLeft: `4px solid ${amber[500]}`,
  backgroundColor: theme.palette.background.default,
  '&.success': {
    borderLeft: `4px solid ${green[500]}`,
  },
  '&.info': {
    borderLeft: `4px solid ${indigo[500]}`,
  },
}));

const AdminDashboard = () => {
  const stats = [
    { title: 'Total Users', value: 356, icon: People, color: indigo[500], link: '/admin/users' },
    { title: 'Active Grievances', value: 24, icon: Warning, color: amber[500], link: '/admin/moderation' },
    { title: 'Pending Moderation', value: 15, icon: Description, color: red[500], link: '/admin/moderation' },
    { title: 'System Health', value: 'Good', icon: Settings, color: green[500], link: '/admin/settings' },
  ];

  const quickActions = [
    { title: 'User Management', icon: People, link: '/admin/users' },
    { title: 'Content Moderation', icon: Warning, link: '/admin/moderation' },
    { title: 'Reports', icon: Description, link: '/admin/reports' },
    { title: 'System Settings', icon: Settings, link: '/admin/settings' },
    { title: 'Community Posts', icon: Chat, link: '/admin/community' },
  ];

  const alerts = [
    { 
      title: 'Database Backup Required', 
      message: 'Last backup was 6 days ago', 
      severity: 'warning',
      time: '2 hours ago'
    },
    { 
      title: 'All Systems Operational', 
      message: 'No critical issues detected', 
      severity: 'success',
      time: 'Today'
    },
    { 
      title: 'New Version Available', 
      message: 'Version 2.3.0 ready for update', 
      severity: 'info',
      time: '1 day ago'
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
          Admin Dashboard
        </Typography>
      </Fade>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid sx={{ gridColumn: { xs: 'span 12', sm: 'span 6', md: 'span 3' } }}>
          <Link to={stat.link} style={{ textDecoration: 'none' }}>
            <StyledCard>
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
            </StyledCard>
          </Link>
        </Grid>
      </Grid>

      {/* Quick Actions */}
      <Grow in={true} timeout={800}>
        <Card sx={{ mb: 4, p: 2, backgroundColor: 'background.paper' }}>
          <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
            Quick Actions
          </Typography>
          <Grid container spacing={2}>
            <Grid sx={{ gridColumn: { xs: 'span 6', sm: 'span 4', md: 'span 2.4' } }} key={index}>
              <Link to={action.link} style={{ textDecoration: 'none' }}>
                <Button 
                  variant="outlined" 
                  fullWidth 
                  sx={{ 
                    p: 2, 
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    borderColor: 'divider',
                    '&:hover': {
                      borderColor: 'primary.main',
                      backgroundColor: 'action.hover'
                    }
                  }}
                >
                  <action.icon sx={{ fontSize: 32, mb: 1, color: 'primary.main' }} />
                  <Typography variant="body2" sx={{ textAlign: 'center' }}>
                    {action.title}
                  </Typography>
                </Button>
              </Link>
            </Grid>
          </Grid>
        </Card>
      </Grow>

      {/* System Alerts */}
      <Grow in={true} timeout={1000}>
        <Card sx={{ p: 2, backgroundColor: 'background.paper' }}>
          <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
            System Alerts
          </Typography>
          <List sx={{ width: '100%' }}>
            {alerts.map((alert, index) => (
              <Grow in={true} timeout={500} key={index} style={{ transitionDelay: `${index * 100}ms` }}>
                <Paper elevation={0} sx={{ 
                  mb: 2,
                  borderLeft: `4px solid ${
                    alert.severity === 'warning' ? amber[500] : 
                    alert.severity === 'success' ? green[500] : 
                    indigo[500]
                  }`,
                  backgroundColor: 'background.default'
                }}>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar sx={{ 
                        bgcolor: alert.severity === 'warning' ? amber[100] : 
                                 alert.severity === 'success' ? green[100] : 
                                 indigo[100],
                        color: alert.severity === 'warning' ? amber[800] : 
                               alert.severity === 'success' ? green[800] : 
                               indigo[800]
                      }}>
                        {alert.severity === 'warning' ? <Warning /> : 
                         alert.severity === 'success' ? <Settings /> : 
                         <Description />}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                            {alert.title}
                          </Typography>
                          <Chip 
                            label={alert.time} 
                            size="small" 
                            sx={{ ml: 2, fontSize: '0.7rem' }} 
                          />
                        </Box>
                      }
                      secondary={alert.message}
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

export default AdminDashboard;
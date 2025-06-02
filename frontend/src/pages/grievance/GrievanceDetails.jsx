import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { 
  ArrowBack as ArrowBackIcon,
  AccessTime as ClockIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Info as InfoIcon,
  ExpandLess as ExpandLessIcon,
  Mail as MailIcon,
  Phone as PhoneIcon,
  Warning as WarningIcon,
  Description as DescriptionIcon
} from '@mui/icons-material';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Button, 
  Chip, 
  Avatar, 
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  Paper,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Badge,
  Tooltip,
  Fade,
  Grow,
  Slide
} from '@mui/material';
import { styled } from '@mui/system';

const StatusIndicator = styled('div')(({ status, theme }) => ({
  width: 12,
  height: 12,
  borderRadius: '50%',
  backgroundColor: 
    status === 'Submitted' ? theme.palette.warning.main :
    status === 'Under Review' ? theme.palette.info.main :
    status === 'Resolved' ? theme.palette.success.main :
    theme.palette.error.main,
  marginRight: theme.spacing(1)
}));

const GrievanceDetails = () => {
  const { id } = useParams();
  const [expanded, setExpanded] = useState(false);
  
  // Mock grievance data
  const grievance = {
    id: id,
    title: 'Delay in Pension Processing',
    date: '10 October 2023',
    status: 'Under Review',
    category: 'Pension',
    priority: 'High',
    description: 'My pension has been delayed for 3 months despite submitting all documents. Followed up multiple times but no resolution yet.\n\nAdditional details: Submitted all required documents on 15 July 2023. Received acknowledgment but no further updates since then.',
    documents: [
      { name: 'Pension_application.pdf', size: '2.4 MB', date: '15 Jul 2023' },
      { name: 'Bank_details.pdf', size: '1.1 MB', date: '15 Jul 2023' }
    ],
    timeline: [
      { date: '10 October 2023', status: 'Submitted', description: 'Grievance filed through Sainik Sahayak portal' },
      { date: '12 October 2023', status: 'Under Review', description: 'Assigned to pension department for verification' },
      { date: '15 October 2023', status: 'Under Review', description: 'Documents verified, processing initiated' }
    ],
    remarks: 'Your grievance is being reviewed by the pension department. Expected resolution time is 15 working days from the date of submission. You will receive an email notification once processed.',
    officer: 'Capt. R. Sharma',
    officerContact: {
      email: 'pension-helpdesk@mod.gov.in',
      phone: '011-23456789',
      hours: 'Mon-Fri, 9:00 AM to 5:00 PM'
    },
    estimatedResolution: '30 October 2023'
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Submitted': return <ClockIcon color="warning" />;
      case 'Resolved': return <CheckCircleIcon color="success" />;
      case 'Rejected': return <CancelIcon color="error" />;
      case 'Under Review': return <InfoIcon color="info" />;
      default: return <ClockIcon color="inherit" />;
    }
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Box sx={{ maxWidth: '1200px', mx: 'auto', p: 3 }}>
      <Grow in={true} timeout={500}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Button 
            startIcon={<ArrowBackIcon />} 
            variant="outlined" 
            onClick={() => window.history.back()}
            sx={{ textTransform: 'none' }}
          >
            Back
          </Button>
          <Chip
            icon={getStatusIcon(grievance.status)}
            label={grievance.status}
            sx={{ 
              px: 2,
              py: 1,
              bgcolor: 
                grievance.status === 'Submitted' ? 'warning.light' :
                grievance.status === 'Under Review' ? 'info.light' :
                grievance.status === 'Resolved' ? 'success.light' :
                'error.light',
              color: 'common.white',
              fontSize: '0.875rem'
            }}
          />
        </Box>
      </Grow>

      <Slide direction="up" in={true} timeout={800}>
        <Box>
          <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
            Grievance #{grievance.id}
          </Typography>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            {grievance.title}
          </Typography>

          <Box sx={{ mt: 4, display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
            {/* Left Column */}
            <Box sx={{ flex: 2, display: 'flex', flexDirection: 'column', gap: 3 }}>
              <Fade in={true} timeout={1000}>
                <Card elevation={3}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, display: 'flex', alignItems: 'center' }}>
                      <DescriptionIcon color="primary" sx={{ mr: 1 }} />
                      Grievance Details
                    </Typography>
                    <Divider sx={{ mb: 2 }} />

                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2, mb: 3 }}>
                      <Paper elevation={0} sx={{ p: 2, bgcolor: 'background.default', borderRadius: 2 }}>
                        <Typography variant="caption" color="text.secondary">Date Filed</Typography>
                        <Typography variant="body1" sx={{ fontWeight: 500 }}>{grievance.date}</Typography>
                      </Paper>
                      <Paper elevation={0} sx={{ p: 2, bgcolor: 'background.default', borderRadius: 2 }}>
                        <Typography variant="caption" color="text.secondary">Category</Typography>
                        <Typography variant="body1" sx={{ fontWeight: 500 }}>{grievance.category}</Typography>
                      </Paper>
                      <Paper elevation={0} sx={{ p: 2, bgcolor: 'background.default', borderRadius: 2 }}>
                        <Typography variant="caption" color="text.secondary">Priority</Typography>
                        <Typography variant="body1" sx={{ fontWeight: 500, color: grievance.priority === 'High' ? 'error.main' : 'warning.main' }}>
                          {grievance.priority}
                        </Typography>
                      </Paper>
                      <Paper elevation={0} sx={{ p: 2, bgcolor: 'background.default', borderRadius: 2 }}>
                        <Typography variant="caption" color="text.secondary">Assigned Officer</Typography>
                        <Typography variant="body1" sx={{ fontWeight: 500 }}>{grievance.officer}</Typography>
                      </Paper>
                    </Box>

                    <Button
                      onClick={handleExpandClick}
                      startIcon={<ExpandLessIcon sx={{ transform: expanded ? 'rotate(0deg)' : 'rotate(180deg)' }} />}
                      size="small"
                      sx={{ textTransform: 'none' }}
                    >
                      {expanded ? 'Hide' : 'View'} full description
                    </Button>

                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                      <Paper elevation={0} sx={{ p: 3, mt: 2, bgcolor: 'background.paper', borderRadius: 2 }}>
                        <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
                          {grievance.description}
                        </Typography>
                      </Paper>
                    </Collapse>
                  </CardContent>
                </Card>
              </Fade>

              <Fade in={true} timeout={1200}>
                <Card elevation={3}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                      Status Timeline
                    </Typography>
                    <Divider sx={{ mb: 2 }} />
                    <Stepper orientation="vertical" sx={{ pl: 0 }}>
                      {grievance.timeline.map((step, index) => (
                        <Step key={index} active>
                          <StepLabel
                            icon={
                              <Avatar sx={{ 
                                bgcolor: 
                                  step.status === 'Submitted' ? 'warning.main' :
                                  step.status === 'Under Review' ? 'info.main' :
                                  step.status === 'Resolved' ? 'success.main' :
                                  'error.main',
                                width: 24, 
                                height: 24 
                              }}>
                                {index + 1}
                              </Avatar>
                            }
                          >
                            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                              {step.status}
                            </Typography>
                          </StepLabel>
                          <StepContent>
                            <Typography variant="body2" sx={{ mb: 1 }}>
                              {step.description}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {step.date}
                            </Typography>
                          </StepContent>
                        </Step>
                      ))}
                    </Stepper>
                  </CardContent>
                </Card>
              </Fade>
            </Box>

            {/* Right Column */}
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 3 }}>
              <Fade in={true} timeout={1000}>
                <Card elevation={3}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                      Attached Documents
                    </Typography>
                    <Divider sx={{ mb: 2 }} />
                    <List dense>
                      {grievance.documents.map((doc, index) => (
                        <ListItem 
                          key={index} 
                          secondaryAction={
                            <Button size="small" color="primary">
                              View
                            </Button>
                          }
                          sx={{ 
                            bgcolor: 'background.default', 
                            mb: 1, 
                            borderRadius: 1,
                            '&:hover': { bgcolor: 'action.hover' }
                          }}
                        >
                          <ListItemIcon>
                            <DescriptionIcon color="primary" />
                          </ListItemIcon>
                          <ListItemText
                            primary={doc.name}
                            secondary={`${doc.size} • ${doc.date}`}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                </Card>
              </Fade>

              <Fade in={true} timeout={1200}>
                <Card elevation={3}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                      Officer Remarks
                    </Typography>
                    <Divider sx={{ mb: 2 }} />
                    <Paper elevation={0} sx={{ p: 2, mb: 2, bgcolor: 'background.default', borderRadius: 2 }}>
                      <Typography variant="body2" sx={{ mb: 2 }}>
                        {grievance.remarks}
                      </Typography>
                      {grievance.estimatedResolution && (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <AccessTimeIcon color="info" fontSize="small" />
                          <Typography variant="caption" color="text.secondary">
                            Estimated resolution: {grievance.estimatedResolution}
                          </Typography>
                        </Box>
                      )}
                    </Paper>

                    <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600, mt: 2 }}>
                      Contact Information
                    </Typography>
                    <List dense>
                      <ListItem sx={{ bgcolor: 'info.light', borderRadius: 1, mb: 1 }}>
                        <ListItemIcon>
                          <MailIcon color="info" />
                        </ListItemIcon>
                        <ListItemText 
                          primary={grievance.officerContact.email} 
                          secondary="Email" 
                        />
                      </ListItem>
                      <ListItem sx={{ bgcolor: 'info.light', borderRadius: 1 }}>
                        <ListItemIcon>
                          <PhoneIcon color="info" />
                        </ListItemIcon>
                        <ListItemText 
                          primary={grievance.officerContact.phone} 
                          secondary={`Phone • ${grievance.officerContact.hours}`} 
                        />
                      </ListItem>
                    </List>
                  </CardContent>
                </Card>
              </Fade>

              {grievance.status !== 'Resolved' && (
                <Fade in={true} timeout={1500}>
                  <Card elevation={3} sx={{ borderLeft: '4px solid', borderColor: 'error.main' }}>
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <WarningIcon color="error" />
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                          Escalate Grievance
                        </Typography>
                      </Box>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        If your grievance remains unresolved beyond the estimated time, you may escalate it to higher authorities.
                      </Typography>
                      <Button 
                        variant="contained" 
                        color="error" 
                        fullWidth
                        sx={{ textTransform: 'none' }}
                      >
                        Request Escalation
                      </Button>
                    </CardContent>
                  </Card>
                </Fade>
              )}
            </Box>
          </Box>
        </Box>
      </Slide>
    </Box>
  );
};

export default GrievanceDetails;
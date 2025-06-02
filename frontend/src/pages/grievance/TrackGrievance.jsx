import { useParams } from 'react-router-dom';
import { 
  ArrowBack, 
  AccessTime, 
  CheckCircle, 
  Cancel, 
  Warning, 
  ExpandMore,
  Description,
  Email,
  Person
} from '@mui/icons-material';
import { 
  Box, 
  Typography, 
  Button, 
  Card, 
  CardContent, 
  CardHeader, 
  Avatar, 
  Chip, 
  Divider, 
  List, 
  ListItem, 
  ListItemAvatar, 
  ListItemText, 
  Collapse, 
  Paper,
  IconButton,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { styled, keyframes } from '@mui/system';
import { useState } from 'react';

// Animation keyframes
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

// Styled components
const AnimatedCard = styled(Card)(({ theme }) => ({
  animation: `${fadeIn} 0.5s ease-out`,
  transition: 'transform 0.3s, box-shadow 0.3s',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[8]
  }
}));

const StatusBadge = styled(Chip)(({ theme, status }) => ({
  fontWeight: 600,
  padding: theme.spacing(1),
  backgroundColor: 
    status === 'Submitted' ? theme.palette.warning.light :
    status === 'Resolved' ? theme.palette.success.light :
    status === 'Rejected' ? theme.palette.error.light :
    theme.palette.info.light,
  color: 
    status === 'Submitted' ? theme.palette.warning.dark :
    status === 'Resolved' ? theme.palette.success.dark :
    status === 'Rejected' ? theme.palette.error.dark :
    theme.palette.info.dark
}));

const TimelineDot = styled('div')(({ theme, status }) => ({
  width: 16,
  height: 16,
  borderRadius: '50%',
  backgroundColor: 
    status === 'Submitted' ? theme.palette.warning.main :
    status === 'Under Review' ? theme.palette.info.main :
    status === 'Resolved' ? theme.palette.success.main :
    theme.palette.grey[500],
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '&::after': {
    content: '""',
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: theme.palette.common.white
  }
}));

const TrackGrievance = () => {
  const { id } = useParams();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [showDetails, setShowDetails] = useState(false);
  const [expandedCard, setExpandedCard] = useState(null);

  // Mock grievance data - enhanced with more realistic details
  const grievance = {
    id: id,
    title: 'Delay in Pension Processing',
    date: 'October 10, 2023',
    status: 'Under Review',
    category: 'Pension',
    priority: 'High',
    description: 'My pension has been delayed for 3 months despite submitting all required documents. I have followed up multiple times through various channels but have not received any concrete resolution yet. The delay is causing significant financial hardship as this is my primary source of income.',
    documents: [
      { name: 'Pension_application.pdf', size: '2.4 MB', date: 'Oct 5, 2023' },
      { name: 'Bank_details.pdf', size: '1.2 MB', date: 'Oct 8, 2023' },
      { name: 'ID_Proof.pdf', size: '3.1 MB', date: 'Oct 10, 2023' }
    ],
    timeline: [
      { 
        date: 'October 10, 2023', 
        time: '10:30 AM',
        status: 'Submitted', 
        description: 'Grievance successfully filed through the online portal',
        officer: 'System Automated'
      },
      { 
        date: 'October 12, 2023', 
        time: '2:15 PM',
        status: 'Under Review', 
        description: 'Assigned to pension department for verification and processing',
        officer: 'Capt. R. Sharma'
      },
      { 
        date: 'October 15, 2023', 
        time: '11:00 AM',
        status: 'Under Review', 
        description: 'Additional documents requested for verification',
        officer: 'Lt. S. Patel'
      }
    ],
    remarks: 'Your grievance is currently being reviewed by the pension department. The expected resolution time is 15 working days from the date of submission. We appreciate your patience during this process. For any urgent queries, please contact the helpdesk using the information provided.',
    officer: {
      name: 'Capt. Rajesh Sharma',
      department: 'Pension Verification Department',
      contact: 'pension-helpdesk@mod.gov.in',
      phone: '+91 9876543210',
      avatar: '/assets/avatars/officer-avatar.jpg'
    },
    expectedResolution: 'November 5, 2023',
    escalationLevel: 'Level 1 (Departmental)'
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Submitted':
        return <AccessTime color="warning" />;
      case 'Resolved':
        return <CheckCircle color="success" />;
      case 'Rejected':
        return <Cancel color="error" />;
      case 'Under Review':
        return <Warning color="info" />;
      default:
        return <AccessTime color="disabled" />;
    }
  };

  const handleCardExpand = (cardId) => {
    setExpandedCard(expandedCard === cardId ? null : cardId);
  };

  return (
    <Box sx={{ 
      maxWidth: 1200, 
      mx: 'auto', 
      py: 4, 
      px: isMobile ? 2 : 4,
      animation: `${fadeIn} 0.6s ease-out`
    }}>
      {/* Header Section */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        mb: 4,
        flexDirection: isMobile ? 'column' : 'row',
        gap: isMobile ? 2 : 0
      }}>
        <Button 
          startIcon={<ArrowBack />}
          onClick={() => window.history.back()}
          variant="outlined"
          sx={{
            borderRadius: 2,
            px: 3,
            py: 1,
            textTransform: 'none',
            alignSelf: isMobile ? 'flex-start' : 'center'
          }}
        >
          Back to Dashboard
        </Button>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography variant="h4" component="h1" sx={{ 
            fontWeight: 700,
            background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textAlign: isMobile ? 'center' : 'left'
          }}>
            Grievance #{grievance.id}
          </Typography>
          <StatusBadge
            icon={getStatusIcon(grievance.status)}
            label={grievance.status}
            status={grievance.status}
            sx={{ ml: isMobile ? 0 : 2 }}
          />
        </Box>
      </Box>
      
      <Typography variant="h6" sx={{ 
        mb: 4, 
        color: 'text.secondary',
        fontStyle: 'italic',
        textAlign: isMobile ? 'center' : 'left'
      }}>
        "{grievance.title}"
      </Typography>
      
      {/* Main Content Grid */}
      <Box sx={{ 
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '2fr 1fr',
        gap: 4
      }}>
        {/* Left Column */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {/* Grievance Details Card */}
          <AnimatedCard elevation={3}>
            <CardHeader
              title="Grievance Details"
              titleTypographyProps={{ variant: 'h5', fontWeight: 600 }}
              sx={{ pb: 1 }}
            />
            <CardContent>
              <Box sx={{ 
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                gap: 3,
                mb: 3
              }}>
                <DetailItem 
                  label="Date Filed"
                  value={grievance.date}
                  icon={<AccessTime color="primary" />}
                />
                <DetailItem 
                  label="Category"
                  value={grievance.category}
                  icon={<Description color="primary" />}
                />
                <DetailItem 
                  label="Priority"
                  value={
                    <Chip 
                      label={grievance.priority} 
                      color={
                        grievance.priority === 'High' ? 'error' : 
                        grievance.priority === 'Medium' ? 'warning' : 'success'
                      }
                      size="small"
                    />
                  }
                />
                <DetailItem 
                  label="Expected Resolution"
                  value={grievance.expectedResolution}
                />
              </Box>
              
              <Divider sx={{ my: 2 }} />
              
              <Box>
                <Box 
                  sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    cursor: 'pointer',
                    '&:hover': { backgroundColor: theme.palette.action.hover }
                  }}
                  onClick={() => handleCardExpand('description')}
                >
                  <Typography variant="subtitle1" fontWeight={600}>
                    Full Description
                  </Typography>
                  <IconButton size="small">
                    <ExpandMore 
                      sx={{ 
                        transform: expandedCard === 'description' ? 'rotate(180deg)' : 'rotate(0)',
                        transition: 'transform 0.3s'
                      }} 
                    />
                  </IconButton>
                </Box>
                
                <Collapse in={expandedCard === 'description'}>
                  <Paper elevation={0} sx={{ 
                    p: 3, 
                    mt: 2, 
                    backgroundColor: theme.palette.grey[50],
                    borderRadius: 2
                  }}>
                    <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
                      {grievance.description}
                    </Typography>
                  </Paper>
                </Collapse>
              </Box>
            </CardContent>
          </AnimatedCard>
          
          {/* Timeline Card */}
          <AnimatedCard elevation={3}>
            <CardHeader
              title="Status Timeline"
              titleTypographyProps={{ variant: 'h5', fontWeight: 600 }}
              sx={{ pb: 1 }}
            />
            <CardContent>
              <List sx={{ width: '100%' }}>
                {grievance.timeline.map((item, index) => (
                  <Box key={index}>
                    <ListItem alignItems="flex-start" sx={{ px: 0 }}>
                      <ListItemAvatar sx={{ minWidth: 48 }}>
                        <Box sx={{ 
                          display: 'flex', 
                          flexDirection: 'column', 
                          alignItems: 'center',
                          position: 'relative'
                        }}>
                          <TimelineDot status={item.status} />
                          {index < grievance.timeline.length - 1 && (
                            <Box sx={{ 
                              width: 2, 
                              height: 40, 
                              backgroundColor: theme.palette.grey[300],
                              my: 0.5
                            }} />
                          )}
                        </Box>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                            <Typography variant="subtitle1" fontWeight={600}>
                              {item.status}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {item.date} • {item.time}
                            </Typography>
                          </Box>
                        }
                        secondary={
                          <>
                            <Typography variant="body2" color="text.primary" sx={{ mt: 0.5 }}>
                              {item.description}
                            </Typography>
                            {item.officer && (
                              <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
                                Handled by: {item.officer}
                              </Typography>
                            )}
                          </>
                        }
                        sx={{ my: 0 }}
                      />
                    </ListItem>
                    {index < grievance.timeline.length - 1 && (
                      <Divider variant="inset" component="li" sx={{ ml: 6 }} />
                    )}
                  </Box>
                ))}
              </List>
            </CardContent>
          </AnimatedCard>
        </Box>
        
        {/* Right Column */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {/* Documents Card */}
          <AnimatedCard elevation={3}>
            <CardHeader
              title="Attached Documents"
              titleTypographyProps={{ variant: 'h5', fontWeight: 600 }}
              sx={{ pb: 1 }}
            />
            <CardContent>
              <List sx={{ width: '100%' }}>
                {grievance.documents.map((doc, index) => (
                  <ListItem 
                    key={index} 
                    sx={{ 
                      px: 0,
                      '&:hover': { 
                        backgroundColor: theme.palette.action.hover,
                        borderRadius: 1
                      }
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: theme.palette.grey[200] }}>
                        <Description color="action" />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={doc.name}
                      secondary={`${doc.size} • ${doc.date}`}
                    />
                    <Button 
                      size="small" 
                      variant="text" 
                      color="primary"
                      sx={{ textTransform: 'none' }}
                    >
                      View
                    </Button>
                  </ListItem>
                ))}
              </List>
              <Button 
                fullWidth 
                variant="outlined" 
                sx={{ mt: 2, textTransform: 'none' }}
              >
                Upload Additional Documents
              </Button>
            </CardContent>
          </AnimatedCard>
          
          {/* Officer Card */}
          <AnimatedCard elevation={3}>
            <CardHeader
              title="Assigned Officer"
              titleTypographyProps={{ variant: 'h5', fontWeight: 600 }}
              sx={{ pb: 1 }}
            />
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Avatar 
                  src={grievance.officer.avatar} 
                  sx={{ width: 56, height: 56, mr: 2 }}
                />
                <Box>
                  <Typography variant="h6">{grievance.officer.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {grievance.officer.department}
                  </Typography>
                </Box>
              </Box>
              
              <Divider sx={{ my: 2 }} />
              
              <DetailItem 
                label="Email"
                value={grievance.officer.contact}
                icon={<Email color="primary" />}
              />
              
              <DetailItem 
                label="Phone"
                value={grievance.officer.phone}
                sx={{ mt: 1.5 }}
              />
              
              <Button 
                fullWidth 
                variant="contained" 
                sx={{ mt: 3, textTransform: 'none' }}
                startIcon={<Email />}
              >
                Contact Officer
              </Button>
            </CardContent>
          </AnimatedCard>
          
          {/* Remarks Card */}
          <AnimatedCard elevation={3}>
            <CardHeader
              title="Latest Remarks"
              titleTypographyProps={{ variant: 'h5', fontWeight: 600 }}
              sx={{ pb: 1 }}
            />
            <CardContent>
              <Paper elevation={0} sx={{ 
                p: 2, 
                mb: 2, 
                backgroundColor: theme.palette.info.light,
                borderLeft: `4px solid ${theme.palette.info.main}`,
                borderRadius: 1
              }}>
                <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
                  {grievance.remarks}
                </Typography>
              </Paper>
              
              <Typography variant="caption" color="text.secondary">
                Last updated: {grievance.timeline[grievance.timeline.length - 1].date}
              </Typography>
            </CardContent>
          </AnimatedCard>
          
          {/* Escalation Card */}
          {grievance.status !== 'Resolved' && (
            <AnimatedCard 
              elevation={3}
              sx={{ 
                borderLeft: `4px solid ${theme.palette.error.main}`,
                animation: `${pulse} 2s infinite`,
                '&:hover': {
                  animation: 'none'
                }
              }}
            >
              <CardHeader
                title="Need Faster Resolution?"
                titleTypographyProps={{ 
                  variant: 'h5', 
                  fontWeight: 600,
                  color: 'error.dark'
                }}
                sx={{ pb: 1 }}
              />
              <CardContent>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  If your grievance is not resolved within the expected time frame or you're 
                  unsatisfied with the progress, you may escalate it to higher authorities.
                </Typography>
                
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 2 }}>
                  Current escalation level: {grievance.escalationLevel}
                </Typography>
                
                <Button 
                  fullWidth 
                  variant="contained" 
                  color="error"
                  sx={{ 
                    textTransform: 'none',
                    fontWeight: 600
                  }}
                >
                  Escalate Grievance
                </Button>
              </CardContent>
            </AnimatedCard>
          )}
        </Box>
      </Box>
    </Box>
  );
};

// Reusable Detail Item Component
const DetailItem = ({ label, value, icon, sx }) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, ...sx }}>
      {icon && React.cloneElement(icon, { fontSize: 'small' })}
      <Box>
        <Typography variant="caption" color="text.secondary">
          {label}
        </Typography>
        <Typography variant="body1">
          {value}
        </Typography>
      </Box>
    </Box>
  );
};

export default TrackGrievance;
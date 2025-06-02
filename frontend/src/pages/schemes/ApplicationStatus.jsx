import { useParams } from 'react-router-dom';
import { ArrowBack, Schedule, CheckCircle, Cancel, Info } from '@mui/icons-material';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Divider,
  Chip,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  LinearProgress,
  Paper,
  IconButton,
  Tooltip
} from '@mui/material';
import { styled, keyframes } from '@mui/system';
import { motion } from 'framer-motion';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: '12px',
  boxShadow: '0 8px 32px rgba(31, 38, 135, 0.1)',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 12px 40px rgba(31, 38, 135, 0.15)'
  },
  animation: `${fadeIn} 0.6s ease-out`
}));

const StatusIndicator = styled('div')(({ status, theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0.5, 1.5),
  borderRadius: '20px',
  backgroundColor:
    status === 'Submitted' ? theme.palette.warning.light :
    status === 'Approved' ? theme.palette.success.light :
    status === 'Rejected' ? theme.palette.error.light :
    theme.palette.info.light,
  color:
    status === 'Submitted' ? theme.palette.warning.dark :
    status === 'Approved' ? theme.palette.success.dark :
    status === 'Rejected' ? theme.palette.error.dark :
    theme.palette.info.dark,
  fontWeight: 600
}));

const TimelineConnector = styled('div')(({ theme }) => ({
  width: '2px',
  backgroundColor: theme.palette.divider,
  flexGrow: 1,
  margin: theme.spacing(0.5, 0)
}));

const DocumentItem = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1.5),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  borderRadius: '8px',
  transition: 'all 0.2s ease',
  '&:hover': {
    backgroundColor: theme.palette.action.hover
  }
}));

const ApplicationStatus = () => {
  const { id } = useParams();
  
  // Mock application data
  const application = {
    id: id,
    scheme: 'Education Grant for Children',
    date: '2023-10-15',
    status: 'Under Review',
    progress: 65,
    documents: [
      { name: 'Service_certificate.pdf', size: '2.4 MB' },
      { name: 'Birth_certificate.pdf', size: '1.8 MB' },
      { name: 'Admission_proof.pdf', size: '3.2 MB' }
    ],
    timeline: [
      { date: '2023-10-15', status: 'Submitted', description: 'Application submitted' },
      { date: '2023-10-18', status: 'Under Review', description: 'Application is being reviewed by officials' },
      { date: '2023-10-22', status: 'In Progress', description: 'Documents verification completed' }
    ],
    remarks: 'Your application is currently being processed. Expected completion time is 7-10 working days. Our team is working diligently to review your documents and will notify you once the process is complete.'
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Submitted':
        return <Schedule fontSize="small" />;
      case 'Approved':
        return <CheckCircle fontSize="small" />;
      case 'Rejected':
        return <Cancel fontSize="small" />;
      case 'Under Review':
      case 'In Progress':
        return <Info fontSize="small" />;
      default:
        return <Schedule fontSize="small" />;
    }
  };

  return (
    <Box sx={{ maxWidth: '1200px', mx: 'auto', p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Button
          startIcon={<ArrowBack />}
          onClick={() => window.history.back()}
          variant="outlined"
          sx={{ borderRadius: '8px' }}
        >
          Back
        </Button>
        
        <StatusIndicator status={application.status}>
          {getStatusIcon(application.status)}
          <Box component="span" sx={{ ml: 1 }}>{application.status}</Box>
        </StatusIndicator>
      </Box>
      
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 700, mb: 1 }}>
          Application #{application.id}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 4 }}>
          {application.scheme}
        </Typography>
      </motion.div>
      
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
        {/* Left Column */}
        <Box sx={{ flex: 2, display: 'flex', flexDirection: 'column', gap: 3 }}>
          {/* Application Details */}
          <motion.div whileHover={{ y: -2 }}>
            <StyledCard>
              <CardContent>
                <Typography variant="h6" component="h2" sx={{ fontWeight: 600, mb: 2 }}>
                  Application Details
                </Typography>
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 3 }}>
                  <Box>
                    <Typography variant="body2" color="text.secondary">Application Date</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>{application.date}</Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary">Current Status</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>{application.status}</Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary">Processing Progress</Typography>
                    <LinearProgress 
                      variant="determinate" 
                      value={application.progress} 
                      sx={{ height: 8, borderRadius: 4, mt: 1 }}
                      color={
                        application.progress < 30 ? 'error' :
                        application.progress < 70 ? 'warning' : 'success'
                      }
                    />
                    <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5 }}>
                      {application.progress}% complete
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </StyledCard>
          </motion.div>
          
          {/* Timeline */}
          <motion.div whileHover={{ y: -2 }}>
            <StyledCard>
              <CardContent>
                <Typography variant="h6" component="h2" sx={{ fontWeight: 600, mb: 2 }}>
                  Status Timeline
                </Typography>
                <List sx={{ p: 0 }}>
                  {application.timeline.map((item, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <ListItem sx={{ px: 0, py: 1.5 }}>
                        <ListItemAvatar sx={{ minWidth: 40 }}>
                          <Avatar sx={{ 
                            bgcolor: 
                              item.status === 'Submitted' ? 'warning.light' :
                              item.status === 'Under Review' ? 'info.light' :
                              item.status === 'In Progress' ? 'primary.light' :
                              'grey.300',
                            color: 
                              item.status === 'Submitted' ? 'warning.contrastText' :
                              item.status === 'Under Review' ? 'info.contrastText' :
                              item.status === 'In Progress' ? 'primary.contrastText' :
                              'grey.800',
                            width: 32, 
                            height: 32 
                          }}>
                            {getStatusIcon(item.status)}
                          </Avatar>
                          {index < application.timeline.length - 1 && (
                            <TimelineConnector />
                          )}
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                              {item.status}
                            </Typography>
                          }
                          secondary={
                            <>
                              <Typography variant="body2" color="text.secondary">
                                {item.description}
                              </Typography>
                              <Typography variant="caption" color="text.disabled">
                                {item.date}
                              </Typography>
                            </>
                          }
                        />
                      </ListItem>
                      {index < application.timeline.length - 1 && <Divider variant="inset" component="li" />}
                    </motion.div>
                  ))}
                </List>
              </CardContent>
            </StyledCard>
          </motion.div>
        </Box>
        
        {/* Right Column */}
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 3 }}>
          {/* Documents */}
          <motion.div whileHover={{ y: -2 }}>
            <StyledCard>
              <CardContent>
                <Typography variant="h6" component="h2" sx={{ fontWeight: 600, mb: 2 }}>
                  Submitted Documents
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                  {application.documents.map((doc, index) => (
                    <motion.div 
                      key={index}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <DocumentItem elevation={0}>
                        <Box sx={{ overflow: 'hidden' }}>
                          <Typography variant="body2" noWrap sx={{ fontWeight: 500 }}>
                            {doc.name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {doc.size}
                          </Typography>
                        </Box>
                        <Tooltip title="View document">
                          <IconButton size="small" color="primary">
                            <Box component="span" className="material-icons-outlined" sx={{ fontSize: 20 }}>
                              visibility
                            </Box>
                          </IconButton>
                        </Tooltip>
                      </DocumentItem>
                    </motion.div>
                  ))}
                </Box>
              </CardContent>
            </StyledCard>
          </motion.div>
          
          {/* Remarks */}
          <motion.div whileHover={{ y: -2 }}>
            <StyledCard>
              <CardContent>
                <Typography variant="h6" component="h2" sx={{ fontWeight: 600, mb: 2 }}>
                  Remarks
                </Typography>
                <Paper 
                  elevation={0} 
                  sx={{ 
                    p: 2, 
                    bgcolor: 'background.default', 
                    borderRadius: '8px',
                    borderLeft: '4px solid',
                    borderColor: 'primary.main'
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    {application.remarks}
                  </Typography>
                </Paper>
              </CardContent>
            </StyledCard>
          </motion.div>
        </Box>
      </Box>
    </Box>
  );
};

export default ApplicationStatus;
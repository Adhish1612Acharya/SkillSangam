import { useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Divider,
  Paper,
  IconButton,
  Container
} from '@mui/material';
import { LocationOn, ArrowBack } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const MapContainer = styled(Paper)(({ theme }) => ({
  height: 400,
  width: '100%',
  borderRadius: theme.shape.borderRadius,
  overflow: 'hidden',
  position: 'relative',
  backgroundColor: theme.palette.grey[200],
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: theme.spacing(3)
}));

const Location = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const location = state?.location || 'Location not specified';

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <IconButton onClick={() => navigate(-1)} sx={{ mr: 2 }}>
              <ArrowBack />
            </IconButton>
            <Typography variant="h5" component="h1" sx={{ fontWeight: 'bold' }}>
              Item Location
            </Typography>
          </Box>
          
          <Divider sx={{ mb: 3 }} />
          
          <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
            <LocationOn color="primary" sx={{ mr: 1 }} />
            {location}
          </Typography>
          
          <MapContainer elevation={3}>
            {/* In a real app, you would embed a map component here */}
            <Box textAlign="center">
              <LocationOn color="primary" sx={{ fontSize: 60 }} />
              <Typography variant="body1" color="text.secondary">
                Map would display here
              </Typography>
              <Typography variant="caption" color="text.secondary">
                (Location: {location})
              </Typography>
            </Box>
          </MapContainer>
          
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            This is the approximate location of the item. Exact address will be shared after purchase confirmation.
          </Typography>
          
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant="contained"
              onClick={() => navigate(-1)}
              sx={{ px: 4 }}
            >
              Back to Item
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Location;
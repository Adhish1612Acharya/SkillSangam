import { Link } from 'react-router-dom';
import { 
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Avatar,
  Fade,
  useTheme
} from '@mui/material';
import { Warning, ArrowBack } from '@mui/icons-material';

const NotFound = () => {
  const theme = useTheme();

  return (
    <Fade in={true} timeout={1000}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          backgroundColor: theme.palette.background.default,
          p: 3
        }}
      >
        <Card
          sx={{
            maxWidth: 500,
            width: '100%',
            textAlign: 'center',
            p: 4,
            borderRadius: 3,
            boxShadow: theme.shadows[10],
            borderLeft: `6px solid ${theme.palette.error.main}`
          }}
        >
          <CardContent>
            <Avatar
              sx={{
                width: 80,
                height: 80,
                bgcolor: theme.palette.error.light,
                margin: '0 auto 20px',
                '& svg': {
                  fontSize: '2.5rem',
                  color: theme.palette.error.main
                }
              }}
            >
              <Warning fontSize="inherit" />
            </Avatar>
            <Typography
              variant="h3"
              component="h1"
              gutterBottom
              sx={{
                fontWeight: 700,
                color: theme.palette.text.primary,
                mb: 2
              }}
            >
              404 - Page Not Found
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{
                fontSize: '1.1rem',
                mb: 3
              }}
            >
              The page you're looking for doesn't exist or has been moved to another location.
            </Typography>
            <Button
              component={Link}
              to="/"
              variant="contained"
              color="primary"
              size="large"
              startIcon={<ArrowBack />}
              sx={{
                px: 4,
                py: 1.5,
                borderRadius: 2,
                fontWeight: 'medium',
                textTransform: 'none',
                boxShadow: theme.shadows[2],
                '&:hover': {
                  boxShadow: theme.shadows[4],
                }
              }}
            >
              Return to Homepage
            </Button>
          </CardContent>
        </Card>
      </Box>
    </Fade>
  );
};

export default NotFound;
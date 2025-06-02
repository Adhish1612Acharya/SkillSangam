import { Link } from 'react-router-dom';
import { Shield, Star, Description, Business, Add } from '@mui/icons-material';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  Avatar,
  Button,
  IconButton,
  Paper,
  Divider,
  Grid
} from '@mui/material';
import { styled, keyframes } from '@mui/system';
import { motion } from 'framer-motion';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const SchemeCard = styled(Card)(({ theme }) => ({
  borderRadius: '12px',
  boxShadow: '0 8px 32px rgba(31, 38, 135, 0.05)',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 12px 40px rgba(31, 38, 135, 0.15)'
  },
  animation: `${fadeIn} 0.6s ease-out`
}));

const PartnerCard = styled(Paper)(({ theme }) => ({
  borderRadius: '12px',
  padding: theme.spacing(3),
  background: 'linear-gradient(135deg, rgba(66,165,245,0.1) 0%, rgba(21,101,192,0.1) 100%)',
  border: '1px solid rgba(66,165,245,0.2)',
  position: 'relative',
  overflow: 'hidden',
  '&:before': {
    content: '""',
    position: 'absolute',
    top: -50,
    right: -50,
    width: 100,
    height: 100,
    borderRadius: '50%',
    background: 'radial-gradient(rgba(66,165,245,0.2) 0%, transparent 70%)'
  }
}));

const PrivateSchemes = () => {
  const privateSchemes = [
    {
      id: 1,
      title: 'Veteran Healthcare Plan',
      description: 'Exclusive healthcare coverage for retired personnel with premium benefits and cashless treatment across 5000+ hospitals nationwide.',
      eligibility: 'Retired personnel with 20+ years service',
      sponsor: 'ABC Insurance Co.',
      rating: 4.8,
      featured: true
    },
    {
      id: 2,
      title: 'Defense Housing Loan',
      description: 'Special home loan rates starting from 6.5% p.a. for defense personnel with flexible repayment options and zero processing fees.',
      eligibility: 'All serving and retired personnel',
      sponsor: 'XYZ Bank',
      rating: 4.5
    },
    {
      id: 3,
      title: 'Education Scholarship',
      description: 'Merit-based scholarships up to ₹2 lakhs per annum for children of defense personnel pursuing higher education.',
      eligibility: 'Children of serving/retired personnel with 80%+ marks',
      sponsor: 'PQR Foundation',
      rating: 4.7,
      featured: true
    },
    {
      id: 4,
      title: 'Heroes Vehicle Scheme',
      description: 'Exclusive discounts on two-wheelers and four-wheelers from leading manufacturers with easy EMI options.',
      eligibility: 'All serving and retired personnel',
      sponsor: 'AutoHero Corp',
      rating: 4.3
    }
  ];

  return (
    <Box sx={{ maxWidth: '1200px', mx: 'auto', p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
        <Avatar sx={{ bgcolor: 'primary.main', width: 56, height: 56 }}>
          <Shield sx={{ fontSize: 32 }} />
        </Avatar>
        <Box>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
            Private Partner Schemes
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Exclusive benefits offered by our trusted partners for defense personnel and families
          </Typography>
        </Box>
      </Box>
      
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {privateSchemes.map((scheme, index) => (
          <Grid item xs={12} sm={6} key={scheme.id}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <SchemeCard sx={{ 
                border: scheme.featured ? '2px solid' : 'none',
                borderColor: scheme.featured ? 'primary.main' : 'transparent'
              }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Typography variant="h6" component="h2" sx={{ fontWeight: 700 }}>
                      {scheme.title}
                    </Typography>
                    {scheme.featured && (
                      <Chip 
                        label="Featured" 
                        size="small" 
                        color="primary" 
                        sx={{ fontWeight: 600 }}
                      />
                    )}
                  </Box>
                  
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {scheme.description}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <Business fontSize="small" color="action" />
                    <Typography variant="caption" color="text.secondary">
                      Partner: {scheme.sponsor}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                    <Star fontSize="small" sx={{ color: 'warning.main' }} />
                    <Typography variant="caption" sx={{ fontWeight: 500 }}>
                      {scheme.rating} • {scheme.eligibility}
                    </Typography>
                  </Box>
                  
                  <Divider sx={{ my: 1 }} />
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pt: 1 }}>
                    <Button
                      component={Link}
                      to={`/schemes/apply/${scheme.id}`}
                      variant="contained"
                      size="small"
                      sx={{ borderRadius: '8px' }}
                    >
                      Apply Now
                    </Button>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <IconButton size="small">
                        <Star fontSize="small" sx={{ color: 'text.disabled' }} />
                      </IconButton>
                      <Typography variant="caption" color="text.secondary">
                        Save
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </SchemeCard>
            </motion.div>
          </Grid>
        ))}
      </Grid>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        whileHover={{ scale: 1.01 }}
      >
        <PartnerCard elevation={0}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={8}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <Avatar sx={{ bgcolor: 'primary.main', width: 48, height: 48 }}>
                  <Add sx={{ fontSize: 24 }} />
                </Avatar>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  Partner With Us
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ mb: 2 }}>
                Are you an organization looking to support our defense personnel? Partner with us to offer 
                exclusive benefits and services to our heroes and their families.
              </Typography>
              <Button 
                variant="outlined" 
                color="primary" 
                startIcon={<Description />}
                sx={{ borderRadius: '8px' }}
              >
                Learn about partnership
              </Button>
            </Grid>
            <Grid item xs={12} md={4} sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
              <Avatar sx={{ 
                bgcolor: 'background.paper', 
                width: 120, 
                height: 120,
                boxShadow: '0 8px 24px rgba(0,0,0,0.1)'
              }}>
                <Business sx={{ fontSize: 48, color: 'primary.main' }} />
              </Avatar>
            </Grid>
          </Grid>
        </PartnerCard>
      </motion.div>
    </Box>
  );
};

export default PrivateSchemes;
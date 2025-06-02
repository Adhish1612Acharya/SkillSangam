import { Box, Container, Grid, Typography, Link as MuiLink } from '@mui/material';
import { styled } from '@mui/material/styles';

const FooterBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.dark,
  color: theme.palette.common.white,
  padding: theme.spacing(4, 0),
  marginTop: 'auto',
}));

const FooterLink = styled(MuiLink)(({ theme }) => ({
  color: theme.palette.grey[300],
  marginRight: theme.spacing(3),
  '&:hover': {
    color: theme.palette.secondary.light,
    textDecoration: 'none',
  },
}));

const Footer = () => {
  return (
    <FooterBox component="footer">
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid sx={{ gridColumn: { xs: 'span 12', md: 'span 6' } }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 700 }}>
              Sainik Sahayak
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Supporting our armed forces and their families
            </Typography>
          </Grid>
          <Grid sx={{ gridColumn: { xs: 'span 12', md: 'span 6' }, textAlign: { xs: 'left', md: 'right' } }}>
            <Box>
              <FooterLink href="#" variant="body2">Privacy Policy</FooterLink>
              <FooterLink href="#" variant="body2">Terms of Service</FooterLink>
              <FooterLink href="#" variant="body2">Contact Us</FooterLink>
            </Box>
          </Grid>
          <Grid sx={{ gridColumn: 'span 12' }}>
            <Box 
              sx={{ 
                borderTop: `1px solid ${theme => theme.palette.divider}`,
                pt: 3,
                textAlign: 'center'
              }}
            >
              <Typography variant="body2" color="text.secondary">
                © {new Date().getFullYear()} Sainik Sahayak. All rights reserved.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </FooterBox>
  );
};

export default Footer;
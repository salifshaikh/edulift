import React from 'react';
import Navbar from './Navbar';
import { Container, Typography, Card, CardContent, CardActions, Button, Grid, CssBaseline, Box } from '@mui/material';


function Layout({ user, children }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <CssBaseline />
      <Navbar user={user} />
      <Container component="main" sx={{ mt: 4, mb: 4, flexGrow: 1 }}>
        {children}
      </Container>
      <Box component="footer" sx={{ py: 3, px: 2, mt: 'auto', backgroundColor: (theme) => theme.palette.grey[200] }}>
        <Container maxWidth="sm">
          <Typography variant="body2" color="text.secondary" align="center">
            © {new Date().getFullYear()} EduLift. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}

export default Layout;
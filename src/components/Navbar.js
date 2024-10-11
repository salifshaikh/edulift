import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { getAuth, signOut } from "firebase/auth";

function Navbar({ user }) {
  const auth = getAuth();

  const handleLogout = () => {
    signOut(auth);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component={Link} to="/" sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}>
          EduLift
        </Typography>
        <Box>
          {user ? (
            <>
              <Button color="inherit" component={Link} to="/courses">Courses</Button>
              <Button color="inherit" component={Link} to="/resources">Resources</Button>
              <Button color="inherit" component={Link} to="/scholarships">Scholarships</Button>
              <Button color="inherit" onClick={handleLogout}>Logout</Button>
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/login">Login</Button>
              <Button color="inherit" component={Link} to="/signup">Sign Up</Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
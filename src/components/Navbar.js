import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { getAuth, signOut } from "firebase/auth";
import { AppBar, Toolbar, Typography, Button, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  link: {
    color: 'white',
    textDecoration: 'none',
  },
}));

function Navbar({ user }) {
  const classes = useStyles();
  const auth = getAuth();

  const handleLogout = () => {
    signOut(auth);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <RouterLink to="/" className={classes.link}>
              EduLift
            </RouterLink>
          </Typography>
          <Button color="inherit" component={RouterLink} to="/courses">
            Courses
          </Button>
          {user ? (
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <>
              <Button color="inherit" component={RouterLink} to="/login">
                Login
              </Button>
              <Button color="inherit" component={RouterLink} to="/signup">
                Sign Up
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar;
import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Button, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
}));

function Home() {
  const classes = useStyles();

  return (
    <div className={classes.heroContent}>
      <Container maxWidth="sm">
        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
          Welcome to EduLift
        </Typography>
        <Typography variant="h5" align="center" color="textSecondary" paragraph>
          Elevate your learning experience with our cutting-edge courses. Discover a world of knowledge and unlock your potential today.
        </Typography>
        <div className={classes.heroButtons}>
          <Grid container spacing={2} justifyContent="center">
            <Grid item>
              <Button variant="contained" color="primary" component={Link} to="/courses">
                Explore Courses
              </Button>
            </Grid>
            <Grid item>
              <Button variant="outlined" color="primary" component={Link} to="/signup">
                Sign Up
              </Button>
            </Grid>
          </Grid>
        </div>
      </Container>
    </div>
  );
}

export default Home;
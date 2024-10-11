import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Button, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';

const HeroSection = styled('div')({
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  overflow: 'hidden',
});

const BackgroundVideo = styled('video')({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  zIndex: -1,
  opacity: 0.7,
});

const useStyles = styled((theme) => ({
  heroButtons: {
    marginTop: theme.spacing(4),
  },
}));

function Home() {
  const classes = useStyles();

  return (
    <HeroSection>
      <BackgroundVideo autoPlay muted loop>
        <source src="/path-to-your-video.mp4" type="video/mp4" />
      </BackgroundVideo>
      <Container maxWidth="sm">
        <Typography 
          component="h1" 
          variant="h2" 
          align="center" 
          color="textPrimary" 
          gutterBottom 
          className="animate__animated animate__fadeInDown"
        >
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
    </HeroSection>
  );
}

export default Home;

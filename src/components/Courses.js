import React, { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { Container, Grid, Card, CardContent, CardMedia, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  enrollButton: {
    marginTop: theme.spacing(1),
  },
}));

function Courses() {
  const [courses, setCourses] = useState([]);
  const db = getFirestore();
  const classes = useStyles();

  useEffect(() => {
    const fetchCourses = async () => {
      const coursesCollection = collection(db, 'courses');
      const coursesSnapshot = await getDocs(coursesCollection);
      const coursesList = coursesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCourses(coursesList);
    };

    fetchCourses();
  }, [db]);

  return (
    <Container className={classes.cardGrid} maxWidth="md">
      <Typography variant="h4" align="center" color="textPrimary" gutterBottom>
        Available Courses
      </Typography>
      <Grid container spacing={4}>
        {courses.map((course) => (
          <Grid item key={course.id} xs={12} sm={6} md={4}>
            <Card className={classes.card}>
              <CardMedia
                className={classes.cardMedia}
                image={course.imageUrl || "https://source.unsplash.com/random"}
                title={course.title}
              />
              <CardContent className={classes.cardContent}>
                <Typography gutterBottom variant="h5" component="h2">
                  {course.title}
                </Typography>
                <Typography>
                  {course.description}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.enrollButton}
                >
                  Enroll Now
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Courses;
import React from 'react';
import { Container, Typography, Card, CardContent, CardActions, Button, Grid } from '@mui/material';

const scholarships = [
  { id: 1, title: 'STEM Excellence Scholarship', deadline: '2023-12-31', amount: '$5000' },
  { id: 2, title: 'Future Leaders Grant', deadline: '2023-11-30', amount: '$3000' },
  { id: 3, title: 'Digital Innovation Award', deadline: '2024-01-15', amount: '$4000' },
];

function Scholarships() {
  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Available Scholarships
      </Typography>
      <Grid container spacing={4}>
        {scholarships.map((scholarship) => (
          <Grid item xs={12} sm={6} md={4} key={scholarship.id}>
            <Card>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {scholarship.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Deadline: {scholarship.deadline}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Amount: {scholarship.amount}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Learn More</Button>
                <Button size="small">Apply</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Scholarships;
import React, { useState } from 'react';
import { Container, Typography, List, ListItem, ListItemText, Button, TextField, Box } from '@mui/material';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

function Resources() {
  const [resources, setResources] = useState([
    { id: 1, name: 'React Cheat Sheet.pdf' },
    { id: 2, name: 'JavaScript ES6 Guide.docx' },
    { id: 3, name: 'Python Best Practices.pdf' },
  ]);
  const [newResourceName, setNewResourceName] = useState('');

  const handleUpload = () => {
    if (newResourceName) {
      const newResource = {
        id: resources.length + 1,
        name: newResourceName,
      };
      setResources([...resources, newResource]);
      setNewResourceName('');
    }
  };

  const handleDownload = (resourceName) => {
    // In a real application, this would trigger a file download
    console.log(`Downloading ${resourceName}`);
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Resources
      </Typography>
      <Box sx={{ mb: 4 }}>
        <TextField
          label="New Resource Name"
          variant="outlined"
          value={newResourceName}
          onChange={(e) => setNewResourceName(e.target.value)}
          sx={{ mr: 2 }}
        />
        <Button
          variant="contained"
          startIcon={<FileUploadIcon />}
          onClick={handleUpload}
        >
          Upload
        </Button>
      </Box>
      <List>
        {resources.map((resource) => (
          <ListItem key={resource.id} divider>
            <ListItemText primary={resource.name} />
            <Button
              variant="outlined"
              startIcon={<FileDownloadIcon />}
              onClick={() => handleDownload(resource.name)}
            >
              Download
            </Button>
          </ListItem>
        ))}
      </List>
    </Container>
  );
}

export default Resources;
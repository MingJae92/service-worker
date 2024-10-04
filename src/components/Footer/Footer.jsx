import React from 'react';
import { Container, Typography, Box } from '@mui/material';

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#f8f4ec', // Soft, cookbook-themed background
        padding: '20px 0', // Vertical padding for the content
        boxShadow: '0px -2px 10px rgba(0, 0, 0, 0.1)', // Subtle shadow for separation
        width: '100%', // Full width for the footer
        position: 'fixed', // Fix it at the bottom
        bottom: 0, // Always stick to the bottom
        left: 0, // Align to the left edge
        zIndex: 1000, // Keep it on top of other content
      }}
    >
      <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
        <Typography variant="h6" color="textPrimary" gutterBottom>
          CookBook Footer
        </Typography>
        <Typography variant="body2" color="textSecondary">
          &copy; 2024 - All Rights Reserved | Delicious recipes at your fingertips
        </Typography>
      </Container>
    </Box>
  );
}

export default Footer;

import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Pageerror() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        width: '100%', // Full width
        backgroundImage: 'url(https://example.com/cookbook-background.jpg)', // Replace with your background image
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        textAlign: 'center',
        padding: '20px',
      }}
    >
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{ color: '#8B4513', fontFamily: 'Cursive' }} // Cookbook theme color and font
      >
        Oops! Recipe Not Found
      </Typography>
      <Typography
        variant="body1"
        gutterBottom
        sx={{ color: '#A0522D', fontFamily: 'Cursive' }} // More cookbook-style text
      >
        It looks like this page is missing from the recipe book.
      </Typography>
      <Button
        variant="contained"
        color="secondary"
        onClick={handleGoHome}
        sx={{
          mt: 2,
          backgroundColor: '#D2691E', // Warm cookbook-like color
          '&:hover': {
            backgroundColor: '#A0522D',
          },
          fontFamily: 'Cursive',
        }}
      >
        Back to Home Cookbook
      </Button>
    </Box>
  );
}

export default Pageerror;

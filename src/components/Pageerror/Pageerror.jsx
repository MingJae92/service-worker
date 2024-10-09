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
        width: '100%',
        backgroundImage: 'url(https://example.com/cookbook-background.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        textAlign: 'center',
        padding: { xs: '20px', sm: '40px' },
      }}
    >
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{ 
          color: '#8B4513', 
          fontFamily: 'Cursive', 
          fontSize: { xs: '1.5rem', md: '2rem' },
        }} 
      >
        Oops! Recipe Not Found
      </Typography>
      <Typography
        variant="body1"
        gutterBottom
        sx={{ 
          color: '#A0522D', 
          fontFamily: 'Cursive', 
          fontSize: { xs: '1rem', md: '1.25rem' },
        }} 
      >
        It looks like this page is missing from the recipe book.
      </Typography>
      <Button
        variant="contained"
        color="secondary"
        onClick={handleGoHome}
        sx={{
          mt: 2,
          backgroundColor: '#D2691E',
          '&:hover': {
            backgroundColor: '#A0522D',
          },
          fontFamily: 'Cursive',
          fontSize: { xs: '0.875rem', sm: '1rem' },
          padding: { xs: '10px 20px', sm: '12px 24px' },
        }}
      >
        Back to Home Cookbook
      </Button>
    </Box>
  );
}

export default Pageerror;

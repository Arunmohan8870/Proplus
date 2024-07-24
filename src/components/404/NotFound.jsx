import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import error from "../../assets/404.png";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      textAlign="center"
      // bgcolor="#f7f7f7"
      p={2}
    >
      <Box component="img" src={error} alt="404 Error" mb={1} width="60%" maxWidth={400} />
      {/* <Typography variant="h4" gutterBottom>
        404 - Page Not Found
      </Typography> */}
      <Typography variant="body1" mb={4}>
        The page you are looking for does not exist.
      </Typography>
      {/* <Button 
        variant="contained" 
        color="primary" 
        onClick={() => navigate('/')}
        sx={{
          textTransform: 'none',
          fontSize: '16px',
          padding: '8px 16px',
        }}
      >
        Go to Home
      </Button> */}
    </Box>
  );
};

export default NotFound;

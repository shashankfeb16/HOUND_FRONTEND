import React from 'react';
import { AppBar, Container, Link, Toolbar, Typography } from '@mui/material';

const Footer = () => {
  return (
    <AppBar position="static" color="primary" sx={{ marginTop: 20 }}>
      <Container>
        <Toolbar>
          <Typography variant="body2" color="inherit" sx={{ flexGrow: 1 }}>
            © {new Date().getFullYear()} HOUND All Rights Reserved
          </Typography>
          <Typography variant="body2" color="inherit" sx={{ marginRight: 2 }}>
            Created by Team Members:
          </Typography>
          <Link href="https://www.linkedin.com/in/vivek-nemade/" target="_blank" rel="noopener noreferrer" color="inherit" sx={{ marginLeft: 1 }}>
            Vivek Nemade
          </Link>
          <Link href="https://www.linkedin.com/in/shashank-nath-9b8970147/" target="_blank" rel="noopener noreferrer" color="inherit" sx={{ marginLeft: 1 }}>
            Shashank Nath
          </Link>
          <Link href="#" color="inherit" sx={{ marginLeft: 2 }}>
            Privacy Policy
          </Link>
          <Link href="#" color="inherit" sx={{ marginLeft: 2 }}>
            Terms of Service
          </Link>
          <Link href="#" color="inherit" sx={{ marginLeft: 2 }}>
            Contact Us
          </Link>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Footer;

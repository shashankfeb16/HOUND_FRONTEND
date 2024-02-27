import React from 'react';
import { AppBar, Box, Container, Link, Toolbar, Typography,useTheme,useMediaQuery } from '@mui/material';

const Footer = () => {
  const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <AppBar position="static" color="primary" sx={{display:"flex", alignItems:"center",p:2 }}>
      <Container>
        <Toolbar sx={{  ...(isSmallScreen && {flexDirection:"column" })}}>
          <Typography variant="body2" color="inherit" sx={{ flexGrow: 1,...(isSmallScreen && {fontSize:"12px",flexDirection:"row",pb:1 }) }}>
            © {new Date().getFullYear()} HOUND All Rights Reserved
          </Typography>
          <Box sx={{display:"flex",justifyContent:"center",alignItems:"center",...(isSmallScreen && {flexDirection:"column" })
            }}>
              <Box sx={{display:"flex",...(isSmallScreen && {alignItems:"center",flexDirection:"column",pb:1 })}}>
            <Typography variant="body2" color="inherit" sx={{ marginRight: 2,...(isSmallScreen && {fontSize:"12px",pb:0.2 }) }}>
              Created by Team Members:
            </Typography>
            <Box sx={{display:"flex",...(isSmallScreen && {flexDirection:'column' })}}>
            <Link  href="https://www.linkedin.com/in/vivek-nemade/" target="_blank" rel="noopener noreferrer" color="inherit" sx={{textDecoration:"none", marginLeft: 1 }}>
               <Typography sx={{...(isSmallScreen && {fontSize:"10px" })}} variant="body2" color="inherit">
               Vivek Nemade
              </Typography>
            </Link>
            <Link href="https://www.linkedin.com/in/shashank-nath-9b8970147/" target="_blank" rel="noopener noreferrer" color="inherit" sx={{ marginLeft: 1,textDecoration:"none" }}>
              
              <Typography sx={{...(isSmallScreen && {fontSize:"10px" })}} variant="body2" color="inherit">
                Shashank Nath
              </Typography>
            </Link>
            </Box>
            </Box>
              <Box sx={{display:"flex",...(isSmallScreen && { })}}>
                <Link href="#" color="inherit" sx={{ marginLeft: 2,textDecoration:"none" }}>
                  <Typography sx={{...(isSmallScreen && {fontSize:"10px" })}} variant="body2" color="inherit">
                    Privacy Policy
                  </Typography>
                </Link>
                <Link href="#" color="inherit" sx={{ marginLeft: 2,textDecoration:"none" }}>
                  
                  <Typography sx={{...(isSmallScreen && {fontSize:"10px" })}} variant="body2" color="inherit">
                  Terms of Service
                  </Typography>
                </Link>
                <Link href="#" color="inherit" sx={{ marginLeft: 2,textDecoration:"none" }}>
                  
                  <Typography sx={{...(isSmallScreen && {fontSize:"10px" })}} variant="body2" color="inherit">
                  Contact Us
                  </Typography>
                </Link>
                </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Footer;

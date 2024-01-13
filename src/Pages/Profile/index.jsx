/* eslint-disable no-unused-vars */
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  Input,
  TextField,
  Avatar,
  Stack,
  InputAdornment
} from "@mui/material";
import React, { useState } from "react";
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import YouTubeIcon from '@mui/icons-material/YouTube';
import XIcon from '@mui/icons-material/X';
import AddLinkIcon from '@mui/icons-material/AddLink';

export default function Profile() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };
  return (
    <Box sx={{ background: "linear-gradient(#f0f0f0, #e0e0e0)" }}>
      <Container maxWidth="lg" sx={{ mt: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4} lg={6}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography variant="h4">Upload Photo</Typography>
              <Stack spacing={2}>
                <Avatar
                  alt="Remy Sharp"
                  src="/static/images/avatar/2.jpg"
                  sx={{
                    width: 120,
                    height: 120,
                    mt: 2,
                    "& .MuiAvatar-root": {
                      margin: "0 auto",
                    },
                  }}
                />
                <label htmlFor="file-input">
                  <input
                    id="file-input"
                    type="file"
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                  />
                  <Button variant="contained" component="span">
                    {selectedFile ? selectedFile.name : "Choose File"}
                  </Button>
                </label>
                <Button variant="contained">Upload</Button>
              </Stack>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4} lg={6}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                // height: 240,
              }}
            >
              <Typography variant="h4">Personal Details</Typography>
              <Stack spacing={2} sx={{ marginTop: "20px" }}>
                <TextField
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon/>
                      </InputAdornment>
                    ),
                  }}
                  label="User Name"
                />
                <TextField InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon/>
                      </InputAdornment>
                    ),
                  }} label="Email" />
                <TextField InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircleIcon/>
                      </InputAdornment>
                    ),
                  }} label="Full Name" />
                <TextField InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LinkedInIcon/>
                      </InputAdornment>
                    ),
                  }} label="Linkdin" />
                <TextField InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <GitHubIcon/>
                      </InputAdornment>
                    ),
                  }} label="Github" />
                <TextField InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <YouTubeIcon/>
                      </InputAdornment>
                    ),
                  }} label="Youtube" />
                <TextField InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <XIcon/>
                      </InputAdornment>
                    ),
                  }} label="Twitter" />
                <TextField InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AddLinkIcon/>
                      </InputAdornment>
                    ),
                  }} label="Website" />
                <TextField label="bio" multiline rows={2} />
                <Button variant="contained">Submit</Button>
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

/* eslint-disable no-new-object */
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
  InputAdornment,
} from "@mui/material";
import React, { useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import YouTubeIcon from "@mui/icons-material/YouTube";
import XIcon from "@mui/icons-material/X";
import AddLinkIcon from "@mui/icons-material/AddLink";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [selectedFile, setSelectedFile] = useState(null);

  const navigate = useNavigate();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };
  const commonInputStyle = {
    "& .MuiInputBase-input": {
      padding: "10.5px 14px",
      fontSize: 14,
    },
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const updateData = {
      userName: data.get("userName"),
      email:  data.get("email"),
      fullName:  data.get("fullName"),
      github:  data.get("github"),
      linkedln: data.get("linkedIn"),
      youtube: data.get("youtube"),
      website: data.get("website"),
      twitter: data.get("twitter"),
      bio: data.get("bio"),
    };
    try {
      await axios.patch("http://localhost:8000/api/v1/user/update-account-details", updateData,{withCredentials: true});
      alert("successfully Updated");
      navigate("/")
      
    } catch (error) {}
  };

  const handleUploadPhoto = async()=>{
   if(selectedFile){
    const formData = new FormData();
    formData.append("profileImage", selectedFile);
    console.log(formData);
    try{
      await axios.post("http://localhost:8000/api/v1/user/upload-images", formData, {withCredentials: true});
      alert("Profile Photo Uploaded Successfully");
    }
    catch(error){
      alert(error);
    }
   }
  }
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
                <Button variant="contained" onClick={handleUploadPhoto}>Upload</Button>
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
              <Box component="form" noValidate onSubmit={handleSubmit}>
                <Stack spacing={2} sx={{ marginTop: "20px" }}>
                  <TextField
                    sx={commonInputStyle}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonIcon />
                        </InputAdornment>
                      ),
                    }}
                    id="userName"
                    name="userName"
                    label="User Name"
                  />
                  <TextField
                    sx={commonInputStyle}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <EmailIcon />
                        </InputAdornment>
                      ),
                    }}
                    id="email"
                    name="email"
                    label="Email"
                  />
                  <TextField
                    sx={commonInputStyle}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AccountCircleIcon />
                        </InputAdornment>
                      ),
                    }}
                    id="fullName"
                    name="fullName"
                    label="Full Name"
                  />
                  <TextField
                    sx={commonInputStyle}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LinkedInIcon />
                        </InputAdornment>
                      ),
                    }}
                    id="linkedIn"
                    name="linkedIn"
                    label="Linkdin"
                  />
                  <TextField
                    sx={commonInputStyle}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <GitHubIcon />
                        </InputAdornment>
                      ),
                    }}
                    id="github"
                    name="github"
                    label="Github"
                  />
                  <TextField
                    sx={commonInputStyle}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <YouTubeIcon />
                        </InputAdornment>
                      ),
                    }}
                    id="youtube"
                    name="youtube"
                    label="Youtube"
                  />
                  <TextField
                    sx={commonInputStyle}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <XIcon />
                        </InputAdornment>
                      ),
                    }}
                    id="twitter"
                    name="twitter"
                    label="Twitter"
                  />
                  <TextField
                    sx={commonInputStyle}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AddLinkIcon />
                        </InputAdornment>
                      ),
                    }}
                    id="website"
                    name="website"
                    label="Website"
                  />
                  <TextField
                    id="bio"
                    name="bio"
                    label="bio"
                    multiline
                    rows={2}
                  />
                  <Button variant="contained" type="submit">
                    Submit
                  </Button>
                </Stack>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

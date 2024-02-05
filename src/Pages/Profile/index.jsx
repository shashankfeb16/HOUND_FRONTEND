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
import React, { useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../Redux/Auth/auth.actions";

export default function Profile() {
  const [selectedFile, setSelectedFile] = useState(null);
  const { user } = useSelector((state) => state.auth);
  const [exisitingUser, setExistingUser] = useState(null);
  // const dispatch  = useDispatch()
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
      userName: exisitingUser?.userName,
      email:  exisitingUser?.email,
      fullName:  exisitingUser?.fullName,
      github:  exisitingUser?.github,
      linkedln: exisitingUser?.linkedIn,
      youtube: exisitingUser?.youtube,
      website: exisitingUser?.website,
      twitter: exisitingUser?.twitter,
      bio: exisitingUser?.bio,
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

  const getUser = async () =>{
    try {
      const res = await axios.get("http://localhost:8000/api/v1/user/current-user",{withCredentials: true});
      console.log(res);
      const {data} = res;
      setExistingUser(data?.user);
    } catch (error) {
      console.log(error);
    }
  }
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "userName") {
      setExistingUser((prevValues) => ({
        ...prevValues,
        userName: value,
      }));
    }
    if (name === "email") {
      setExistingUser((prevValues) => ({
        ...prevValues,
        email: value,
      }));
    }
    if (name === "fullName") {
      setExistingUser((prevValues) => ({
        ...prevValues,
        fullName: value,
      }));
    }
    if (name === "github") {
      setExistingUser((prevValues) => ({
        ...prevValues,
        github: value,
      }));
    }
    if (name === "linkedIn") {
      setExistingUser((prevValues) => ({
        ...prevValues,
        linkedIn: value,
      }));
    }
    if (name === "youtube") {
      setExistingUser((prevValues) => ({
        ...prevValues,
        youtube: value,
      }));
    }
    if (name === "twitter") {
      setExistingUser((prevValues) => ({
        ...prevValues,
        twitter: value,
      }));
    }
    if (name === "website") {
      setExistingUser((prevValues) => ({
        ...prevValues,
        website: value,
      }));
    }
    if (name === "bio") {
      setExistingUser((prevValues) => ({
        ...prevValues,
        bio: value,
      }));
    }
  };
  useEffect(()=>{
    getUser();
  },[]);
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
                {user?.profileImage ? (<Avatar
                  alt={"Remy Sharp"}
                  src={user?.profileImage}
                  sx={{
                    width: 120,
                    height: 120,
                    mt: 2,
                    "& .MuiAvatar-root": {
                      margin: "0 auto",
                    },
                  }}
                />):(<Avatar
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
                />)}
                {/* <Avatar
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
                /> */}
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
                    value={exisitingUser?.userName}
                    onChange={handleInputChange}
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
                    value={exisitingUser?.email}
                    onChange={handleInputChange}
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
                    value={exisitingUser?.fullName}
                    onChange={handleInputChange}
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
                    value={exisitingUser?.linkedln}
                    onChange={handleInputChange}
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
                    value={exisitingUser?.github}
                    onChange={handleInputChange}
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
                    value={exisitingUser?.youtube}
                    onChange={handleInputChange}
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
                    value={exisitingUser?.twitter}
                    onChange={handleInputChange}
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
                    value={exisitingUser?.website}
                    onChange={handleInputChange}
                  />
                  <TextField
                    id="bio"
                    name="bio"
                    label="bio"
                    multiline
                    rows={2}
                    value={exisitingUser?.bio}
                    onChange={handleInputChange}
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

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
  TextareaAutosize,
} from "@mui/material";
import React, { useState } from "react";

export default function Profile() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };
  return (
    <Box sx={{ background: 'linear-gradient(#f0f0f0, #e0e0e0)' }}>
      <Container maxWidth="lg" sx={{ mt: 3}}>
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
                <TextField label="User Name" />
                <TextField label="Email" />
                <TextField label="Full Name" />
                <TextField label="Linkdin" />
                <TextField label="Github" />
                <TextField label="Youtube" />
                <TextField label="Twitter" />
                <TextField label="Website" />
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

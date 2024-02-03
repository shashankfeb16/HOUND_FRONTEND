import { Avatar, Box, Button, Container, Grid, IconButton, Typography } from '@mui/material'
import { Facebook, Twitter, GitHub, LinkedIn } from '@mui/icons-material';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../Redux/Auth/auth.actions';
import { getCurrentUserBlogs } from '../Redux/blogs/blog.action';


const data =[
    {
        id:1,
        title:'Post 1',
        date:"21-1-2024"
    },
    {
        id:2,
        title:'Post 2',
        date:"2-5-2023"
    },
    {
        id:3,
        title:'Post 3',
        date:"21-1-2023"
    }
]

function Test() {
    const dispatch  = useDispatch()
    const {user} =  useSelector(state=>state.auth)
    const {currentUserBlogs} =  useSelector(state=>state.blog)

    useEffect(()=>{
        dispatch(getUser());
        dispatch(getCurrentUserBlogs())
       },[dispatch])
  return (
    <>
    <Box sx={{ background: "linear-gradient(#f0f0f0, #e0e0e0)" }}>
    <Container maxWidth="lg">
    <Grid sx={{ pt: 3 }}>
        <Box sx={{ display: 'flex', justifyContent:"center", gap:"25px", alignItems:"center", pb:"30px" }}>
            <Box>
                <Avatar alt="User Avatar" src={user?.profileImage} sx={{ width: 100, height: 100 }} />
            </Box>
            <Box sx={{ display: 'flex',alignItems:"center"}}>
                <Box>
                    <Box>
                        <Typography variant="h5">Shashank N</Typography>
                        <Typography variant="subtitle1">Full Stack Web Developer</Typography>
                    </Box>
                </Box>
                <Box sx={{pl:"30px"}}>
                    <Button variant='contained'> Follow</Button>
                    <Button variant='contained'> Update</Button>
                </Box>
            </Box>
        </Box>
        <Box sx={{display:"flex", alignItems:"center", justifyContent:"center"}}>
            <Box>
            <IconButton href="https://www.facebook.com/yourusername" target="_blank">
          <Facebook />
        </IconButton>
        <IconButton href="https://twitter.com/yourusername" target="_blank">
          <Twitter />
        </IconButton>
        <IconButton href="https://github.com/yourusername" target="_blank">
          <GitHub />
        </IconButton>
        <IconButton href="https://www.linkedin.com/in/yourusername" target="_blank">
          <LinkedIn />
        </IconButton>
            </Box>
            <Box>
                <Typography variant="subtitle">Member Since</Typography>
            </Box>
        </Box>
        <Box sx={{display:"flex",flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
            <Typography variant="h6">About Me</Typography>
            <Box>
                <Typography variant="subtitle">I love Writing Code </Typography>
            </Box>
        </Box>
    </Grid>
    <Box sx={{display:"flex",justifyContent:"center", alignItems:"center",  mt:"1rem"}}>
        <Box >
        <Typography variant="h6">Recent Posts</Typography>
        {currentUserBlogs?.map((el,index)=>(
            <Box key={el._id} sx={{display:"flex", flexDirection:"row",gap:"20px"}}>
                <Typography variant="subtitle">Blog {index+1}</Typography>
                <Typography variant='subtitle'>{el.title}</Typography>
                <Typography variant='subtitle'>{new Date(el.updatedAt).toLocaleDateString()}</Typography>
            </Box>
        ))}
        </Box>
    </Box>

    </Container>
    </Box>
    </>
  )
}

export default Test


import { Avatar, Box, Button, Container, Grid, IconButton, Typography } from '@mui/material'
import { Facebook, Twitter, GitHub, LinkedIn } from '@mui/icons-material';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getUser, userFollowerAndFollowing } from '../../Redux/Auth/auth.actions';
import { getCurrentUserBlogs } from '../../Redux/blogs/blog.action';
import { Link, useNavigate } from 'react-router-dom';


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

function Profile() {
    const dispatch  = useDispatch()
    const navigate = useNavigate()
    const {user} =  useSelector(state=>state.auth)
    const {currentUserBlogs} =  useSelector(state=>state.blog)
    const [followersData, setFollowersData] = useState([])
    const [followingData, setFollowingData] = useState([])

    const fetchData=async()=>{
        try {
            const res = await userFollowerAndFollowing()
            // console.log(res.data)
            // if(res.data.valid===true) {
            //     return window.location.reload();
            // }
            setFollowersData(res.data.followers)
            setFollowingData(res.data.following)
        } catch (error) {
            console.log(error.message)
        }
    }




    useEffect(()=>{
        dispatch(getUser());
        dispatch(getCurrentUserBlogs())
        // userFollowerAndFollowing()
        fetchData()
       },[])
    //    console.log(followersData)
       const handleBack = () => {
        navigate(-1)
      }
  return (
    <>
    <Box sx={{ background: "linear-gradient(#f0f0f0, #e0e0e0)" }}>
        <Box>
            <Button onClick={handleBack}>back</Button>
        </Box>
    <Container maxWidth="lg">
    <Grid sx={{ pt: 3 }}>
        <Box sx={{ display: 'flex', justifyContent:"center", gap:"25px", alignItems:"center", pb:"30px" }}>
            <Box>
                <Avatar alt="User Avatar" src={user?.profileImage} sx={{ width: 100, height: 100 }} />
            </Box>
            <Box sx={{ display: 'flex',alignItems:"center"}}>
                <Box>
                    <Box>
                        <Typography variant="h5">{user?.fullName}</Typography>
                        <Typography variant="subtitle1">Full Stack Web Developer</Typography>
                        <Box>
                                <Typography variant="h6">Followers: {user?.followersCount}</Typography>
                                <Typography variant="h6">Following: {user?.followingCount}</Typography>
                            </Box>
                    </Box>
                </Box>
                <Box sx={{pl:"30px"}}>
                    {/* <Button variant='contained'> Follow</Button> */}
                    <Link to="/my-account">
                        <Button variant='contained'> Update</Button>
                    </Link>
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
                <Typography variant="subtitle">Member Since: {new Date(user?.createdAt).toLocaleDateString()}</Typography>
            </Box>
        </Box>
        <Box sx={{display:"flex",flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
            <Typography variant="h6">About Me</Typography>
            <Box>
                <Typography variant="subtitle">{user?.bio }</Typography>
            </Box>
        </Box>
    </Grid>
    <Box sx={{display:"flex",justifyContent:"center", alignItems:"center",  mt:"1rem",gap:"50px"}}>
        <Box >
            <Typography variant="h6">Recent Posts</Typography>
                {currentUserBlogs?.map((el,index)=>(
                    <Box key={el._id} sx={{display:"flex", flexDirection:"row",gap:"20px"}}>
                        <Typography variant="subtitle">Blog {index+1}</Typography>
                        <Link to={`/blogs/${el._id}`}>   <Typography variant='subtitle'>{el.title}</Typography></Link>
                        <Typography variant='subtitle'>{new Date(el.updatedAt).toLocaleDateString()}</Typography>
                    </Box>
                ))}
        </Box>
        <Box sx={{display:"flex",gap:"30px", justifyContent:"center",textAlign:"center"}}>
            <Box>
            <Typography variant="h6">Followers</Typography>
                {followersData?.map((el)=>(

                   <Link to={`/user/${el?.follower._id}`} style={{color:"inherit", textDecoration:"none"}} >  <Box key={el?.follower._id} sx={{display:"flex",alignItems:"center",mb:"10px",padding:"5px",gap:"10px", borderBottom:"1px solid black"}}>
                        <Avatar src={el?.follower?.profileImage} alt={el?.follower?.fullName} sx={{ width: 36, height: 36 }}/>
                        <Typography>{el?.follower?.fullName}</Typography>
                    </Box>
                    </Link>
                ))}
            </Box>
            <Box>
                <Typography variant="h6">Following</Typography>
                {followingData?.map((el)=>(
                        <Link to={`/user/${el?.following._id}`} style={{color:"inherit", textDecoration:"none"}} > 
                        <Box key={el?.following._id}  sx={{display:"flex",alignItems:"center",mb:"10px",padding:"5px",gap:"10px", borderBottom:"1px solid black"}}>
                            <Avatar src={el?.following?.profileImage} alt={el?.following?.fullName} sx={{ width: 36, height: 36 }} />
                            <Typography>{el?.following?.fullName}</Typography>
                        </Box>
                        </Link>
                    ))}
            </Box>
        </Box>
    </Box>

    </Container>
    </Box>
    </>
  )
}

export default Profile


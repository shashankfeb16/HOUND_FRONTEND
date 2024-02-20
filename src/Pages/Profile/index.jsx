import { Avatar, Box, Button, Container, Grid,useMediaQuery,
    useTheme,  IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import { Facebook, Twitter, GitHub, LinkedIn } from '@mui/icons-material';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getUser, userFollowerAndFollowing } from '../../Redux/Auth/auth.actions';
import { getCurrentUserBlogs } from '../../Redux/blogs/blog.action';
import { Link, useNavigate } from 'react-router-dom';
import BarChart from '../../Components/BarChart';
import styled from 'styled-components';
import PieChart from '../../Components/PieChart';
import Loader from '../../Components/Loader/Loader';
import TableComponent from '../../Components/TableComponent';

function Profile() {
    const dispatch  = useDispatch()
    const navigate = useNavigate()
    const {user} =  useSelector(state=>state.auth)
    const {currentUserBlogs} =  useSelector(state=>state.blog)
    const [followersData, setFollowersData] = useState([])
    const [followingData, setFollowingData] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const fetchData=async()=>{
        try {
            setIsLoading(true);
            const res = await userFollowerAndFollowing()
            // console.log(res.data)
            // if(res.data.valid===true) {
            //     return window.location.reload();
            // }
            setFollowersData(res.data.followers)
            setFollowingData(res.data.following)
        } catch (error) {
            console.log(error.message)
            setIsLoading(false);
        } finally{
            setIsLoading(false);
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
    console.log("followers Data", followersData);
    console.log("following Data", followingData);
    console.log("currentUserBlogs", currentUserBlogs);
  return (
    <>
    <Box sx={{ background: "linear-gradient(#f0f0f0, #e0e0e0)" }}>
        <Box>
            <Button onClick={handleBack}>back</Button>
        </Box>
    <Box>
    <Grid sx={{ pt: 3 }}>
        <Box sx={{ display: 'flex', justifyContent:"center", gap:"25px", alignItems:"center", pb:"30px" }}>
            <Box>
                <Avatar alt="User Avatar" src={user?.profileImage} sx={{ width: 100, height: 100 }} />
            </Box>
            <Box sx={{ display: 'flex',alignItems:"center",
                        // ...(isSmallScreen && {flexWrap: 'wrap', })
                    }}>
                <Box>
                    <Box>
                        <Typography variant="h5">{user?.fullName}</Typography>
                        {/* <Typography variant="subtitle1">Full Stack Web Developer</Typography> */}
                        <Box sx={{ display: 'flex',gap:"15px",
                            ...(isSmallScreen && {flexDirection:"column",gap:0 })
                    }}>
                                <Typography variant="subtitle1" sx={{...(isSmallScreen && {fontSize: '14px', })}}>Followers: {user?.followersCount}</Typography>
                                <Typography variant="subtitle1" sx={{...(isSmallScreen && {fontSize: '14px', })}}>Following: {user?.followingCount}</Typography>
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
        <Box sx={{display:"flex", alignItems:"center", justifyContent:"center",
                ...(isSmallScreen && {flexDirection:"column",gap:1,mb:1 })
                }}>
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
        {/* <Box sx={{textAlign:"center"}}>
            <Typography variant="h6" >Recent Posts</Typography>
                    <TableContainer component={Paper} sx={{ maxHeight: 440,  overflow: 'hidden' }}>
                        <Table sx={{ minWidth: 650}}  stickyHeader aria-label="sticky table">
                        <TableHead >
                            <TableRow >
                            <TableCell sx={{backgroundColor:"#87CEEB", color:"black", borderRight:"1px solid white"}}>S.No</TableCell>
                            <TableCell sx={{backgroundColor:"#87CEEB", color:"black",borderRight:"1px solid white"}}>Blog Title</TableCell>
                            <TableCell sx={{backgroundColor:"#87CEEB", color:"black",borderRight:"1px solid white"}}>Category</TableCell>
                            <TableCell sx={{backgroundColor:"#87CEEB", color:"black",borderRight:"1px solid white"}}>Published Date</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                {currentUserBlogs?.map((el,index)=>(
                            <TableRow
                                key={el._id}
                                // sx={{ '&:last-child td, &:last-child th': { border: 0 },}}
                            >
                                <TableCell component="th" scope="row">
                                  {index+1}
                                </TableCell>
                                <TableCell ><Link style={{color:"inherit", textDecoration:"none"}} to={`/blogs/${el._id}`}>{el.title}</Link></TableCell>
                                <TableCell >{el.category}</TableCell>
                                <TableCell >{new Date(el.updatedAt).toLocaleDateString()}</TableCell>
                            </TableRow>
                            ))}
                        </TableBody>
                        </Table>
                        </TableContainer>
        </Box> */}
        

        <TableComponent currentUserBlogs={currentUserBlogs} />
    </Box>
    <Box sx={{display:"flex",flexWrap:"wrap",gap:"15px", justifyContent: "space-around", marginTop: "25px", paddingBottom: "25px"}}>
            <Box sx={{display:"flex",gap:"30px",textAlign:"center",flexWrap:"wrap",justifyContent:"center"}}>
                <Box>
                    <Typography variant="h6">Followers</Typography>
                    <Paper style={{ width: 250, height: 200, overflow: 'auto',padding:"10px" }}>
                        {followersData?.map((el)=>(
                        <Link to={`/user/${el?.follower._id}`} style={{color:"inherit", textDecoration:"none"}} > 
                            <Box key={el?.follower._id} sx={{display:"flex",alignItems:"center",mb:"10px",padding:"10px",gap:"10px",boxShadow: "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;",":hover": {
          backgroundColor: "#87CEEB",
          color: "black",
        }}}>
                                <Avatar src={el?.follower?.profileImage} alt={el?.follower?.fullName} sx={{ width: 36, height: 36 }}/>
                                <Typography>{el?.follower?.fullName}</Typography>
                            </Box>
                            </Link>
                        ))}
                        </Paper>
                </Box>
                <Box>
                    <Typography variant="h6">Following</Typography>
                    <Paper style={{ width: 250, height: 200, overflow: 'auto',padding:"10px"  }}>
                    {followingData?.map((el)=>(
                            <Link to={`/user/${el?.following._id}`} style={{color:"inherit", textDecoration:"none"}} > 
                            <Box key={el?.following._id}  sx={{display:"flex",alignItems:"center",mb:"10px",padding:"10px",gap:"10px",boxShadow: "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px",":hover": {
          backgroundColor: "#87CEEB",
          color: "black",
        },}}>
                                <Avatar src={el?.following?.profileImage} alt={el?.following?.fullName} sx={{ width: 36, height: 36 }} />
                                <Typography>{el?.following?.fullName}</Typography>
                            </Box>
                            </Link>
                        ))}
                    </Paper>   
                </Box>
            </Box>
                <Box 
                sx={{width:"40%",
                    ...(isSmallScreen && {width:"90%",height:"50%",margin:"auto" })
                }}
                >
                    <PieChart followers={user?.followersCount} following={user?.followingCount}/>
                </Box>
        </Box>

    </Box>
    </Box>
   <OuterContainerStyles marginTop="25px">
    <BarChart/>
   </OuterContainerStyles>
   {isLoading && <Loader/>}
    </>
  )
}

export default Profile

const OuterContainerStyles = styled.div`
  border-radius: 6px;
  background: #fff;
  box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.1);
  margin-left: 24px;
  margin-right: 24px;
  margin-top: ${(props) => props.marginTop ?? "0px"};
  margin-bottom: ${(props) => props.marginBottom ?? "0px"};
`;
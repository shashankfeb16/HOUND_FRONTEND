import React, { useCallback, useEffect, useState } from 'react'
import { deleteBlog, deleteComment, getBlogComments, getLikeStatus, getSingleBlogData, likeAndUnlike, postComment } from '../Redux/blogs/blog.action'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom';
import CommentList from './CommentList';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {Box, Button, IconButton, TextareaAutosize,CircularProgress  } from '@mui/material';
import axios from 'axios'

function TestSingleBlog() {
    axios.defaults.withCredentials = true;
    const {blogData,like} = useSelector(state=>state.blog)
    // const {loading,comments,error} = useSelector(state=>state.blog)
    // const {like} = useSelector(state=>state.blog)
    console.log(like)   //result : true
    
    const navigate = useNavigate()
      
    const {user} =  useSelector(state=>state.auth)
    const [isLiked, setIsLiked] = useState(like);
    
    console.log("current lIke state",isLiked) //result : false
    const [allLikes, setAllLikes] = useState(blogData.totalLikes);
    const [content, setNewContent] = useState('');
    const [commentsData, setcommentsData] = useState([]);
    const [loading, setLoading] = useState(false);
    
    // console.log(user)
  
    console.log(blogData)
    console.log(blogData.owner)
    
    
    const dispatch = useDispatch()
    const { id } = useParams();
    // console.log(id)

    const fetchComments =useCallback(async()=>{
        
        try {
            const data = await getBlogComments(id)
            setcommentsData(data)

        } catch (error) {
            console.log(error) 
        }finally{
            setLoading(false)
        }
    },[id])

    const isBlogOwner = blogData?.owner === user?._id
    console.log(blogData,user._id)
    
    const handleDelete=async()=>{
        try {
            deleteBlog(id)
        } catch (error) {
            console.log(error.message)
        }finally {
            alert("Blog successfully deleted")
            navigate("/")
        }
    }

    const handleUpdateComment=async(updatedComment)=>{
        console.log(updatedComment)
        const data = commentsData.map((el)=> el._id === updatedComment._id ? updatedComment : el)
        setcommentsData(data)
        fetchComments(id)
        console.log(data)        // setcommentsData([data,...commentsData])
    }

    useEffect(() => {
        const fetchData = async() => {
            setLoading(true)
            try{
                 dispatch(getSingleBlogData(id))
                 dispatch(getLikeStatus(id))
                 await fetchComments()
                 setIsLiked(like)
            } catch(error){
                console.log(error.message)
            } finally {
                setLoading(false);
            }
        }

        fetchData()


        // dispatch(getSingleBlogData(id))
        // dispatch(getLikeStatus(id))
        // fetchComments()
    },[dispatch,id,isLiked,allLikes,like])
    console.log(commentsData)

    if(blogData.length===0){
        return (<>
            <h1>Blogs Not available</h1>
        </>)
    }

    const handleLikeClick = async() => {
        if(!user){
            alert("Login to like the blog")
        }
        setIsLiked(!isLiked);
        try {
            await dispatch(likeAndUnlike(id))
            if(isLiked) {
                setAllLikes(allLikes-1);
            }
            setAllLikes(allLikes+1);
           
        } catch (error) {
            console.error(error.message)
        }
      };

      const handleDeleteComment = async(id,commentId) => {
        try {
            const data = await deleteComment(id,commentId)
            console.log(data)
        } catch (error) {
            console.log(error.message)
        } finally {
            fetchComments(id)
        }
      }

      const handlePost = async (event) => {
        event.preventDefault();
        // console.log(newComment)
        setLoading(true)
        try {
            const data = await postComment(id,{content})
            console.log(data)
            setcommentsData([data,...commentsData]);
            fetchComments(id)
            setNewContent("")
        } catch (error) {
            console.error(error.message)
        }finally {
            setLoading(false)
        }

      } 
      const handleBack = () => {
        navigate(-1)
      }

      if(loading) {
           return (<>
                <h1>Loading.....</h1>
            </>)
      }
  return (
    <div>
        <div>
            <Button onClick={handleBack}>back</Button>
        </div>
        <div>
            <h1>{blogData.title}</h1>
            <div style={{width:'70%',border: "1px solid black", padding:"40px", margin:"30px",}} dangerouslySetInnerHTML={{ __html: blogData?.description }}/>
            <Link to={`/user/${blogData?.owner?._id}`} style={{textDecoration:'none'}}>
                <h3>Owner: {blogData?.owner?.userName}</h3>
            </Link>
            <p>Likes:{blogData?.totalLikes}</p>
                <div>
                    <IconButton onClick={handleLikeClick}>
                        <FavoriteIcon style={{ color: isLiked ? 'red' : 'grey' }}/>
                    </IconButton>
                </div>
                {isBlogOwner && 
                    <Box>
                        <Button variant="contained"
                color="primary">Edit</Button>
                        <Button onClick={handleDelete}>Delete</Button>
                    </Box>
                }
        </div>
        <Box>
            <TextareaAutosize
                placeholder="Write your comment..."
                minRows={3}
                style={{ maxWidth: '400px' }}
                value={content}
                onChange={(e) => setNewContent(e.target.value)}
                    />
            <Button
                variant="contained"
                color="primary"
                onClick={handlePost}>
                    Post Comment
            </Button>
       </Box>
       {/* {error && <div>Error: {error}</div>} */}
       {loading ? (<CircularProgress />) :(<CommentList 
        comments={commentsData}
        currentUser={user._id}
        onDelete={handleDeleteComment}
        blogId={id}
        onEdit ={handleUpdateComment}
        />) }
        
    </div>
  )
}

export default TestSingleBlog
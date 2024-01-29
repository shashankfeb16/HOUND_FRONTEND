import React, { useEffect, useState } from 'react'
import { getBlogComments, getLikeStatus, getSingleBlogData, likeAndUnlike, postComment } from '../Redux/blogs/blog.action'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import CommentList from './CommentList';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {Box, Button, IconButton, TextareaAutosize } from '@mui/material';
import axios from 'axios'

function TestSingleBlog() {
    axios.defaults.withCredentials = true;
    const {blogData} = useSelector(state=>state.blog)
    const {comments} = useSelector(state=>state.blog)
    const {like} = useSelector(state=>state.blog)
    
    const {user} =  useSelector(state=>state.auth)
    const [isLiked, setIsLiked] = useState(like);
    const [allLikes, setAllLikes] = useState(blogData.totalLikes);
    const [content, setNewContent] = useState('');
    const [commentsData, setcommentsData] = useState(comments);
    console.log(comments)
    // console.log(user)
    console.log(like)
    console.log(blogData)
    const dispatch = useDispatch()
    const { id } = useParams();
    // console.log(id)
    useEffect(() => {
        dispatch(getSingleBlogData(id))
        dispatch(getBlogComments(id))
        dispatch(getLikeStatus(id))
    },[dispatch,id,isLiked,allLikes,commentsData])

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

      const handlePost= async(event)=>{
        event.preventDefault();
        // console.log(newComment)
        try {
            await dispatch(postComment(id,{content}))
            setcommentsData([...commentsData]);
        } catch (error) {
            console.error(error.message)
        }

      }
  return (
    <div>
        <h1>{blogData.title}</h1>
        <p>{blogData.description}</p>
        <p>Likes:{blogData.totalLikes}</p>
        <div>
            <IconButton onClick={handleLikeClick}>
                <FavoriteIcon style={{ color: isLiked ? 'red' : 'grey' }}/>
            </IconButton>
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
        <CommentList 
        comments={commentsData}
        currentUser={user._id}
        />
    </div>
  )
}

export default TestSingleBlog
import axios from "axios"
import { GET_Blog_COMMENTS, GET_LIKE_STATUS, GET_SINGLE_BLOG_DETAILS, POST_Blog_COMMENTS, UPDATE_LIKES } from "./blog.types"

export const getSingleBlogData=(blogId)=>async(dispatch)=>{
    try {
        const response = await axios.get(`http://localhost:8000/api/v1/blog/allBlogs/${blogId}`,{withCredentials: true})
        // console.log(response.data)
        dispatch({
            type: GET_SINGLE_BLOG_DETAILS,
            payload: response.data
        })
    } catch (error) {
        console.log(error.message)
    }
}

export const getBlogComments=(blogId)=>async(dispatch)=>{
    try {
        const response = await axios.get(`http://localhost:8000/api/v1/blog/currrent-blog/${blogId}/comments`,{withCredentials: true})
        console.log(response.data)
        dispatch({
            type: GET_Blog_COMMENTS,
            payload: response.data.data
        })
    } catch (error) {
        console.log(error.message)
    }
}


export const postComment=(blogId,content)=>async(dispatch)=>{
    try {
        const response = await axios.post(`http://localhost:8000/api/v1/blog/currrent-blog/${blogId}/add-comment`,content,{withCredentials: true})
        console.log(response.data)
        dispatch({
            type :POST_Blog_COMMENTS,
            payload: response.data
        })
    } catch (error) {
        console.log(error.message)
    }
}

export const likeAndUnlike =(blogId)=>async(dispatch)=>{
    try {
        console.log(blogId)
        const response = await axios.patch(`http://localhost:8000/api/v1/blog/currrent-blog/${blogId}`,{withCredentials: true})
        // console.log(response)
        dispatch({
            type: UPDATE_LIKES,
            payload: response.data
        })
    } catch (error) {
        console.log(error.message)
    }
}

export const getLikeStatus =(blogId)=>async(dispatch)=>{
    try {
        const response = await axios.get(`http://localhost:8000/api/v1/blog/currrent-blog/${blogId}`,{withCredentials: true})
        console.log(response.data)
        dispatch({
            type: GET_LIKE_STATUS,
            payload: response.data
        })
    } catch (error) {
        console.log(error.message)
    }
}


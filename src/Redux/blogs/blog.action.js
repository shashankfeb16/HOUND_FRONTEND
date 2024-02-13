import axios from "axios"
import { GET_BLOGS, GET_Blog_COMMENTS, GET_CURRENTUSER_BLOGS, GET_LIKE_STATUS, GET_SINGLE_BLOG_DETAILS, POST_Blog_COMMENTS, POST_Blog_COMMENTS_FAILURE, POST_Blog_COMMENTS_REQUEST, POST_Blog_COMMENTS_SUCCESS, UPDATE_LIKES } from "./blog.types"


export const getAllBlogs =(page,category)=> async(dispatch) =>{
    try {
        const response = await axios.get(`http://localhost:8000/api/v1/blog/allBlogs?page=${page}&limit=5&category=${category}`)
        if(response.data.valid===true) {
            return window.location.reload();
        } else{
        
        dispatch({
            type: GET_BLOGS,
            payload: response.data
        })
    }
        console.log(response.data)
        return response;
    } catch (error) {
        console.log(error.message)
    }
}

export const deleteBlog =async(blogId)=>{
    try {
        console.log(blogId)
        const response = await axios.delete(`http://localhost:8000/api/v1/blog/currrent-blog/${blogId}`)
        return response
    } catch (error) {
        console.log(error.message)
    }
}

export const getCurrentUserBlogs =()=> async(dispatch)=>{
    try {
        const response = await axios.get("http://localhost:8000/api/v1/blog/userBlogs",{withCredentials: true})
        console.log(response.data)
        dispatch({
            type :GET_CURRENTUSER_BLOGS,
            payload : response.data
        })
        return response.data
    } catch (error) {
        console.log(error.message)
    }
}


export const getSingleBlogData=(blogId)=>async(dispatch)=>{
    try {
        const response = await axios.get(`http://localhost:8000/api/v1/blog/allBlogs/${blogId}`,{withCredentials: true})
        console.log(response.data)

        if(response.data.valid===true) {
            return window.location.reload();
        } else{
            dispatch({
                type: GET_SINGLE_BLOG_DETAILS,
                payload: response.data
            })
        }
    } catch (error) {
        console.log(error.message)
    }
}

export const getBlogComments=async(blogId)=>{
    try {
        const response = await axios.get(`http://localhost:8000/api/v1/blog/currrent-blog/${blogId}/comments`,{withCredentials: true})
        console.log(response.data)
        // dispatch({
        //     type: GET_Blog_COMMENTS,
        //     payload: response.data.data
        // })
        return response.data.data
    } catch (error) {
        console.log(error.message)
    }
}


export const postComment=async(blogId,content)=>{
    // dispatch({type: POST_Blog_COMMENTS_REQUEST})
    try {
        const response = await axios.post(`http://localhost:8000/api/v1/blog/currrent-blog/${blogId}/add-comment`,content,{withCredentials: true})
        console.log(response.data)
        return response.data.data
        // dispatch({
        //     type :POST_Blog_COMMENTS_SUCCESS,
        //     payload: response.data
        // })
    } catch (error) {
        // dispatch({type:POST_Blog_COMMENTS_FAILURE,
        // payload: error.message})
        console.log(error.message)
    }
}


export const updateComment = async(blogId,content,commentId)=>{
    try {
        console.log(blogId,content,commentId)
        const response = await axios.patch(`http://localhost:8000/api/v1/blog/currrent-blog/${blogId}/comments/${commentId}`,content,{withCredentials: true})
        console.log(response.data)
        return response.data
    } catch (error) {
        console.log(error.message)
    }
}

export const deleteComment=async(blogId,commentId)=>{
    // dispatch({type: POST_Blog_COMMENTS_REQUEST})
    try {
        const response = await axios.delete(`http://localhost:8000/api/v1/blog/currrent-blog/${blogId}/comments/${commentId}`,{withCredentials: true})
        console.log(response)
        return response
        // dispatch({
        //     type :POST_Blog_COMMENTS_SUCCESS,
        //     payload: response.data
        // })
    } catch (error) {
        // dispatch({type:POST_Blog_COMMENTS_FAILURE,
        // payload: error.message})
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

// export const getLikeStatus =(blogId)=>async(dispatch)=>{
//     try {
//         const response = await axios.get(`http://localhost:8000/api/v1/blog/currrent-blog/${blogId}`,{withCredentials: true})
//         console.log(response.data)
//         dispatch({
//             type: GET_LIKE_STATUS,
//             payload: response?.data
//         })
//         return response?.data
//     } catch (error) {
//         console.log(error.message)
//     }
// }


//trial controller
export const getLikeStatus =async(blogId)=>{
    try {
        const response = await axios.get(`http://localhost:8000/api/v1/blog/currrent-blog/${blogId}`,{withCredentials: true})
        console.log(response.data)
        // dispatch({
        //     type: GET_LIKE_STATUS,
        //     payload: response?.data
        // })
        return response?.data
    } catch (error) {
        console.log(error.message)
    }
}


export const postBlog =async(data)=>{
    try {
        const response = await axios.post("http://localhost:8000/api/v1/blog/create",data,{withCredentials: true})
        return response?.data;
    } catch (error) {
        console.log(error.message)
    }
}

export const updateBlog =async(blogId,data)=>{
    try {
        const response = await axios.patch(`http://localhost:8000/api/v1/blog/update/${blogId}`, data, {withCredentials: true});
        console.log(response?.data)
        return response?.data
    } catch (error) {
        console.log(error.message)
    }
}

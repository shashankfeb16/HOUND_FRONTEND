import { GET_Blog_COMMENTS, GET_LIKE_STATUS, GET_SINGLE_BLOG_DETAILS, POST_Blog_COMMENTS, UPDATE_LIKES } from "./blog.types"


const intialState={
    blogData:{},
    allBlogs:[],
    comments:[],
    like:false
}



export const blogReducer =(state=intialState,{type,payload}) =>{
    switch(type){
        case GET_SINGLE_BLOG_DETAILS :{
            return{
                ...state,
                blogData: payload
            }
        }
        case GET_Blog_COMMENTS: {
            return{
                ...state,
                comments: payload
            }
        }
        case POST_Blog_COMMENTS: {
            return{
                ...state,
                comments: payload
            }
        }
        case UPDATE_LIKES: {
            return{
                ...state,
                like: payload
            }
        }
        case GET_LIKE_STATUS: {
            return{
                ...state,
                like: payload
            }
        }
        default :{
          return state
        }
    }
}
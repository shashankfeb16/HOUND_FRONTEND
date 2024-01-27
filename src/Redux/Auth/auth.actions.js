import axios from "axios"
import { AUTH_GETUSER, AUTH_LOGIN, AUTH_LOGOUT, AUTH_SIGNUP } from "./auth.types.js"

export const loginAPI =(formData)=>async(dispatch)=>{
    try {
        const response = await axios.post("http://localhost:8000/api/v1/user/login", formData, {withCredentials: true})
        console.log(response)
        dispatch({
            type: AUTH_LOGIN,
            payload: response.data.LoggedInUser
        })
        return response.data.LoggedInUser
    } catch (error) {
        console.log(error.message)
    }
}

    export const signUpAPI =(formData)=>async(dispatch)=>{
        try {
            const response = await axios.post("http://localhost:8000/api/v1/user/register", formData);
            dispatch({
                type: AUTH_SIGNUP,
            })
            return response
        } catch (error) {
            console.log(error.message)
        }
    }

export const logOutAPI=()=>async(dispatch)=>{
    try {
        await axios.post("http://localhost:8000/api/v1/user/logout",{withCredentials: true})
        dispatch({
            type: AUTH_LOGOUT,
        })
    } catch (error) {
        console.log(error.message)
    }
}

export const getUser=()=>async(dispatch)=>{
    try {
        const response = await axios.get("http://localhost:8000/api/v1/user/current-user",{withCredentials: true}) 
        dispatch({
            type: AUTH_GETUSER,
            payload: response.data.user
        })
        console.log(response.data.user)
        return response.data.user
        
    } catch (error) {
        
    }
}



// export const logoutHandler =async()=>{
//     await axios.post("http://localhost:8000/api/v1/user/logout",{withCredentials: true})
//     navigate("/login")
// }
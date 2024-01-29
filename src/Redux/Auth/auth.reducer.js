import { AUTH_GETUSER, AUTH_LOGIN, AUTH_LOGOUT, AUTH_SIGNUP } from "./auth.types.js";

const intialState={
    loading: false,
    error: false,
    isAuth: false,
    user:{}
}

export const authReducer = (state=intialState, {type,payload})=>{
    switch(type){
        case AUTH_LOGIN:{
            return {
                ...state,
                isAuth: true,
                user:payload
            }; 
        }
        case AUTH_SIGNUP:{
            return {
                ...state,
            }; 
        }
        case AUTH_LOGOUT:{
            return {
                ...state,
                isAuth:false,
                user:null
            }; 
        }
        case AUTH_GETUSER:{
            return {
                ...state,
                isAuth:true,
                user:payload
            }
        }
       default:{
            return state;
       }
    }
    
}
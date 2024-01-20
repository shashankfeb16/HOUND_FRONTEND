import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
function TestUser() {
  axios.defaults.withCredentials = true;
  const navigate = useNavigate()
  const [user, setUser]= useState()

    const getUser = async()=>{
        const res = await axios.get("http://localhost:8000/api/v1/user/current-user",{withCredentials: true}) 
        // console.log(res?.data?.user)
        // console.log(res?.data?.valid)
        if(res.data.valid){
          setUser(res?.data?.user?.username) 
          // console.log(res?.data?._id)
          // console.log(res?.data?.valid)
        }else{
          navigate("/login")
        }      
      }
      // console.log(user.data.data)
      useEffect(()=>{
        getUser();
      },[])

      const logoutHandler =async()=>{
          await axios.post("http://localhost:8000/api/v1/user/logout",{withCredentials: true})
          navigate("/login")
      }
  return (
    // <div>{user}</div>
    <>
    <div>hello: {user}</div>
    <button onClick={logoutHandler}>Logout</button>
    </>
  )
}

export default TestUser
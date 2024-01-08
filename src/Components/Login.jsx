import React, { useState } from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom'
function Login() {
    const [loginForm, setLoginForm] = useState({
        email:"",
        password:""
    })
    const navigate = useNavigate()
    const handleChange = (e)=>{
        const {name, value} = e.target;
        setLoginForm({
            ...loginForm,
            [name]:value,
        })
    }

    const handleLogin = async(e)=>{
        e.preventDefault();

        try {
             await axios.post('http://localhost:8000/api/v1/user/login',loginForm)
             alert("successfully logged in")
             navigate("/")
        } catch (error) {
            
        }
    }
  return (
    <div>
        <form onSubmit={handleLogin}>
            <div>
                <label >Email ID: </label>
                <input type="email" name='email' value={loginForm.email} onChange={handleChange} required/>
            </div>
            <div>
                <label >Password: </label>
                <input type="password" name='password' value={loginForm.password} onChange={handleChange} required/>
            </div>
            <div>
                <button type="submit">Log in</button>
            </div>
        </form>
    </div>
  )
}

export default Login
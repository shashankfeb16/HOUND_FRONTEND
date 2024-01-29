import React, { Component } from 'react'
import { Route, Routes } from 'react-router-dom'
import Homepage from './Homepage'
import Login from '../Pages/Login'
import Signup from '../Pages/SignUp'
import Navbar from './Navbar'
import Profile from "../Pages/Profile/index"
import TestUser from './TestUser'
import Test from './Test'
import PrivateRoute from './PrivateRoute'
import CreateBlog from '../Pages/CreateBlog'

function AllRoutes() {
  return (
    <>
    <Navbar/>
        <Routes>
            <Route path='/' element={<Homepage/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/signup' element={<Signup/>}/>
            <Route path='/profile' element={<Profile/>}/>
            <Route path='/createBlog' element={<CreateBlog/>}/>
            <Route path='/user' element={<PrivateRoute Component={TestUser}/>} />
              {/* <Route path='/user' element={<TestUser/>}/> */}
            <Route path='/test' element={<Test/>}/>
        </Routes>
    </>
  )
}

export default AllRoutes
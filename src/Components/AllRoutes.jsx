import React, { Component } from 'react'
import { Route, Routes } from 'react-router-dom'
import Homepage from './Homepage'
import Login from '../Pages/Login'
import Signup from '../Pages/SignUp'
import Navbar from './Navbar'
import Profile from "../Pages/Profile/index"
import TestUser from './TestUser'
// import Test from './Test'
import PrivateRoute from './PrivateRoute'
import CreateBlog from '../Pages/CreateBlog'
import TestSingleBlog from './TestSingleBlog'
import VisitedUser from './VisitedUser'
import UpdateBlog from '../Pages/UpdateBlog'
import MyAccount from '../Pages/MyAccount'
import Footer from './Footer'

function AllRoutes() {
  return (
    <>
    <Navbar />
        <Routes>
            <Route path='/' element={<Homepage/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/signup' element={<Signup/>}/>
            <Route path='/profile' element={<PrivateRoute Component={Profile}/>} />
            {/* <Route path='/profile' element={<Profile/>}/> */}
            <Route path='/createBlog' element={<PrivateRoute Component={CreateBlog}/>} />
            <Route path='/updateBlog/:blogId' element={<PrivateRoute Component={UpdateBlog}/>} />
            {/* <Route path='/createBlog' element={<CreateBlog/>}/> */}
            <Route path='/user/:id' element={<PrivateRoute Component={VisitedUser}/>} />
            {/* <Route path='/user/:id' element={<VisitedUser/>}/> */}
            <Route path='/user' element={<PrivateRoute Component={TestUser}/>} />
              {/* <Route path='/user' element={<TestUser/>}/> */}
            <Route path='/my-account' element={<MyAccount/>}/>
            {/* <Route path='/blogs/:id' element={<TestSingleBlog/>}/> */}
            <Route path='/blogs/:id' element={<PrivateRoute Component={TestSingleBlog}/>}/>
        </Routes>
      <Footer/>
    </>
  )
}

export default AllRoutes
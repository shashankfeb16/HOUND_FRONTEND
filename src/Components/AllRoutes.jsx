import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Homepage from './Homepage'
import Login from '../Pages/Login'
import Signup from './Signup'
import Navbar from './Navbar'

function AllRoutes() {
  return (
    <>
    <Navbar/>
        <Routes>
            <Route path='/' element={<Homepage/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/signup' element={<Signup/>}/>
        </Routes>
    </>
  )
}

export default AllRoutes
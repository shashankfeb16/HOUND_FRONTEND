import React, { useEffect, useState } from 'react'
import axios from 'axios'

function Homepage() {

  const [data, setData]= useState([])
  const [user, setUser]= useState({})
  const getData = async()=>{
        const res = await axios.get("http://localhost:8000/api/v1/blog/allBlogs")
        setData(res.data.blogs)
        console.log(res)
  }
    // console.log(data)
  

  
  useEffect(()=>{
    getData()
    // getUser()
    // console.log(data)
  },[])

  // const cookieValue = document.cookie.split('; ').find((row) => row.startsWith('accessToken='))?.split('=')[1]


  return (
    <>
    {/* <Navbar/> */}
    {/* <div><button onClick={()=>getUser()}>check</button></div> */}
      {
        data?.map((el)=>(
          <div key={el?._id} style={{width:"400px"}}>
              <div style={{display:"flex",flexDirection:"row",border:"1px solid black"}}>
                  <div>
                    <p>Title:{el?.title}</p>
                    <p>Description:-  {el?.description}</p>
                    <p>Author:-  {el?.owner?.userName}</p>
                    </div>
                  <div>
                    <img style={{width:"50px", height:"50px"}} src={el?.owner?.profileImage} alt="" />
                  
                </div>
                </div>
          </div>
        ))
      }

    
    </>
  )
}

export default Homepage
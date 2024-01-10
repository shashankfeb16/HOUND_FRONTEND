import React, { useEffect, useState } from 'react'
import axios from 'axios'

function Homepage() {

  const [data, setData]= useState([])
  const getData = async()=>{
        const res = await axios.get("http://localhost:8000/api/v1/blog/allBlogs")
        setData(res.data)
        console.log(res.data)
  }

  useEffect(()=>{
    getData()
    console.log(data)
  },[])


  return (
    <>
    {/* <Navbar/> */}
      {
        data?.map((el)=>(
          <div key={el._id} style={{width:"400px"}}>
              <div style={{display:"flex",flexDirection:"row",border:"1px solid black"}}>
                  <div>
                    <p>Title:{el.title}</p>
                    <p>Description:-  {el.description}</p>
                    <p>Author:-  {el.owner.username}</p>
                    </div>
                  <div>
                    <img style={{width:"50px", height:"50px"}} src={el.owner.profileImage} alt="" />
                  
                </div>
                </div>
          </div>
        ))
      }

    
    </>
  )
}

export default Homepage
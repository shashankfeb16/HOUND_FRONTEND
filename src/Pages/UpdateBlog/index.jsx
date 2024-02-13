import React, { useState, useRef, useMemo, useEffect } from "react";
import JoditEditor from "jodit-react";
import { Box, Button, Stack, TextField } from "@mui/material";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { updateBlog } from "../../Redux/blogs/blog.action";

// const API_KEY = "50938726ed5b1dc3e275abc4759bf1bc";

function UpdateBlog({ placeholder }) {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const attachmentInputRef = useRef(null);
  const navigate = useNavigate();
  const { blogId } = useParams();
  const config = useMemo(
    () => ({
      readonly: false,
    //   placeholder: placeholder || "Start typing...",
      height: "500px",
      // uploader: {
      //   // insertImageAsBase64URI: true,
      //   url: "https://api.imgbb.com/1/upload",
      //   format: "json",
      //   method: "POST",
      //   headers: {
      //     Authorization: `Bearer ${API_KEY}`,
      //   },
      //   isSuccess: function (resp) {
      //     return resp.success === true;
      //   },
      //   getMsg: function (resp) {
      //     return resp.message;
      //   },
      //   process: function (resp) {
      //     // Customize the HTML output for the uploaded image
      //     return `<img style="float:right; margin: 10px;width:300px; height: 200px;" src="${resp.data.url}" alt="${resp.data.name}">`;
      //   },
      //   files: "files[0]",
      // },
    }),
    [placeholder]
  );
  const handleButtonAttach = () => {
    attachmentInputRef.current.click();
  };
  const handleAttachments = async (event) => {
    const allowedFileTypes = [
      "application/msword",
      "application/vnd.ms-excel",
      "application/pdf",
      "text/plain",
      "text/csv",
      "application/xml",
      "text/xml",
      "image/png",
      "image/webp",
      "image/jpeg",
    ];
    const file = event.target.files[0];
    if (file) {
      if (!allowedFileTypes.includes(file.type)) {
        alert("Selected file format is not supported");
        return;
      }
      try {
        const formData = new FormData();
        formData.append("image", file);
        const res = await axios.post("http://localhost:8000/api/v1/blog/uploadJodit-images",formData);
        console.log(res?.data);
        setContent(prevContent => `${prevContent}<img src="${res.data}" alt="Uploaded Image" />`);
      } catch (error) {
        alert("Error uploading file. Please try again.")
      }
    } else {
      alert("No file selected.")
    }
  };
  const handleChangeTitle = (e) =>{
    setTitle(e.target.value);
  }

  const getSingleBlog = async () =>{
    try{
       const response =  await axios.get(`http://localhost:8000/api/v1/blog/allBlogs/${blogId}`,{withCredentials: true});
       console.log(response);
       setContent(response?.data?.description);
       setTitle(response?.data?.title);
    } catch(err){
        console.log(err)
    }
  }
  const handlePublish = async() =>{
    const data = {
      title: title,
      description: content
    }
   try{
    // await axios.patch(`http://localhost:8000/api/v1/blog/update/${blogId}`, data, {withCredentials: true});
    const res= await updateBlog(blogId, data);
    if(res.sucess===true){
      alert("Blog Updated Successfully");
    }
    
   }
   catch(error){
    alert(error);
   }finally{
    navigate("/")
   }
  }
  useEffect(()=>{
    getSingleBlog();
  },[]);
  return (
    <Box>
      <Stack spacing={2} sx={{ padding: "30px" }}>
        <TextField label="Enter Blog Title" sx={{width: "80%"}} value={title} onChange={(e)=>handleChangeTitle(e)}/>
        <JoditEditor
          ref={editor}
          value={content}
          config={config}
          tabIndex={1}
          onBlur={(newContent) => setContent(newContent)}
        />
         <Button variant="outlined" onClick={handleButtonAttach} sx={{width: "15%"}}>Upload File</Button>
            <input
              type="file"
              onChange={handleAttachments}
              ref={attachmentInputRef}
              style={{ display: "none" }}
            />
        <Box sx={{display: "flex", justifyContent: "flex-end"}}>
            <Button variant="contained" onClick={handlePublish}>Update Blog</Button>
        </Box>
      </Stack>
    </Box>
  );
}
export default UpdateBlog;
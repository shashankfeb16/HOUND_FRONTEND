import React, { useState, useRef, useMemo } from "react";
import JoditEditor from "jodit-react";
import { Box, Button, Stack, TextField } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { postBlog } from "../../Redux/blogs/blog.action";


function CreateBlog({ placeholder }) {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const attachmentInputRef = useRef(null);
  const navigate = useNavigate()
  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: placeholder || "Start typing...",
      height: "500px",
      resize: 'auto'
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
  const handlePublish = async() =>{
    const data = {
      title: title,
      description: content
    }
   try{
    // await axios.post("http://localhost:8000/api/v1/blog/create", data, {withCredentials: true});
    await postBlog(data)
    alert("Blog Created Successfully");
   }
   catch(error){
    alert(error);
   }finally{
    navigate("/")
   }
  }
  return (
    <Box>
      <Stack spacing={2} sx={{ padding: "30px" }}>
        <TextField label="Enter Blog Title" sx={{width: "80%"}} onChange={(e)=>handleChangeTitle(e)}/>
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
            <Button variant="contained" onClick={handlePublish}>Publish</Button>
        </Box>
      </Stack>
    </Box>
  );
}
export default CreateBlog;
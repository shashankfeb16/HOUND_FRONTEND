import React, { useState, useRef, useMemo } from "react";
import JoditEditor from "jodit-react";
import { Box, Button, Stack, TextField } from "@mui/material";
import axios from "axios";

function CreateBlog({ placeholder }) {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: placeholder || "Start typing...",
      height: "500px",
      uploader: {
        insertImageAsBase64URI: true,
      },
    }),
    [placeholder]
  );
  const handleChangeTitle = (e) =>{
    setTitle(e.target.value);
  }
  const handlePublish = async() =>{
    const data = {
      title: title,
      description: content
    }
   try{
    await axios.post("http://localhost:8000/api/v1/blog/create", data, {withCredentials: true});
    alert("Blog Created Successfully");
   }
   catch(error){
    alert(error);
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
        <Box sx={{display: "flex", justifyContent: "flex-end"}}>
            <Button variant="contained" onClick={handlePublish}>Publish</Button>
        </Box>
      </Stack>
    </Box>
  );
}
export default CreateBlog;

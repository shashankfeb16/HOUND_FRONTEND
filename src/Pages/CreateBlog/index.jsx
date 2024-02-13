import React, { useState, useRef, useMemo } from "react";
import JoditEditor from "jodit-react";
import { Box, Button, FormControl, FormHelperText, InputLabel, MenuItem, Select, Stack, TextField } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { postBlog } from "../../Redux/blogs/blog.action";
import { toast } from "react-toastify";

// const API_KEY = "50938726ed5b1dc3e275abc4759bf1bc";

function CreateBlog({ placeholder }) {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const navigate = useNavigate()
  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: placeholder || "Start typing...",
      height: "500px",
      resize: 'auto'
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
  const handleChangeTitle = (e) =>{
    setTitle(e.target.value);
  }
  const handleChangeCategory = (e) =>{
    setCategory(e.target.value);
    console.log(e.target.value);
  }
  const handlePublish = async() =>{
    const data = {
      title: title,
      description: content,
      category: category
    }
   try{
    // await axios.post("http://localhost:8000/api/v1/blog/create", data, {withCredentials: true});
    await postBlog(data)
    toast.success("Blog Created Successfully");
   }
   catch(error){
    toast.error(error);
   }finally{
    navigate("/")
   }
  }
  return (
    <Box>
      <Stack spacing={2} sx={{ padding: "30px" }}>
        <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
            <TextField label="Enter Blog Title" sx={{width: "80%"}} onChange={(e)=>handleChangeTitle(e)}/>
            <FormControl required sx={{ m: 1, width: 150 }}>
            <InputLabel id="demo-simple-select-required-label">Category</InputLabel>
            <Select
              labelId="demo-simple-select-required-label"
              id="demo-simple-select-required"
              value={category}
              label="Category *"
              onChange={(e)=>handleChangeCategory(e)}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={"Food"}>Food</MenuItem>
              <MenuItem value={"Travel"}>Travel</MenuItem>
              <MenuItem value={"Coding"}>Coding</MenuItem>
            </Select>
            {/* <FormHelperText>Required</FormHelperText> */}
          </FormControl>
      </Box>
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
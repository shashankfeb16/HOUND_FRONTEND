import React, { useState, useRef, useMemo } from "react";
import JoditEditor from "jodit-react";
import { Box, Button, Stack, TextField } from "@mui/material";

function CreateBlog({ placeholder }) {
  const editor = useRef(null);
  const [content, setContent] = useState("");
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
  console.log(content);
  return (
    <Box>
      <Stack spacing={2} sx={{ padding: "30px" }}>
        <TextField label="Enter Blog Title" sx={{width: "80%"}}/>
        <JoditEditor
          ref={editor}
          value={content}
          config={config}
          tabIndex={1}
          onBlur={(newContent) => setContent(newContent)}
        />
        <Box sx={{display: "flex", justifyContent: "flex-end"}}>
            <Button variant="contained">Publish</Button>
        </Box>
      </Stack>
    </Box>
  );
}
export default CreateBlog;

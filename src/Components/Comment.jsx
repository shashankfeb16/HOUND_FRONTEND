import { Avatar, Box, Button, Card, CardContent, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import moment from 'moment';
import { updateComment } from '../Redux/blogs/blog.action.js';

function Comment({comment,onEdit,currentUser,onDelete,blogId}) {
  const {user} = useSelector(state=>state.auth);
  const [editMode, setEditMode] = useState(false);
  const [content, setContent] = useState(comment.content);
  console.log(comment._id);
  // console.log(comment.profileImage);
  // console.log({"user._id":user._id, "comment.commentBy._id":comment.commentBy._id});
    const isOwner = comment.commentBy._id === user._id;


    const handleEdit = () => {
      setEditMode(true);
    };

    const handleCancel = () => {
      setEditMode(false);
    };

    const handleSave = async() => {
      try {
       const UpdatedComment = await updateComment(blogId,{content},comment._id)
       onEdit(UpdatedComment.data)
       console.log(UpdatedComment);
        setEditMode(false);
      } catch (error) {
        console.log(error);
      }
    };
  return (
    <Card>
        <CardContent>
          <Box sx={{display:"flex", alignItems:"center",gap:"10px"}}>
            <Avatar src={comment?.commentBy?.profileImage} alt={comment?.commentBy?.userName}/>
            {editMode ? (
          <TextField
            value={content}
            onChange={(e) => setContent(e.target.value)}
            style={{ width: '30%' }}
          />
        ) : (
          <Typography>{comment.content}</Typography>
        )}
            <Typography style={{ fontSize: '13px',paddingTop:"5px" }}> Posted   {moment(comment.updatedAt).fromNow()}</Typography>
            {isOwner &&( <Box sx={{display:"flex",gap:"10px"}}>
                <Button variant="outlined" color="primary" onClick={()=>handleEdit(comment._id)}>Edit</Button>
                <Button variant="outlined" color="secondary" onClick={()=>onDelete(blogId,comment._id)}>Delete</Button>
            </Box>)}
          </Box>
            
            {/* {isOwner &&( <div>
                <Button variant="outlined" color="primary" onClick={()=>onEdit(comment._id)}>Edit</Button>
                <Button variant="outlined" color="secondary" onClick={()=>onDelete(blogId,comment._id)}>Delete</Button>
            </div>)} */}


<Dialog open={editMode} onClose={handleCancel}>
        <DialogTitle>Edit Comment</DialogTitle>
        <DialogContent>
          <TextField
            value={content}
            onChange={(e) => setContent(e.target.value)}
            style={{ width: '100%' }}
          />
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="primary" onClick={handleSave}>
            Save
          </Button>
          <Button variant="outlined" color="secondary" onClick={handleCancel}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
        </CardContent>
    </Card>
  )
}

export default Comment
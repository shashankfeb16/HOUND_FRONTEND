import { Button, Card, CardContent, Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux';

function Comment({comment,onEdit,currentUser,onDelete}) {
  const {user} = useSelector(state=>state.auth);
  console.log(comment);
    const isOwner = comment.commentBy._id === user._id;
  return (
    <Card>
        <CardContent>
            <Typography>{comment.content}</Typography>
            
            {isOwner &&( <div>
                <Button variant="outlined" color="primary" onClick={()=>onEdit(comment._id)}>Edit</Button>
                <Button variant="outlined" color="secondary" onClick={()=>onDelete(comment._id)}>Delete</Button>
            </div>)}
        </CardContent>
    </Card>
  )
}

export default Comment
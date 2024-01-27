import { Button, Card, CardContent, Typography } from '@mui/material'
import React from 'react'

function Comment({comment,onEdit,currentUser,onDelete}) {
    const isOwner = comment.commentBy === currentUser._id;
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
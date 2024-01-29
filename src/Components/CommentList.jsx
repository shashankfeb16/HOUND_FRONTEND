import React from 'react'
import Comment from './Comment'

function CommentList({comments,currentUser,handleEdit,handleDelete}) {
  
  return (
    <div>
        {
            comments?.map((el)=>(
                <Comment
                key={el._id}
                comment={el}
                currentUser={currentUser}
                onEdit={handleEdit}
                onDelete={handleDelete}
                />
            ))
        }
    </div>
  )
}

export default CommentList
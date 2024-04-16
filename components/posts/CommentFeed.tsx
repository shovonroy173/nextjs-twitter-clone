import React from 'react'
import CommentItem from './CommentItem';
interface CommentFeedProps{
    comments?: Record<string , any>[];
};

const CommentFeed: React.FC<CommentFeedProps> = ({comments = []}) => {
    // console.log("LINE AT 8" , comments);
    
  return (
    <div>
        {comments.map((comment: Record<string , any>)=>(
            <CommentItem data={comment} key={comment.id}/>
        ))}
    </div>
  )
}

export default CommentFeed
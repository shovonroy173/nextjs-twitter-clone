import usePosts from '@/hooks/usePosts';
import React from 'react'
import PostItem from './PostItem';
import Avatar from '../Avatar';

interface PostFeedProps{
    userId?: string;
}
const PostFeed: React.FC<PostFeedProps> = ({userId}) => {
    const {data: posts=[]} = usePosts(userId);
    // console.log("LINE AT 10" , posts);
    
    return (
        <>
          { posts && posts?.map((post: Record<string, any>,) => (
            <PostItem userId={userId} key={post.id} data={post} />
          ))}
        </>
      );
}

export default PostFeed
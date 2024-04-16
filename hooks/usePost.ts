import fetcher from "@/libs/fetcher"
import useSWR from "swr"

const usePost = (postId: string)=>{
    const {data , error , isLoading , mutate} = useSWR(postId ?`/api/posts/${postId}` : null , fetcher);

    return {data , error , isLoading , mutate}
};

export default usePost;
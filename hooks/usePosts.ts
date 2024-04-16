import fetcher from "@/libs/fetcher"
import useSWR from "swr"

const usePosts = (userId?: string) =>{
    const {data ,error ,  isLoading , mutate , } = useSWR(userId ? `/api/posts/?userId=${userId}` : '/api/posts' , fetcher);

    return {
        data ,error ,  isLoading , mutate ,
    }
};

export default usePosts;
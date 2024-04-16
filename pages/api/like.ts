import serverAuth from "@/libs/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";
import { useCallback, useMemo } from "react";
import prisma from "@/libs/prismadb"
import toast from "react-hot-toast";
export default async function handler(req: NextApiRequest , res: NextApiResponse) {
    if(req.method !== "POST" && req.method !== "DELETE"){
        return res.status(405).end();
    }
    try {
    const {currentUser} = await serverAuth(req , res);

    const {postId} = req.body;

    if(!postId && typeof postId !== "string"){
        throw new Error("Invalid ID!!");
    }

    const post = await prisma.post.findUnique({
        where:{
            id: postId
        }
    });

    if(!post){
        throw new Error("Invalid ID!!");
    }

    let updatedLikedIds = [...(post.likeIds || [])];

    
        if(req.method === "POST"){
            updatedLikedIds.push(currentUser.id);
            
      // NOTIFICATION PART STARTS HERE
      try {
        const post = await prisma.post.findUnique({
            where:{
                id:postId
            }
        });
        if(post?.userId){
            await prisma.notification.create({
                data:{
                    body:`@${currentUser.username} liked your tweet!!` , 
                    userId: post.userId , 
                }
            });

            await prisma.user.update({
                where:{
                    id:post.userId
                } , 
                data:{
                    hasNotification: true
                }
            });
        }
      } catch (error) {
        console.log(error); 
      }

        }
        if(req.method === "DELETE"){
            updatedLikedIds = updatedLikedIds.filter((id)=> id !== currentUser.id);
            try {
                const post = await prisma.post.findUnique({
                    where:{
                        id:postId
                    }
                });
                if(post?.userId){
                    await prisma.notification.create({
                        data:{
                            body:`@${currentUser.username} disliked your tweet!!` , 
                            userId: post.userId , 
                        }
                    });
        
                    await prisma.user.update({
                        where:{
                            id:post.userId
                        } , 
                        data:{
                            hasNotification: true
                        }
                    });
                }
              } catch (error) {
                console.log(error); 
              }
        }
        const updatedPost = await prisma.post.update({
            where:{
                id: postId
            } , 
            data:{
                likeIds: updatedLikedIds
            }
        });
        return res.status(200).json(updatedPost)
    } catch (error) {
        console.log(error);
        toast.error("Something went wrong!!");
        
    }
}
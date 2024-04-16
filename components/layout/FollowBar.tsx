import React from 'react'
import Avatar from '../Avatar'
import useUsers from '@/hooks/userUsers'
import useCurrentUser from '@/hooks/useCurrentUser';

const FollowBar = () => {
  const {data:currentUser} = useCurrentUser();

  const {data: users = []} = useUsers();
  // console.log(users);
  
  if (users.length === 0) {
    return null;
  }
  const commonUsers = users.filter((item:any)=> item.id !== currentUser?.id)
  return (
    <div className="px-6 py-4 hidden lg:block">
    <div className="bg-neutral-800 rounded-xl p-4">
      <h2 className="text-white text-xl font-semibold">Who to follow</h2>
      <div className="flex flex-col gap-6 mt-4">
        {commonUsers.map((user: Record<string, any>) => (
          <div key={user.id} className="flex flex-row gap-4">
            <Avatar userId={user.id} />
            <div className="flex flex-col">
              <p className="text-white font-semibold text-sm">{user.name}</p>
              <p className="text-neutral-400 text-sm">@{user.username}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
  )
}

export default FollowBar
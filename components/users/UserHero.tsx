import useUser from '@/hooks/useUser'
import Image from 'next/image';
import React from 'react';

import Avatar from '../Avatar';

interface UserHeroProps{
    userId: string
}
const UserHero: React.FC<UserHeroProps> = ({userId}) => {
    const {data: fetchedUser } = useUser(userId);
    
  return (
    <div >
        <div className='bg-neutral-700 h-44 w-full relative'>
            {fetchedUser?.coverImage && (
                <Image src={fetchedUser.coverImage} fill alt='Cover Image' style={{ objectFit: 'cover' }}/>
            )}
            CoverImage
        </div>
        <div className='-mt-14 ml-5'>
            <Avatar userId={userId} isLarge hasBorder/>
        </div>
    </div>
  )
}

export default UserHero
import { useRouter } from 'next/router'
import React from 'react'
import { BsTwitterX } from 'react-icons/bs'

const SidebarLogo = () => {
  const router = useRouter();
  return (
    <div className='rounded-full h-14 w-14 flex items-center justify-center hover:bg-slate-300  hover:bg-opacity-10   cursor-pointer' onClick={()=> router.push("/")}>
     <BsTwitterX size={28} color='white'/>
    </div>
  )
}

export default SidebarLogo
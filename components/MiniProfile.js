import React from 'react'
import { signIn, useSession, signOut } from 'next-auth/react';

const MiniProfile = () => {
  const {data: session} = useSession();

  const defaultImg = 'https://t4.ftcdn.net/jpg/02/15/84/43/240_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg'
  return (
    <div className='flex items-center justify-between mt-14 ml-10'>
      <img
        src={session? session?.user?.image : defaultImg }
        alt=""
        className='rounded-full border w-16 h-16 p-[2px]'  
      />
      <div className='flex-1 mx-4'>
        <h2 className='font-bold'>
          {session?.user?.username}
        </h2>
        <h3 className='text-sm text-gray-400'>
          Welcome!
        </h3>
      </div>
      <button className='text-blue-400 text-sm font-semibold' onClick={signOut}>
        Sign Out
      </button>
    </div>
  )
}

export default MiniProfile
import React from 'react'
import { useEffect, useState } from 'react';
import { randUser } from '@ngneat/falso';

const Suggestions = () => {
  const [ suggestions, setSuggestions ] = useState( [] );
  
  useEffect( () => {
    const fakeSuggestions = [ ...Array( 6 ) ].map( ( _, i ) => {
      const user = randUser();
      user.id = i;
      user.img += `?img=${i+5}`;
      return user;
    } );
    setSuggestions( fakeSuggestions );
  }, [] );

  return (
    <div className='mt-4 ml-10'>
      <div className='flex justify-between text-sm mb-5'>
        <h3 className='text-sm font-semibold text-gray-400'>Suggestions for you</h3>
        <button className='text-gray-600 font-semibold'>See All</button>
      </div>

      {
        suggestions.map( ( profile, i ) => (
          <div key={ i } className='flex items-center justify-between mt-3'>
            <img
              src={ profile.img }
              alt=""
              className='rounded-full border w-10 h-10 p-[2px]'
            />
            <div className='flex-1 mx-4'>
              <h2 className='font-semibold text-sm'>
                { profile.username }
              </h2>
              <h3 className='text-xs text-gray-400 truncate w-40'>
                Lives at {profile.address.city}. {profile.address.country}
              </h3>
            </div>
            <button className='text-blue-400 text-sm font-semibold'>
              Follow
            </button>
          </div>
        ) )
    }

    </div>

  )
}

export default Suggestions
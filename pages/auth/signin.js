import React from 'react'
import {getProviders, signIn as signInProvider} from 'next-auth/react'
import Header from '../../components/Header';


// Browser
function signIn({providers}) {
  return (
    
    <>
      <Header />
      <div className='flex flex-col items-center justify-center min-h-screen py-2 -mt-56 mx-14 text-center'>
        <img
          className='w-80'
          src="https://links.papareact.com/ocw" alt="" />
        <p className='font-xs italic'>
          This is not a <b>REAL</b> app, it's just a mockup for the demo my developer skills and portfolio.
        </p>

        <div className="mt-40">
          {
            Object.values( providers ).map( provider => (
              <div key={ provider.name }>
                <button
                  className='p-3 bg-blue-500 rounded-lg text-white'
                  onClick={ () => signInProvider( provider.id, {callbackUrl: '/'} ) }>
                  Sign in with { provider.name }
                </button>
              </div>
            ) )
              }
        </div>
      </div>
    </>
  )
}


// Server side rendering
export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
}

export default signIn
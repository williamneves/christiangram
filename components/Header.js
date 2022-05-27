// import Image from 'next/dist/client/image';
import {
	SearchIcon,
	MenuIcon,
} from '@heroicons/react/outline';
// import { useSession, signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import { modalState } from '../atoms/modalAtom';
import { useRecoilState } from 'recoil';
import { BiBible, BiEdit } from 'react-icons/bi';
import{TiMessages} from 'react-icons/ti';
import {FaChurch} from 'react-icons/fa';

export default function Header({}) {
	const { data: session } = useSession();
	const router = useRouter();
	const [open, setOpen] = useRecoilState(modalState);

	console.log(session);

	return (
		<>
			<div className='sticky lg:static top-0 shadow-sm border-b bg-white stucky z-50'>
				<div className='flex justify-between bg-white max-w-5xl mx-5 lg:mx-auto md:px-3 lg:px-0'>
					{/* Left */}
					<div
						onClick={() => router.push('/')}
						className='relative hidden lex-shrink-0 mt-3 lg:grid grid-flow-col auto-cols-max gap-2 pl h-10 w-30 cursor-pointer'>
						<BiBible className='grid self-center text-yellow-700 h-10 w-8' />
						{/* <Image src='https://links.papareact.com/ocw' layout='fill' objectFit='contain' /> */}
						<h3 className='self-center font-semibold text-gray-600'>Christiangram</h3>
					</div>
					<div
						onClick={() => router.push('/')}
						className='relative lg:hidden flex-shrink-0 h-10 w-10 cursor-pointer mt-4'>
						{/* <Image src='https://links.papareact.com/jjm' layout='fill' objectFit='contain' /> */}
						<BiBible className='grid self-center text-yellow-700' />
					</div>

					{/* Middle */}
					<div className='max-w-xs '>
						<div className='relative p-3 rounded-md mt-1'>
							<div className='absolute inset-y-0 pl-3 flex items-center pointer-events-none'>
								<SearchIcon className='h-5 w-5 text-gray-500' />
							</div>
							<input
								className='bg-gray-50 block w-full pl-10 sm:text-sm border-gray-300 focus:ring-black focus:border-black rounded-md'
								type='text'
								placeholder='search'
							/>
						</div>
					</div>

					{/* Right */}
					<div className='flex items-center space-x-4'>
						<FaChurch onClick={() => router.push('/')} className='navBtn w-7 self-center' />
						<MenuIcon className='h-7 flex-shrink-0 md:hidden cursor-pointer' />

						{session && (
							<>
								<BiEdit onClick={() => setOpen(true)} className='navBtn h-7 w-7 self-center' />
								<div className='relative navBtn group'>
									<TiMessages className='self-center navBtn group-hover:scale-100 h-7 w-7' />
									<div className='absolute -top-2 -right-2 text-xs w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-white group-hover:animate-bounce hove'>
										2
									</div>
								</div>
								{/* <UserGroupIcon className='navBtn' /> */}
								{/* <HeartIcon className='navBtn' /> */}
								<img
									onClick={signOut}
									src={session?.user?.image}
									className='h-10 rounded-full cursor-pointer'
									alt=''
								/>
							</>
						)}

						{!session && (
							<>
								<button onClick={signIn}>Sign in</button>
							</>
						)}
					</div>
				</div>
			</div>
		</>
	);
}

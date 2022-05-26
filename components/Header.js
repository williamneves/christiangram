import Image from 'next/dist/client/image';
import {
	SearchIcon,
	PlusCircleIcon,
	UserGroupIcon,
	HeartIcon,
	PaperAirplaneIcon,
	MenuIcon,
} from '@heroicons/react/outline';
import { HomeIcon } from '@heroicons/react/solid';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import { modalState } from '../atoms/modalAtom';
import { useRecoilState } from 'recoil';

export default function Header({}) {
	const { data: session } = useSession();
	const router = useRouter();
	const [open, setOpen] = useRecoilState(modalState);

	console.log(session);

	return (
		<>
			<div className='sticky lg:static top-0 shadow-sm border-b bg-white stucky z-50'>
				<div className='flex justify-between bg-white max-w-5xl mx-5 lg:mx-auto'>
					{/* Left */}
					<div
						onClick={() => router.push('/')}
						className='relative hidden lex-shrink-0 mt-3 lg:inline-grid h-10 w-24 cursor-pointer '>
						<Image src='https://links.papareact.com/ocw' layout='fill' objectFit='contain' />
					</div>
					<div
						onClick={() => router.push('/')}
						className='relative lg:hidden flex-shrink-0 h-10 w-10 cursor-pointer mt-3'>
						<Image src='https://links.papareact.com/jjm' layout='fill' objectFit='contain' />
					</div>

					{/* Middle */}
					<div className='max-w-xs'>
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
						<HomeIcon onClick={() => router.push('/')} className='navBtn' />
						<MenuIcon className='h-6 flex-shrink-0 md:hidden cursor-pointer' />

						{session && (
							<>
								<div className='relative navBtn group'>
									<PaperAirplaneIcon className='navBtn group-hover:scale-100 rotate-45' />
									<div className='absolute -top-2 -right-1 text-xs w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white group-hover:animate-bounce hove'>
										2
									</div>
								</div>
								<PlusCircleIcon onClick={() => setOpen(true)} className='navBtn' />
								<UserGroupIcon className='navBtn' />
								<HeartIcon className='navBtn' />
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

import Head from 'next/head';
import { useUserData } from '../../lib/hooks';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import {
	setDoc,
	doc,
	getDoc,
} from 'firebase/firestore';
import { db } from '../../firebase';
import { userDbState, loadingUserState } from '../../atoms/userDbAtom';
import { useRecoilState } from 'recoil';
import { SpinnerDotted } from 'spinners-react';


export default function CreateAccount() {
	const [userDb, setUserDb] = useRecoilState(userDbState);
	const [loading, setLoading] = useRecoilState(loadingUserState);

	// const [userDb,  setUserDb] = useState(null);
	const userData = useUserData();
	const router = useRouter();
	const { data: session } = useSession();

	const getUserDb = async () => {
		const docRef = doc(db, 'user', session?.user?.uid);
		const userRef = await getDoc(docRef);
		return userRef.data()
	};


	useEffect(() => {
		if (session) {
			setUserDb(session.user);
		}
	}, [session]);

	const handleSubmit = async (e) => {
		// prevent submit
		e.preventDefault();

		// updateUser
		await setDoc(doc(db, 'user', session?.user?.uid), userDb).then(() => {
			setUserDb(userDb);
			router.push('/');
		});

	};

	return (
		<div className='bg-gray-100 grid place-items-center h-screen'>
			<Head>
				<title>Christiangram - Create Account</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>

			{
        loading ? (<SpinnerDotted enabled={loading} color="rgba(172, 131, 57, 1)" />) :
        ( <section className='max-w-4xl p-6 mx-auto bg-indigo-600 rounded-md shadow-md dark:bg-gray-800'>
				<h1 className='text-xl font-bold text-white capitalize dark:text-white'>
					Account settings
				</h1>
				<form onSubmit={handleSubmit}>
					<div className='grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2'>
						<div>
							<label className='text-white dark:text-gray-200' for='username'>
								Choose an username
							</label>
							<input
								value={userDb?.username}
								onChange={(e) => {
									setUserDb({ ...userDb, username: e.target.value });
								}}
								id='username'
								type='text'
								className='inputCreateUser'
							/>
						</div>

						<div>
							<label className='text-white dark:text-gray-200' for='emailAddress'>
								Your Name
							</label>
							<input
								value={userDb?.name}
								onChange={(e) => setUserDb({ ...userDb, name: e.target.value })}
								id='emailAddress'
								type='text'
								className='inputCreateUser'
							/>
						</div>
						<div>
							<label className='text-white dark:text-gray-200' for='passwordConfirmation'>
								Date of Birth
							</label>
							<input
								value={userDb?.dob}
								onChange={(e) => setUserDb({ ...userDb, dob: e.target.value })}
								id='date'
								type='date'
								className='inputCreateUser'
							/>
						</div>
						<div>
							<label className='text-white dark:text-gray-200' for='passwordConfirmation'>
								Short Bio
							</label>
							<textarea
								value={userDb?.bio}
								onChange={(e) => setUserDb({ ...userDb, bio: e.target.value })}
								id='textarea'
								type='textarea'
								className='inputCreateUser'></textarea>
						</div>
						<div className='justify-self-center self-center'>
							<label className='text-white dark:text-gray-200' for='passwordConfirmation text-sm'>
								Preview Image
							</label>
							<img
								src={userDb?.image}
								alt=''
								className='rounded-full border mt-2 w-50 h-50 p-[2px]'
							/>
						</div>
						<div>
							<label className='block text-sm font-medium text-white'>Profile Image Upload</label>
							<div className='mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md'>
								<div className='space-y-1 text-center'>
									<svg
										className='mx-auto h-12 w-12 text-white'
										stroke='currentColor'
										fill='none'
										viewBox='0 0 48 48'
										aria-hidden='true'>
										<path
											d='M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02'
											stroke-width='2'
											stroke-linecap='round'
											stroke-linejoin='round'
										/>
									</svg>
									<div className='flex text-sm text-gray-600'>
										<label
											for='file-upload'
											className='relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500'>
											<span className=''>Upload a file</span>
											<input id='file-upload' name='file-upload' type='file' className='sr-only' />
										</label>
										<p className='pl-1 text-white'>or drag and drop</p>
									</div>
									<p className='text-xs text-white'>PNG, JPG, GIF up to 10MB</p>
								</div>
							</div>
						</div>
					</div>

					<div className='flex justify-end mt-6'>
						<button className='px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-yellow-600 rounded-md hover:bg-yellow-700 focus:outline-none focus:bg-gray-600'>
							Save
						</button>
					</div>
				</form>
			</section>)}
		</div>
	);
}

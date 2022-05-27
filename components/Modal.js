import { Dialog, Transition } from '@headlessui/react';
import { CameraIcon, CloudUploadIcon } from '@heroicons/react/outline';
import { modalState } from '../atoms/modalAtom';
import { useRecoilState } from 'recoil';
import { Fragment, useRef, useState } from 'react';
import { collection, addDoc, serverTimestamp, updateDoc, doc, getDoc } from 'firebase/firestore';
import { db, storage } from '../firebase';
import { useSession } from 'next-auth/react';
import { ref, getDownloadURL, uploadString } from '@firebase/storage';
import { SpinnerRoundFilled } from 'spinners-react';

function Modal() {
	const [open, setOpen] = useRecoilState(modalState);
	const filePickerRef = useRef(null);
	const captionRef = useRef(null);
	const [selectedFile, setSelectedFile] = useState(null);
	const [caption, setCaption] = useState('');
	const [loading, setLoading] = useState(false);
	const { data: session } = useSession();

	const uploadPost = async () => {
		if (loading) return;
		setLoading(true);

		// 1 - Create a post in firestore db 'posts' collection
		// 2 - get the post ID for the newly created post
		// 3 - upload the image to firebase storage with the post ID as the file name
		// 4 - get the download URL for the image and update the original post

		const userRef = await getDoc(doc(db, 'user', session?.user?.uid));

		const docRef = await addDoc(collection(db, 'posts'), {
			username: userRef.data().username,
			caption: captionRef.current.value,
			profileImg: userRef.data().image,
			timestamp: serverTimestamp(),
		});

		console.log('New doc add with ID: ', docRef.id);

		const imageRef = ref(storage, `post/${docRef.id}/image`);

		await uploadString(imageRef, selectedFile, 'data_url').then(async (snapshot) => {
			const downloadURL = await getDownloadURL(imageRef);
			await updateDoc(doc(db, 'posts', docRef.id), {
				image: downloadURL,
			});
		});
		setOpen(false);
		setLoading(false);
		setSelectedFile(null);
	};

	const addImageToPost = (e) => {
		const reader = new FileReader();
		if (e.target.files[0]) {
			reader.readAsDataURL(e.target.files[0]);
		}
		reader.onload = (readerEvent) => {
			setSelectedFile(readerEvent.target.result);
		};
	};

	return (
		<>
			<Transition.Root show={open} as={Fragment}>
				<Dialog
					as='div'
					className='fixed z-10 inset-0 overflow-y-auto'
					onClose={() => setOpen(false)}>
					<div className='flex items-end justify-center min-h-[800px] sm:min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
						<Transition.Child
							as={Fragment}
							enter='ease-out duration-300'
							enterFrom='opacity-0'
							enterTo='opacity-100'
							leave='ease-in duration-200'
							leaveFrom='opacity-100'
							leaveTo='opacity-0'>
							<Dialog.Overlay className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
						</Transition.Child>

						<span className='hidden sm:inline-block sm:align-middle sm:h-screen' aria-hidden='true'>
							&#8203;
						</span>

						<Transition.Child
							as={Fragment}
							enter='ease-out duration-300'
							enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
							enterTo='opacity-100 translate-y-0 sm:scale-100'
							leave='ease-in duration-200'
							leaveFrom='opacity-100 translate-y-0 sm:scale-100'
							leaveTo='opacity-0 translate-y-4 sm: translate-y-0 sm:scale-95'>
							<div className='inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6'>
								<div>
									{selectedFile && (
										<img
											className='object-contain h-full w-full'
											onClick={() => setSelectedFile(null)}
											src={selectedFile}
											alt=''
										/>
									)}

									{!selectedFile && (
										<div
											onClick={() => filePickerRef.current.click()}
											className='mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 cursor-pointer'>
											<CameraIcon className='h-6 w-6 text-red-600' aria-hidden='true' />
										</div>
									)}
									<div>
										<div className='mt-3 text-center sm:mt-5'>
											<Dialog.Title as='h3' className='text-lg leading-6 font-medium text-gray-900'>
												Upload a photo
											</Dialog.Title>
											<div>
												<input ref={filePickerRef} type='file' hidden onChange={addImageToPost} />
											</div>
											<div className='mt-2'>
												<input
													className='border-none focus:ring-0 w-full text-center'
													ref={captionRef}
													type='text'
													placeholder='Please enter a caption'
												/>
											</div>
										</div>
									</div>
									<div className='mt-5 sm:mt-6'>
										<button
											onClick={uploadPost}
											type='button'
											disabled={!selectedFile}
											className='inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm disabled:bg-gray-300 disabled:cursor-not-allowed hover:disabled:bg-gray-300'>
											{loading ? (
												<>
													<SpinnerRoundFilled size={20} thickness={'160'} color="rgba(255, 255, 255, 1)" speed={'115'} className='mr-3 self-center' /> Uploading...
												</>
											) : (
												<>
												<CloudUploadIcon className='h-5 w-5 self-middle mr-3' aria-hidden='true' />
												 Upload Post
												</>
											)}
										</button>
									</div>
								</div>
							</div>
						</Transition.Child>
					</div>
				</Dialog>
			</Transition.Root>
		</>
	);
}

export default Modal

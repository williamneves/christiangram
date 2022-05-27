import { useState, useEffect, useRef } from 'react';
import {
	BookmarkIcon,
	ChatIcon,
	DotsHorizontalIcon,
	EmojiHappyIcon,
	HeartIcon,
	PaperAirplaneIcon,
} from '@heroicons/react/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/solid';
import { useSession } from 'next-auth/react';
import {
	collection,
	addDoc,
	serverTimestamp,
	updateDoc,
	doc,
	onSnapshot,
	snapsho,
	query,
	orderBy,
	setDoc,
	deleteDoc,
} from 'firebase/firestore';
import { db, storage } from '../firebase';
import Moment from 'react-moment';
import 'moment-timezone';
import { RiHeart2Fill, RiHeart2Line } from 'react-icons/ri'
import { BiMessageSquareDetail,BiEdit } from 'react-icons/bi';

const Post = ({ id, username, userImg, img, caption }) => {
	const { data: session } = useSession();
	const [comments, setComments] = useState([]);
	const [comment, setComment] = useState('');
	const [likes, setLikes] = useState([]);
	const [ hasLiked, setHasLiked ] = useState( false );
	const postCommentRef = useRef(null);

	const sendComment = async (e) => {
		e.preventDefault();
		const commentToSent = comment;
		setComment('');

		await addDoc(collection(db, 'posts', id, 'comments'), {
			comment: commentToSent,
			username: session.user.username,
			userImage: session.user.image,
			timestamp: serverTimestamp(),
		});
	};
	// EFFECTS
	useEffect(
		() =>
			onSnapshot(
				query(collection(db, 'posts', id, 'comments'), orderBy('timestamp', 'desc')),
				(snapshot) => setComments(snapshot.docs)
			),
		[db]
	);

	useEffect(
		() => onSnapshot(collection(db, 'posts', id, 'likes'), (snapshot) => setLikes(snapshot.docs)),
		[db]
	);

	useEffect(() => {
		setHasLiked(likes.findIndex((like) => like.id === session?.user?.uid) !== -1);
	}, [likes]);

	// Functions
	const likePost = async () => {
		if (hasLiked) {
			await deleteDoc(doc(db, 'posts', id, 'likes', session.user.uid));
		} else {
			await setDoc(doc(db, 'posts', id, 'likes', session.user.uid), {
				username: session.user.username,
			});
		}
	};

	const focusComment = () => {
		postCommentRef.current.focus();
	};

	// Render page
	return (
		<div className='bg-white my-7 border rounded-sm'>
			{/* Header */}
			<div className='flex items-center p-5'>
				<img
					src={userImg}
					alt=''
					className='rounded-full h-12 w-12 object-contain border p-1 mr-3'
				/>
				<p className='flex-1 font-bold '>{username}</p>
				<DotsHorizontalIcon className='h-5 cursor-pointer' />
			</div>

			{/* img */}
			<img src={img} alt='' className='w-full border-y object-cover' />

			{/* Buttons */}
			<div className='flex justify-between px-4 pt-4'>
				<div className='flex space-x-4'>
					{hasLiked ? (
						<RiHeart2Fill className='btn text-red-600' onClick={likePost} />
					) : (
						<RiHeart2Line onClick={likePost} className='btn ' />
					)}
					<BiMessageSquareDetail className='btn' onClick={focusComment} />
					{/* <PaperAirplaneIcon className='btn' /> */}
				</div>
				{/* <BookmarkIcon className='btn' /> */}
			</div>

			{/* Caption */}
      <div className={`${likes.length > 0 ?'mt-1':'mt-4'} border-b `}>
        {
          likes.length > 0 && (
            <p className='text-gray-600 font-bold -mb-1 pl-3 -mt-1 text-sm'>
              { likes.length } { likes.length === 1 ? 'like' : 'likes' }
            </p>
          )
        }
				<p className='text-sm text-gray-600 p-4 truncate'>
					<span className='font-bold mr-1'>{username}</span> {caption}
				</p>
			</div>

			{/* Comments */}
			{session && comments.length > 0 && (
				<div className='pl-10 h-21 pt-3 bg-gray-50 overflow-y-scroll scrollbar-thumb-black scrollbar-thin'>
					{comments.map((comment) => (
						<div key={comment.id} className='flex items-center space-x-2 mb-3'>
							<img className='rounded-full h-7' src={comment.data().userImage} alt='' />
							<p className='text-sm flex-1'>
								<span className='font-bold'>{comment.data().username} </span>
								{comment.data().comment}
							</p>
							<Moment fromNow className='pr-5 text-xs '>
								{comment.data().timestamp?.toDate()}
							</Moment>
						</div>
					))}
				</div>
			)}

			{/* Input box */}
			{session && (
				<form action='' className='flex items-center p-4 border-t'>
					<EmojiHappyIcon className='h-7' />
					<input
						value={comment}
						onChange={(e) => setComment(e.target.value)}
						type='text'
						className='border-none flex-1 focus:ring-0 outline-none'
						placeholder='Leave a comment...'
						ref={postCommentRef}
					/>
					<button
						type='submit'
						onClick={sendComment}
						disabled={!comment.trim()}
						className='font-semibold text-blue-500'>
						Post
					</button>
				</form>
			)}
		</div>
	);
};

export default Post;

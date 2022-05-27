import { collection, onSnapshot, query, orderBy, limit } from '@firebase/firestore';
import { useState, useEffect } from 'react';
import { db } from '../firebase';
import Post from './Post';

const Posts = () => {
	const [posts, setPosts] = useState([]);
	const [ pagination, setPagination ] = useState( 10 );
	const [totalPosts, setTotalPosts] = useState(0);

	useEffect(
		() =>
			onSnapshot(
				query(collection(db, 'posts'), orderBy('timestamp', 'desc'), limit(pagination)),
				(snapshot) => {
					setPosts(snapshot.docs);
				}
			),
		[db, pagination]
	);
	useEffect(
		() =>
			onSnapshot(
				query(collection(db, 'posts')),
				(snapshot) => {
					setTotalPosts(snapshot.docs.length);
				}
			),
		[db, pagination]
	);

	useEffect(() => {
		const onScroll = function () {
			if ( window.innerHeight + window.scrollY >= document.body.offsetHeight && pagination <= totalPosts ) {
				setPagination(pagination + 5)
				// console.log("you're at the bottom of the page");
			}
		};
		window.addEventListener('scroll', onScroll);
		return () => window.removeEventListener('scroll', onScroll);
	}, [pagination]);

	return (
		<div>
			{posts.map((post) => (
				<Post
					key={post.id}
					id={post.id}
					username={post.data().username}
					userImg={post.data().profileImg}
					img={post.data().image}
					caption={post.data().caption}
				/>
			))}
			{/* <h1 onClick={() => setPagination(pagination + 1)} className='cursor-pointer'>
				more...
			</h1> */}
		</div>
	);
};

export default Posts;

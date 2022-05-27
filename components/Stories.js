import { useEffect, useState } from 'react';
import { randUser } from '@ngneat/falso';
import Story from './Story';
import { useSession } from 'next-auth/react';
import {useRouter} from 'next/router';

export default function Stories({}) {
	const [suggestions, setSuggestions] = useState([]);
	const [ count, setCount ] = useState( 0 );
	const router = useRouter();

	const { data: session } = useSession();

	useEffect(() => {
		const fakeSuggestions = [...Array(20)].map((_, i) => {
			const user = randUser();
			user.id = i;
			user.img += `?img=${i}`;
			return user;
		});
		// console.log(fakeSuggestions);
		setSuggestions(fakeSuggestions);
	}, []);

	return (
		<div className='storiesAvatar h-22 scrollbar-thin scrollbar-thumb-yellow-600 scrollbar-track-yellow-100 overflow-y-scroll scrollbar-thumb-rounded-full scrollbar-track-rounded-full'>
			{session && <Story img={session?.user?.image} username={session?.user?.username} />}
			{suggestions.map((profile, i) => (
				<Story key={i} img={profile.img} username={profile.username} />
			))}
		</div>
	);
}

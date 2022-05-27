import { useEffect, useState } from 'react';
import { db } from '../firebase';
import { useSession } from 'next-auth/react';
import { doc, getDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { userDbState, loadingUserState } from '../atoms/userDbAtom';
import { useRecoilState } from 'recoil';

// Custom hook to read  auth record and user profile doc
export function useUserData() {
	const router = useRouter();
	const { data: session } = useSession();
	const [userDb, setUserDb] = useRecoilState(userDbState);
	const [loading, setLoading] = useRecoilState(loadingUserState);

	const hasUser = async () => {
		const docRef = doc(db, 'user', session?.user?.uid);
		const docSnap = await getDoc(docRef);

		if (docSnap.exists()) {
			setUserDb(docSnap.data());
			router.push('/');
		} else {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (session) {
			hasUser();
		}
	}, [session]);

	return;
}

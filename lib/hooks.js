import { useEffect, useState } from 'react';
import { db, storage, app } from '../firebase';
import { useSession } from 'next-auth/react';
import { collection, addDoc, setDoc, serverTimestamp, updateDoc, doc, getDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';

// Custom hook to read  auth record and user profile doc
export function useUserData() {
  const router = useRouter();
	const { data: session } = useSession();
	const [user, setUser] = useState(null);
	const [username, setUsername] = useState(null);

	const hasUser = async () => {
		const docRef = doc(db, 'user', session?.user?.uid);
		const docSnap = await getDoc(docRef);

		if (docSnap.exists()) {
      console.log( 'Document data:', docSnap.data() );
      router.push('/')
		} else {
			// doc.data() will be undefined in this case
      // await setDoc( doc( db, 'user', session?.user?.uid ), {
      //   id: session?.user?.uid,
      //   username: session?.user?.username,
      //   name: session?.name?.name,
      //   image: session?.user?.image,
      //   email: session?.user?.email,
      //   timestamp: serverTimestamp(),
      // } );
			console.log('No such document!');
		}
  };

  useEffect( () => {
    if ( session ) {
      hasUser();
    }
  }, [session] );
  

	return
}

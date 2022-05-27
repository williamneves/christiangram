import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Header from '../components/Header'
import Feed from '../components/Feed'
import Modal from '../components/Modal'
import { useUserData } from '../lib/hooks';
import { useEffect, useState } from 'react';
import { db } from '../firebase';
import { useSession } from 'next-auth/react';
import { doc, getDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { userDbState, loadingUserState } from '../atoms/userDbAtom';
import { useRecoilState } from 'recoil';


export default function Home() {
  const [userDb, setUserDb] = useRecoilState(userDbState);
  const {data: session} = useSession()

  // const userData = useUserData();

  const hasUser = async () => {
		const docRef = doc(db, 'user', session?.user?.uid);
		const docSnap = await getDoc(docRef);

		if (docSnap.exists()) {
			setUserDb(docSnap.data());
		} else {
			setLoading(false);
		}
	};
  useEffect(() => {
		if (session) {
			hasUser();
		}
	}, [session]);

  return (
    <div className="bg-gray-100">
    <Head>
      <title>Christiangram</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

      {/* Header */ }
      <Modal />
      <Header />
      
      {/* Feed */ }
      <Feed />
      
      {/* Modal */ }
  </div>
  )
}

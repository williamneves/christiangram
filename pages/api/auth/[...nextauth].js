import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { collection, addDoc, serverTimestamp, updateDoc, doc } from 'firebase/firestore';
import { db, storage } from '../../../firebase';
import { useRouter } from 'next/router';


export default NextAuth( {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider( {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    } ),
    // ...add more providers here
  ],
  secret: process.env.NEXT_PUBLIC_SECRET,
  // theme: {
  //   // Customize the look and feel of NextAuth
  //   logo: "/logo.svg",
  //   brandColor: "#0070f3",
  //   colorScheme: "dark",
  // },
  pages: {
    // Customize the pages served for sign in and sign out
    signIn: '/auth/signin',
  },
  callbacks: {
    // Customize the behaviour of the callbacks
		async session({ session, user, token }) {
      console.log('callbacks')
			session.user.username = session.user.name.split(' ').join('').toLocaleLowerCase();
			session.user.uid = token.sub;

			// check if user exists, if not redirect to create new user, if exists, redirect to home
			// const userRef = await db.collection('users').doc(session.user.uid).get();
			// if (!userRef.exists) {
			// 	await db
			// 		.collection('users')
			// 		.doc(session.user.uid)
			// 		.set({
			// 			...session.user,
			// 			createdAt: serverTimestamp(),
			// 			updatedAt: serverTimestamp(),
			// 		});
			// }

			return session;
		},
	},
});
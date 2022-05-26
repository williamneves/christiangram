import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { async } from './../../auth/signin';
export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
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
    signIn: "/auth/signin",
  },
  callbacks: {
    // Customize the behaviour of the callbacks
    async session( { session, user, token } ) {
      session.user.username = session.user.name
        .split( ' ' )
        .join( '' )
        .toLocaleLowerCase()
      session.user.uid = token.sub;

      return session;
    },
  }
})
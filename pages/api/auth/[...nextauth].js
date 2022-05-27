import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"



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
    newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
  },
  callbacks: {
    // Customize the behaviour of the callbacks
		async session({ session, user, token }) {
			session.user.uid = token.sub;

			return session;
		},
	},
});
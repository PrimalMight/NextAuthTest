import { PrismaAdapter } from '@next-auth/prisma-adapter';
import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import prisma from '../../../lib/prismadb';

var bcrypt = require('bcryptjs');

export const authOptions: NextAuthOptions = {
   session: {
      strategy: 'jwt',
   },
   adapter: PrismaAdapter(prisma),
   pages: {
      signIn: '/auth/signin',
      // signOut: '/auth/signout',
      error: '/auth/error', // Error code passed in query string as ?error=
      // verifyRequest: '/auth/verify-request', // (used for check email message)
      // newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
   },
   providers: [
      CredentialsProvider({
         name: 'Credentials',
         credentials: {},
         async authorize(credentials) {
            const { email, password } = credentials as {
               email: string;
               password: string;
            };

            const user = await prisma?.user.findUnique({
               where: { email: email },
            });
            if (!user) return null;

            const hash: any = user?.password;
            const check = bcrypt.compareSync(password, hash);

            if (check) {
               console.log('user: ', user, 'just logged in.');
               return { id: user?.id, name: user?.name, email: user?.email };
            } else {
               return null;
            }
         },
      }),
   ],
   callbacks: {
      async redirect({ url, baseUrl }) {
         // Allows relative callback URLs
         if (url.startsWith('/')) return `${baseUrl}${url}`;
         // Allows callback URLs on the same origin
         else if (new URL(url).origin === baseUrl) return url;
         return baseUrl;
      },
      async jwt({ token, user }) {
         return { ...token, ...user };
      },
      async session({ session, token }) {
         session.user = token;
         return session;
      },
   },
   secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);

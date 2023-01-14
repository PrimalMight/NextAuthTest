import { PrismaAdapter } from '@next-auth/prisma-adapter';
import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import prisma from '../../../lib/prismadb';

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
            // authorize should also have req as second parameter
            const { email, password } = credentials as {
               email: string;
               password: string;
            };

            // Add logic here to look up the user from the credentials supplied
            //console.log('email', email);
            //console.log('password', password);

            if (email === 'john@gmail.com' && password === '123456') {
               return { id: '1234', name: 'John Doe', email: 'john@gmail.com' };
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
   },
   secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);

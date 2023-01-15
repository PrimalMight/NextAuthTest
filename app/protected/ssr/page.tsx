import { authOptions } from '@/auth/[...nextauth]';
import { unstable_getServerSession } from 'next-auth';
import SignIn from '../../auth/signin/page';

async function Protected() {
   const session = await unstable_getServerSession(authOptions);
   if (!session) {
      return <SignIn callback="http://localhost:3000/protected/ssr" />;
   }

   return <div>test ssr auth - logged as: {session?.user?.email}</div>;
}

export default Protected;

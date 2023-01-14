import { unstable_getServerSession } from 'next-auth';
//import { authOptions } from 'pages/api/auth/[...nextauth]';
import { authOptions } from '@/auth/[...nextauth]';
import SignIn from '../../auth/signin/page';

async function Protected() {
   const session = await unstable_getServerSession(authOptions);
   if (!session) {
      return <SignIn callback="http://localhost:3000/protected/ssr" />; // this form of redirect however ends up on landing page again since no callback is given
   }

   return <div>test ssr auth - logged as: {session?.user?.email}</div>;
}

export default Protected;

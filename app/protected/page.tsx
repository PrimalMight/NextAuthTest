'use client';

import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

function Protected(): JSX.Element {
   const { status, data } = useSession();
   const router = useRouter();

   useEffect(() => {
      if (status === 'unauthenticated') {
         router.push('/auth/signin?callbackUrl=/protected');
      }
   }, [status]);

   if (status === 'authenticated') {
      return (
         <>
            <div>
               PROTECTED PAGE - current user:{' '}
               {JSON.stringify(data.user, null, 2)}
            </div>
            <button
               onClick={() => {
                  signOut();
               }}
            >
               Sign out
            </button>
         </>
      );
   }

   return <div>Loading...</div>;
}

export default Protected;

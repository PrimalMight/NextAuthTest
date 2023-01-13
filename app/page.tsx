'use client';

import { signIn, useSession } from 'next-auth/react';

interface Props {}

function Page(props: Props) {
   const { status, data } = useSession();
   const {} = props;

   return (
      <div>
         <h1 className="text-8xl ml-7 mt-7 text-cyan-700">Page</h1>
         {status === 'authenticated' && (
            <div>signed as {JSON.stringify(data.user, null, 2)}</div>
         )}
         {status === 'unauthenticated' && (
            <button
               onClick={() => {
                  signIn();
               }}
            >
               Sign in
            </button>
         )}
      </div>
   );
}

export default Page;

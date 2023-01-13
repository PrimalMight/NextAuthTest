'use client';

import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FormEventHandler, useState } from 'react';

export default function sigin(): JSX.Element {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [error, setError] = useState<any | null>('');

   const searchParams = useSearchParams();
   const callbackUrl = searchParams.get('callbackUrl');
   const router = useRouter();

   const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
      e.preventDefault();

      const res = await signIn('credentials', {
         email: email,
         password: password,
         redirect: false,
         callbackUrl: callbackUrl ? callbackUrl : '/',
      });
      if (res) {
         setError(res.error);

         if (res.status === 200) {
            router.push(callbackUrl ? callbackUrl : '/');
         }
      }
      console.log(res);
   };

   return (
      <div>
         <form onSubmit={handleSubmit}>
            <input
               type="email"
               placeholder="email"
               value={email}
               onChange={(e) => setEmail(e.target.value)}
            ></input>
            <input
               type="password"
               placeholder="password"
               value={password}
               onChange={(e) => setPassword(e.target.value)}
            ></input>
            <button type="submit">Sign in</button>
         </form>
         {error && (
            <div className="text-red-600">Email or password is incorrect.</div>
         )}
      </div>
   );
}

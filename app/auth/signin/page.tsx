'use client';

import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FormEventHandler, useState } from 'react';

// can be used as page to router.push on, or as component in case of ssr (see /protected/ssr)
// if used as component, pass callback prop to redirect to after login, if used as page, just pass callbackUrl in query
export default function SignIn(props: any): JSX.Element {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [error, setError] = useState<any | null>('');

   const searchParams = useSearchParams();
   let callbackUrl = searchParams.get('callbackUrl');
   const router = useRouter();

   const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
      e.preventDefault();
      if (props.callback) {
         callbackUrl = props.callback;
      }

      const res = await signIn('credentials', {
         email: email,
         password: password,
         redirect: false, // this bugs when bad login
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

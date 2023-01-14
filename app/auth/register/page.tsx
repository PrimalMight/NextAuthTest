'use client';

import { useState } from 'react';

export default function Register() {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');

   return (
      <>
         <div>Register form</div>
         <form>
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
            <button type="submit">Register</button>
         </form>
      </>
   );
}

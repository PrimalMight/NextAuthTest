'use client';

import { useState } from 'react';

export default function Register() {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [name, setName] = useState('');

   const handleSubmit = async (e: any) => {
      e.preventDefault();
      const res = await fetch('/api/registration', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({
            email: email,
            name: name,
            password: password,
         }),
      });
      const data = await res.json();
      console.log(data);
   };

   return (
      <>
         <div>Register form</div>
         <form onSubmit={handleSubmit}>
            <input
               type="email"
               placeholder="email"
               value={email}
               onChange={(e) => setEmail(e.target.value)}
            ></input>
            <input
               type="name"
               placeholder="name"
               value={name}
               onChange={(e) => setName(e.target.value)}
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

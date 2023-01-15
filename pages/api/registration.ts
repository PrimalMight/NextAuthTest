// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

var bcrypt = require('bcryptjs');

export default async function handler(
   req: NextApiRequest,
   res: NextApiResponse
) {
   if (req.method === 'POST') {
      const { email, name, password } = req.body;
      const hash = bcrypt.hashSync(password, 10);

      try {
         const user = await prisma?.user.create({
            data: {
               email: email,
               name: name,
               password: hash,
            },
         });
         res.status(200).json({ email: email });
      } catch (err: any) {
         if (err.code === 'P2002')
            res.status(500).json({ msg: 'Email is already in use.' });
         else res.status(500).json({ msg: 'Something went wrong.' });
      }
   } else {
      res.status(405).json({ msg: 'Method not allowed' });
   }
}

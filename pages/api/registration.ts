// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import bcrypt from 'bcrypt';
import type { NextApiRequest, NextApiResponse } from 'next';

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
      } catch (err) {
         console.log('err', err);
         res.status(500).json({ msg: 'Internal server error' });
      }
   } else {
      res.status(405).json({ msg: 'Method not allowed' });
   }
}

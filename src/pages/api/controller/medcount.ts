import {prisma} from '../db'
import { NextApiRequest, NextApiResponse } from 'next';
export default async function handle(req:NextApiRequest, res:NextApiResponse) {
  if (req.method === 'PATCH') {
    try {
      
        const {id} = req.body;
        const medicine = await prisma.medicine.findUnique({
            where: {
            id: id,
            },
        });
        const count = medicine?.quantity;
        res.status(200).json(count);
        } catch (error) {
        res.status(500).json({ error: 'Unable to fetch medicine' });
    }
    }
    else {
    res.status(405).json({ error: 'Method not allowed' });
    }
}

import {prisma} from '../db'
import { NextApiRequest, NextApiResponse } from 'next';
export default async function handle(req:NextApiRequest, res:NextApiResponse) {
  if (req.method === 'GET') {
    try {
        console.log("serverr");
      const medicine = await prisma.medicine.findMany();
      console.log(medicine);
      res.status(200).json(medicine);
    } catch (error) {
      res.status(500).json({ error: 'Unable to fetch medicine' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}


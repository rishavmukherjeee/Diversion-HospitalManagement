import {prisma} from '../db'
import { NextApiRequest, NextApiResponse } from 'next';
export default async function handle(req:NextApiRequest, res:NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const
      {
        name,
        quantity,
        price,
        nextRefill,
      } = req.body;
      console.log("serverr");
      const medicine = await prisma.medicine.create({
        data: {
          name,
          quantity,
          price,
          nextRefill,
        },

      }
      );
      
      console.log(medicine);
      res.status(201).json("Medicine created sucessfully");
      
    } catch (error) {
      res.status(500).json({ error: 'Unable to fetch medicine' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}


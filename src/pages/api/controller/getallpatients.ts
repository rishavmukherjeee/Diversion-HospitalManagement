import {prisma} from '../db'
import { NextApiRequest, NextApiResponse } from 'next';
export default async function handle(req:NextApiRequest, res:NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const patients = await prisma.patient.findMany();
      res.status(200).json(patients);
    } catch (error) {
      res.status(500).json({ error: 'Unable to fetch patients' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}

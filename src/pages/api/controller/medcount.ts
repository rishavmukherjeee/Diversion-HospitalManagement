import { prisma } from '../db'
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PATCH') {
    try {
      const { id, newquantity } = req.body;

      // Find the medicine and update the quantity
      const updatedMedicine = await prisma.medicine.update({
        where: {
          id: id,
        },
        data: {
          quantity: newquantity,
        }
      });

      // Return the updated medicine data
      res.status(200).json(updatedMedicine);
    } catch (error) {
      res.status(500).json({ error: 'Unable to update medicine' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}

/*import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function databaseCheck(req: NextApiRequest, res: NextApiResponse) {
  try {
    await prisma.$connect().then(() => {
      res.status(200).json({ status: 'Database connected' })
    }
    )
    
  } catch (error) {
    res.status(500).json({ status: 'Database connection failed' })
  } 
}
*/
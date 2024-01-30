import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

let prisma: PrismaClient;
declare global {
  var prisma: PrismaClient | undefined
}
if (!global.prisma) {
  global.prisma = new PrismaClient();
}

prisma = global.prisma;

export default async function databaseCheck( req: NextApiRequest,res: NextApiResponse) {
  try {
    await prisma.$connect().then(() => {
      res.status(200).json({ status: 'Database connected' })
    }
    )
    
  } catch (error) {
    res.status(500).json({ status: 'Database connection failed' })
  } 
}
export { prisma};
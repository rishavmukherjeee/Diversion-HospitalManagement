import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
  return new PrismaClient()
}

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>
}

const prisma = prismaClientSingleton()


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
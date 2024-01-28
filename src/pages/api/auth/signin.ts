import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


export default async function signin(req:NextApiRequest, res:NextApiResponse) {
    if(req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }
    try{
        console.log("fromserver",req.body);
    const { name, email, password } = req.body;
    const user = await prisma.user.findFirst({
        where: {
            email: email,
        },
    });
    if(user) {
        res.status(400).json({ message: 'User already exists' });

    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
        data: {
            name: name,
            email: email,
            password: hashedPassword,
        },
    });
    const token = jwt.sign({ userId: newUser.id }, process.env.NEXT_PUBLIC_JWT_SECRET||"secrett6", {
        expiresIn: '30d',
    });
    res.json({ token });
}
catch(err){
    console.log(err);
    res.status(500).json({ message: 'Something went wrong' });
}
}

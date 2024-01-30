import {prisma} from '../db'
import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


export default async function signin(req:NextApiRequest, res:NextApiResponse) {
    "use server"
    if(req.method !== 'POST') {
        if(req.method === 'GET'){
            res.status(200).json({ text: 'Hellofrom signin' });
        }
        return res.status(405).json({ message: 'Method not allowed' });
    }
    try{
    
    const { name, email,role, password } = req.body;
    const user = await prisma.user.findFirst({
        where: {
            email: email,
        },
    });
    if(user) {
        res.status(400).json({ message: 'User already exists' });
        console.log("user already exists");
        return;
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
        data: {
            name: name,
            email: email,
            role: role,
            password: hashedPassword,
        },
    });
        if(role=="patient"){
            const newPatient = await prisma.patient.create({
                data: {
                    name: name,
                    user: {
                        connect: {
                            id: newUser.id,
                        },
                    },

                },
            });
            console.log(newPatient);
        }
        else if(role=="nurse"){
            const newNurse = await prisma.nurse.create({
                data: {
                    name: name,
                    user: {
                        connect: {
                            id: newUser.id,
                        },
                    },

                },
            });
            console.log(newNurse);
        }
        else if(role=="retailer"){
            const newRetailer = await prisma.retailer.create({
                data: {
                    name: name,
                    user: {
                        connect: {
                            id: newUser.id,
                        },
                    },

                },
            });
            console.log(newRetailer);
        }
    const secret = process.env.DB_SECRET as string;
    const token = jwt.sign({ userId: newUser.id,name:name, email:email, role:role }, secret, {
        expiresIn: '30d',
    });
    res.json({ token });
}
catch(err){
    console.log(err);
    res.status(500).json({ message: 'Something went wrong' });
}
}

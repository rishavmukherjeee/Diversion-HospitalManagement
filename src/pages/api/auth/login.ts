import {prisma} from '../db'
import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export default async function signin(req:NextApiRequest, res:NextApiResponse) {
    if(req.method !== 'POST') {
        if(req.method === 'GET'){
            res.status(200).json({ text: 'Hello from login' });
        }
        return res.status(405).json({ message: 'Method not allowed' });
    }
    try{
        const { email, password } = req.body;
        let user;
        try{
             user = await prisma.user.findFirst({
                where: {
                    email: email,
                    role:'retailer'||'patient'||'nurse'
                },
            });
        }
        catch(e){
            console.log(e);
        }
        if(user) {console.log("user exists");
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if(isPasswordValid) {
                console.log("password is valid");
                const secret = process.env.DB_SECRET;
                const token = jwt.sign({ userId: user.id,name:user.name, email:email, role:user.role }, secret as string);
                return res.status(200).json({ token });
                }
            else{
                return res.status(401).json({ message: 'Invalid email or password' });
                }
            }
        else{   
            console.log("user does not exist");
            res.status(405).json({ message: 'User does not exist' });
        }
        return res.status(401).json({ message: 'Invalid email or password' });
    }
    catch(e){
        console.log(e);
    }
}

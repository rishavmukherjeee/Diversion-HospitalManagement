import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../utils/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            const { username, email, password } = req.body;

            // Create a new user in the database
            const newUser = await prisma.user.create({
                data: {
                    email,
                    password,
                },
            });

            res.status(201).json({ message: 'User created successfully', user: newUser });
        } catch (error) {
            console.error('Error creating user:', error);
            res.status(500).json({ message: 'Failed to create user' });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}

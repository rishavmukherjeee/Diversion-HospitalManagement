"use client";
import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import jwt from 'jsonwebtoken';
export default function Dashboard() {
    
    let decoded:any;
    const [loading, setLoading] = useState(false); // [1
    const router = useRouter();
    let token:any ;
    if (typeof window !== 'undefined') {
    token= localStorage.getItem('token');}
    const logout = () => {
        localStorage.removeItem('token');
        window.localStorage.removeItem('token');
        router.push('/');
    }
    decoded = jwt.decode(token);
    let rolee=decoded?.role?.charAt(0).toUpperCase()+decoded?.role?.slice(1)+"'s";
    const goto = () => {
        router.push('/home/'+decoded?.role);
    }
    if (!token) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen py-2">
                <h1 className="text-2xl font-bold mb-2">Dashboard</h1>
                <h2 className="text-lg mb-4">You are not logged in</h2>
                <button onClick={logout} className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">Login</button>
            </div>
        )
    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-4xl font-bold mb-2 text-blue-600">Welcome, {decoded.name}</h1>
           
                <div className="flex flex-row justify-between ">
            <button onClick={logout} className="px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-700">Logout</button>
            <div className=" p-4">
                </div>
            <button onClick={goto} className="px-4 py-2 font-bold text-white bg-green-500 rounded hover:bg-green-700">Go to {rolee} Homepage</button>
            </div>
            <div className="mt-8 bg-white p-6 rounded shadow-md w-full md:w-1/2 lg:w-1/3">
                <h2 className="text-lg font-bold mb-2">Token decoded</h2>
                <pre className="p-4 text-sm bg-gray-200 rounded">{JSON.stringify(decoded, null, 2)}</pre>
            </div>
        </div>
    )
}
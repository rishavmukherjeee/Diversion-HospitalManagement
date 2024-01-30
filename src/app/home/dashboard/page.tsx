"use client";
import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
export default function Dashboard() {
    const [loading, setLoading] = useState(false); // [1
    const router = useRouter();
    let token ;
    if (typeof window !== 'undefined') {
    token= localStorage.getItem('token');}
    
    return (
        <div>
            <h1>Dashboard</h1>
            <h2>{token}</h2>
            <button onClick={()=>{
                localStorage.removeItem('token');
                window.localStorage.removeItem('token');
                router.push('/');
            }
            }>Logout</button>
        </div>
    )
}
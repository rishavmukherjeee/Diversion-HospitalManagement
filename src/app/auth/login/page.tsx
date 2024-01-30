"use client"
import { useState } from 'react';
import Image from 'next/image';
import {useRouter}from 'next/navigation';
async function log( email:string, password:string){
  console.log(process.env.NEXT_PUBLIC_API_URL);
  const url=process.env.NEXT_PUBLIC_API_URL+'/api/auth/login';
  const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(
          {  email: email, password: password },
      ),

  });
  const data = await response.json();
  if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
  }
  return data;
}

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const handleSubmit = async(e:any) => {
    e.preventDefault();
    try {
      const data = await log(email,  password);
      localStorage.setItem('token', data.token);
      router.push('/home/dashboard');
      console.log(data);
    } catch (error) {
      console.log(error);
    }


  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12"
     style={{backgroundImage: "url('/protrudingsquares.svg')",   }}>
      
      <div className="w-full sm:w-1/2 p-8">
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 h-full">
                  <div className="flex flex-row items-center justify-center pb-3">
                      <Image
                          className="rounded-full hover:shadow-lg"
                          src="/logo.svg"
                          alt="logo"
                          width={150}
                          height={150}
                      />
                      <h1 className="text-3xl text-black hover:text-orange-700 font-bold mb-8">Hospital Management System</h1>
                  </div>
                  <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                
                </div>
          
          <div className="mb-4 flex items-center">
            <label className="block text-gray-700 text-sm font-bold mb-2 w-1/4" htmlFor="email">
              Email
            </label>
            <input placeholder='Enter your Email' className="shadow appearance-none border rounded w-3/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="mb-6 flex items-center">
            <label className="block text-gray-700 text-sm font-bold mb-2 w-1/4" htmlFor="password">
              Password
            </label>
            <input placeholder='Password' className="shadow appearance-none border rounded w-3/4 py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className="flex items-center justify-between">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
              Log In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

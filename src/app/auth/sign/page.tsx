"use client"
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
async function sign(name:string, email:string,role:string, password:string){
  console.log(process.env.NEXT_PUBLIC_API_URL);
  const url=process.env.NEXT_PUBLIC_API_URL+'/api/auth/signin';
  const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(
          { name: name, email: email,role:role, password: password },
      ),

  });
  const token = await response.json();
  if (!response.ok) {
      throw new Error(token.message || 'Something went wrong');
  }
  return token;
}

export default function Signin() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const router = useRouter();

  const handleSubmit = async(e:any) => {
    e.preventDefault();
    if(name.length>0 && email.length>0 && password.length>0 && role.length>0){
      if(role=="patient" || role=="nurse" || role=="retailer"){
    try {
      const data = await sign(name, email,role, password);
      localStorage.setItem('token', data.token);
      console.log(data);
      console.log(data.token);
      router.push('/home/dashboard');
    } catch (error) {
      console.log(error);
    }}
    else{
      alert("Enter a valid role");
    }}
    else{
      alert("Please fill all the fields");
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
            <label className="block text-gray-700 text-sm font-bold mb-2 w-1/4" htmlFor="name">
              Name
            </label>
            <input placeholder='Enter your Name' className="shadow appearance-none border rounded w-3/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="mb-4 flex items-center">
            <label className="block text-gray-700 text-sm font-bold mb-2 w-1/4" htmlFor="email">
              Email
            </label>
            <input placeholder='Enter your Email' className="shadow appearance-none border rounded w-3/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="mb-4 flex items-center">
            <label className="block text-gray-700 text-sm font-bold mb-2 w-1/4" htmlFor="email">
              Who are you?
            </label>
            <input placeholder='patient/nurse/retailer' className="shadow appearance-none border rounded w-3/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="role" type="text" value={role} onChange={(e) => setRole(e.target.value)} />
          </div>
          <div className="mb-6 flex items-center">
            <label className="block text-gray-700 text-sm font-bold mb-2 w-1/4" htmlFor="password">
              Password
            </label>
            <input placeholder='Password' className="shadow appearance-none border rounded w-3/4 py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className="flex items-center justify-between">
            
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
              Sign In
            </button>
            
          </div>
        </form>
      </div>
    </div>
  );
}

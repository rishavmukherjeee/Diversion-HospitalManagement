"use client"
import React, { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { StateProvider } from './utils/store'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/navigation';
const db =async()=>{
  try{
  const url=process.env.NEXT_PUBLIC_API_URL+'/api/db';
  
  console.log("Connecting database from url ",url);
  const response = await fetch(url, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    

});
const data = await response.json();
console.log(data);
if (!response.ok) {
    throw new Error(data.message || 'Something went wrong');
} 

return data;}
catch(error){
  console.log(error);}
}
  
const App = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      router.push('/home/dashboard');
    }
  }, );
  return (
    <StateProvider>
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12"
     style={{backgroundImage: "url('/protrudingsquares.svg')",   }}>
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
              <div className="block pl-2 font-semibold text-xl self-start text-gray-700  ">
        <div className="relative px-4 py-10 hover:shadow-2xl bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
          <div className="max-w-md mx-auto">
              
                <div className="flex flex-row  justify-center  pb-3">
                
                <Image
                className="rounded-full hover:shadow-lg"
                src="/logo.svg"
                alt="logo"
                width={150}
                height={150}
                />
                </div>
                <div className="flex flex-row  justify-center pb-3">
              
            <h2 className="leading-relaxed">Visionary Diagonostics</h2>
                </div>
            <div className="flex space-x-5">
                <p className="text-sm text-gray-500 font-normal leading-relaxed">
                  This is a Visionary Diagonostics made in mind to make nurses and doctors work easier. 
                  Inlcluding retailing of drugs, keeping track of patients, doctors, and other staffs.
                  It also implements some Machine Learning models.
                  </p>
              </div>
            </div>
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                
              </div>
              <div className="pt-4 flex items-center space-x-4">
                <Link className="flex justify-center items-center w-full text-white px-4 py-3 
                  rounded-md focus:outline-none bg-green-700 hover:bg-green-900 hover:shadow-lg"
                  href='/auth/login'>
                  <button onClick={db} >Log in</button>
                  </Link>
                   <Link 
                  className="flex justify-center items-center w-full text-white px-4 py-3
                   rounded-md focus:outline-none bg-blue-500 hover:bg-blue-700 hover:shadow-lg"
                    href="/auth/sign"> 
                   <button onClick={db} >Sign up</button>

                  </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </StateProvider>
    
    
  );
}

export default App;

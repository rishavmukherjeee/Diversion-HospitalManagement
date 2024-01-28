"use client"
import React,{useState} from 'react';
import Image from 'next/image';

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12"
     style={{backgroundImage: "url('/protrudingsquares.svg')",   }}>
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
              <div className="block pl-2 font-semibold text-xl self-start text-gray-700  ">
        <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
          <div className="max-w-md mx-auto">
              
                <div className="flex flex-row  justify-center  pb-3">
                
                <Image
                className="rounded-full"
                src="/logo.svg"
                alt="logo"
                width={150}
                height={150}
                />
                </div>
                <div className="flex flex-row  justify-center pb-3">
              
            <h2 className="leading-relaxed">Hospital Management System</h2>
                </div>
            <div className="flex space-x-5">
                <p className="text-sm text-gray-500 font-normal leading-relaxed">
                  This is a hospital management system made in mind to make nurses and doctors work easier. 
                  Inlcluding retailing of drugs, keeping track of patients, doctors, and other staffs.
                  It also implements some Machine Learning models.
                  </p>
              </div>
            </div>
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <div className="flex flex-col">
                  <label className="leading-loose">UserID</label>
                  <input type="text" className="px-4 py-2 border 
                  focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300
                   rounded-md focus:outline-none text-gray-600" placeholder="Email/UserID" />
                </div>
                <div className="flex flex-col">
                  <label className="leading-loose">Password</label>
                  <input type="password" onChange={(e)=>setPassword(e.target.value)}
                  className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" placeholder="Password" />
                </div>
              </div>
              <div className="pt-4 flex items-center space-x-4">
                  <button className="flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none bg-blue-500 hover:bg-blue-600 hover:shadow-lg">Log in</button>
                  <button className="flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none bg-blue-500 hover:bg-blue-600 hover:shadow-lg">Sign up</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    
  );
}

export default App;

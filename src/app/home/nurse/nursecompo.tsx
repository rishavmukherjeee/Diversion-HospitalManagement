import React,{useState} from 'react'
import jwt from 'jsonwebtoken';
import { useRouter } from 'next/navigation';
import { decode } from 'punycode';
const NurseCompo = () => {
    
  let token:any ;
  if (typeof window !== 'undefined') {
    token= localStorage.getItem('token');}
    let decoded:any;
    decoded = jwt.decode(token);
    console.log(decoded?.userId);
    
  return (
    <div className='pb-5'> 
      
{//decoded?.userId && <p>Token Decoded: {decoded.userId}</p>
}
{decoded?.name&&<p className=' text-black text-2xl font-extrabold'>Hello, {decoded.name}</p>}
{decoded?.location&&<p>Location: {decoded.location}</p>}
    
    </div>
  )
}

export default NurseCompo;

"use client"
import React, { useState, useEffect } from 'react';
import Compo from './compo';
import Compo2 from './compo2';
interface Patient {
  id: string;
  name: string;
  quantity: string;
  price: string;
  description: string;
  nextRefill: string;
  retailerNo: string;
  retailerId: string;
}

const Patient: React.FC = () => {
 
  
  const vibgyorColors = ['bg-violet-500', 'bg-indigo-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-orange-500', 'bg-red-500'];

  return (
    <div className="flex flex-col md:flex-row">
      <Compo2 />
      
    </div>
  );
}

export default Patient;

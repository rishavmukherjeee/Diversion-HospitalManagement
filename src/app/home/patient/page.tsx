"use client"
import React, { useState } from 'react';
import jwt from 'jsonwebtoken';
import Compo from './compo';
const Patient = () => {
  
    const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event:any) => {
    setSearchTerm(event.target.value);
  };
  
  // Replace this with your own data


  
  const medicines:Medicines = {
    'Medicine 1': [
      { quantity: '10', retailer: 'Retailer 1', location: 'Location 1' },
      { quantity: '120', retailer: 'Retailer 2', location: 'Location 2' },
      { quantity: '30', retailer: 'Retailer 3', location: 'Location 3'},
      { quantity: '40', retailer: 'Retailer 4', location: 'Location 4' },
      { quantity: '50', retailer: 'Retailer 5', location: 'Location 5' },
      // More details for 'Medicine 1' here
    ],
    // More medicines here
  };

  const filteredMedicines = Object.keys(medicines).filter((medicine) =>
    medicine.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    const vibgyorColors = ['bg-violet-500', 'bg-indigo-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-orange-500', 'bg-red-500'];
    return (
      <div className="flex flex-col md:flex-row">
      <div className='flex  '>
      <div className="w-full  p-4 ">
     <Compo/>
      </div>
    </div>
      <div className="w-full md:w-7/10 p-4">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          />
  
        <div className="flex flex-wrap">
          {filteredMedicines.map((medicine, index) => (
            <div key={index} className="w-full  ">
              <h2 className="text-xl font-bold mb-2">{medicine}</h2>
              <div className="flex flex-wrap">
                {medicines[medicine].map((detail, detailIndex) => (
                  <div key={detailIndex} className={`card w-full m-2  md:w-1/2 lg:w-1/3 xl:w-1/4 p-4 mb-4 hover:scale-125 rounded shadow-lg hover:shadow-xl transition-shadow duration-200 ease-in-out ${vibgyorColors[detailIndex % vibgyorColors.length]}`}>
                    <p>Quantity: {detail.quantity}</p>
                    <p>Retailer: {detail.retailer}</p>
                    <p>Location: {detail.location}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
  
  
}  

export default Patient;

interface MedicineDetail {
  quantity: string;
  retailer: string;
  location: string;
}

interface Medicines {
  [key: string]: MedicineDetail[];
}
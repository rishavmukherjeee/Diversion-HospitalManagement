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
  const [searchTerm, setSearchTerm] = useState('');
  const [patients, setPatients] = useState<Patient[]>([]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const fetchData = async () => {
    const url = process.env.NEXT_PUBLIC_API_URL + '/api/controller/getallmeds';
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data: Patient[] = await res.json();
    setPatients(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredPatients = patients.filter((patient) =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const vibgyorColors = ['bg-violet-500', 'bg-indigo-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-orange-500', 'bg-red-500'];

  return (
    <div className="flex flex-col md:flex-row">
      <Compo2 />
      <div className="w-full md:w-7/10 p-4">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />

        <div className="flex flex-wrap">
          {filteredPatients.map((patient, index) => (
            <div key={index} className="w-full">
              <h2 className="text-xl font-bold mb-2">{patient.name}</h2>
              <div className={`card w-full m-2 md:w-1/2 lg:w-1/3 xl:w-1/4 p-4 mb-4 hover:scale-125 rounded shadow-lg hover:shadow-xl transition-shadow duration-200 ease-in-out ${vibgyorColors[index % vibgyorColors.length]}`}>
                {patient.name&&<p>Name: {patient.name}</p>}
                {patient.quantity&&<p>Quantity: {patient.quantity}</p>}
                {patient.price&&<p>Price: {patient.price}</p>}
                {patient.description&&<p>Description: {patient.description}</p>}
                {patient.nextRefill&&<p>Next Refill: {patient.nextRefill}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Patient;

"use client"
import React, { useState, useEffect } from 'react';
import Compo from './compo';
import Image from 'next/image';

const Patient = () => {
  
  const [searchTerm, setSearchTerm] = useState('');
  const [patients, setPatients] = useState([]);

  const fetchData = async () => {
    const url = process.env.NEXT_PUBLIC_API_URL + '/api/controller/getallpatients';
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();
    setPatients(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  
  const filteredPatients = patients.filter((patient) =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
    
  const vibgyorColors = ['bg-violet-500', 'bg-indigo-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-orange-500', 'bg-red-500'];
  
  return (
    <div className="flex flex-col md:flex-row">
      <div className='flex'>
        <div className="w-full p-4 ">
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
          {filteredPatients.map((patient, index) => (
            <div key={index} className="w-full">
              <h2 className="text-xl font-bold mb-2">{patient.name}</h2>
              <div className={`card w-full m-2 md:w-1/2 lg:w-1/3 xl:w-1/4 p-4 mb-4 hover:scale-125 rounded shadow-lg hover:shadow-xl transition-shadow duration-200 ease-in-out ${vibgyorColors[index % vibgyorColors.length]}`}>
                <p>Address: {patient.address}</p>
                <p>Bed Number: {patient.bednumber}</p>
                <p>Details: {patient.details}</p>
                <p>Diet: {patient.diet}</p>
                <p>Drugs Prescribed: {patient.drugsPrescribed}</p>
                {patient.files && patient.files.length > 0 && 
                <>
                <p>Files:</p>
                  <Image src={patient.files[0]} alt="Patient" width={500} height={300} priority/>
                  </>
                  }
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Patient;

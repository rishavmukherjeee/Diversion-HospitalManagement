"use client"
import React, { useState } from 'react';
import jwt from 'jsonwebtoken';
interface MedicineDetail {
  quantity: string;
  retailer: string;
  location: string;
}

interface Medicines {
  [key: string]: MedicineDetail[];
}
const Patient = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [patient, setPatient] = useState({
    name: '',
    details: '',
    address: '',
    bednumber: '',
    appointedNurseId: '',
    appointedDoctor: '',
    diet: '',
    drugsPrescribed: '',
    ereports: '',
    vitalsLastCheck: '',
    files: [],
    hospitalId: '',
  });
  
  let token:any ;
  if (typeof window !== 'undefined') {
  token= localStorage.getItem('token');}
  let decoded:any;
  decoded = jwt.decode(token);
  console.log(decoded.userId);

  const handleChange = (e:any) => {
    setPatient({
      ...patient,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e:any) => {
    e.preventDefault();
    const formData = new FormData();
    for (const property in patient) {
      if (property === 'files') {
        for (const file of patient.files) {
          formData.append('files', file);
        }
      } else {
       
        // @ts-ignore
        formData.append(property, patient[property] );
      }
    }
    const query=decoded.userId;
    const response = await fetch(`/api/controller/patient?id=${query}`, {
      method: 'PUT',
      body: formData,
      
    });
    const data = await response.json();
    console.log(data);
  };
  
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
      <form onSubmit={handleSubmit}>
        <label className='p-1 flex items-center'>
          Details:
          <input placeholder='Details Here' className='ml-3 bg-transparent p-1' type="text" name="details" value={patient.details} onChange={handleChange} />
        </label>
        <label className='p-1 flex items-center'>
          Address:
          <input placeholder='Address Here' className='ml-3 bg-transparent p-1' type="text" name="address" value={patient.address} onChange={handleChange} />
        </label>
        <label className='p-1 flex items-center'>
          Bed No.:
          <input placeholder='Bed Number Here' className='ml-3 bg-transparent p-1' type="text" name="bednumber" value={patient.bednumber} onChange={handleChange} />
        </label>
        <label className='p-1 flex items-center'>
          Diet:
          <input placeholder='Diet Here' className='ml-3 bg-transparent p-1' type="text" name="diet" value={patient.diet} onChange={handleChange} />
        </label>
        <label className='p-1 flex items-center'>
          Drugs:
          <input placeholder='Drugs Here' className='ml-3 bg-transparent p-1' type="text" name="drugsPrescribed" value={patient.drugsPrescribed} onChange={handleChange} />
        </label>
        <label className='p-1 flex items-center'>
          Files:<input className='ml-3 bg-transparent p-1' type="file" multiple name="files" onChange={handleChange} />

        </label>
        {/* Add similar input fields for the other properties */}
        <button className=" mt-16 px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700" type="submit">Submit</button>
      </form>
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

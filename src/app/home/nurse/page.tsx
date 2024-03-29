"use client"
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import NurseCompo from './nursecompo';
import { useRouter } from 'next/navigation';
import {  Button, 
} from  '@nextui-org/react';
interface Patient {
  id: string;
  details: string;
  drugsPrescribed: string;
  address: string;
  bednumber: string;
  diet: string;
  name: string;
  files: string[];
}

const Patient = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [patients, setPatients] = useState<Patient[]>([]);

  const fetchData = async () => {
    const url = process.env.NEXT_PUBLIC_API_URL + '/api/controller/getallpatients';
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
const handlemodalopen = () => {

}
const handlemodalclose = () => {

}
  
  
  const filteredPatients = patients.filter((patient) =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };
  const vibgyorColors = [ 'bg-blue-500', 'bg-green-700'];
  
  return (
    <div className="flex flex-col bg-white md:flex-row ">
      <div className='flex'>
        <div className="w-full p-4 ">
          
          <NurseCompo/>
        </div>
      </div>
      <div className="w-full md:w-7/10  ">
        <input
          type="text"
          placeholder="Search Patients..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full p-2 mt-2 mb-4 border  bg-slate-300 border-gray-300 rounded"
        />
        
        <div className="flex flex-wrap ">
          
          {filteredPatients.map((patient, index) => (
            <div key={index} className='p-10 m-0 md:w-1/4' >

              <h2 className="text-xl text-black font-bold mb-2">{patient.name}</h2>
              
        <Button  onClick={() => {localStorage.setItem('clicked',patient.id);
      router.push('/home/nurse/slug') }}>
              <div className={`card w-full  p-4 mb-4
               hover:scale-125 rounded shadow-lg hover:shadow-xl transition-shadow 
               duration-200 ease-in-out ${vibgyorColors[index % vibgyorColors.length]}`}>
                <p>Click to add or update data</p>
                {patient.address && <p>Ward: {patient.address}</p>}
                {patient.bednumber && <p>Bed Number: {patient.bednumber}</p>}
                {patient.details && <p>Details: {patient.details}</p>}
                {patient.diet && <p>Diet: {patient.diet}</p>}
                {patient.drugsPrescribed && <p>Drugs Prescribed: {patient.drugsPrescribed}</p>}
                {patient.files && patient.files.length > 0 && 
                <>

                <p>Files:</p>
                  <Image src={patient.files[0]} alt="Patient" width={500} height={300} priority/>
                  </>
                  }
              </div>
                  
          </Button>
            </div>
          ))}
          
        
        </div>
      </div>
    </div>
  );
}

export default Patient;

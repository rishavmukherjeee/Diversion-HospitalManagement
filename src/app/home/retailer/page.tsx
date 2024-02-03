"use client"
import React, { useState, useEffect } from 'react';
import Compo from './compo';
import Image from 'next/image';
import MedCompo from './medscompo';
import { Modal, Button, Input,ModalHeader,  ModalBody, ModalFooter
 } from  '@nextui-org/react';

interface Patient {
id:string;
name: string;
quantity: number;
price: number;
description: string;
nextRefill: string;
retailerId: string;
}

const Patient = () => {
  
  const [searchTerm, setSearchTerm] = useState('');
  const [patients, setPatients] = useState<Patient[]>([]);
const [id,setid]=useState('');
  const [showModal, setShowModal] = useState(false); // State to control the visibility of the modal
  const [quantity, setQuantity] = useState('');
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

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };
  
  const filteredPatients = Array.isArray(patients) ? patients.filter((patient) =>
  patient.name.toLowerCase().includes(searchTerm.toLowerCase())
) : [];

const handleOpenModal = () => {
  setShowModal(true);
};

const handleCloseModal = async() => {
  setShowModal(false);
  try{
    const url= process.env.NEXT_PUBLIC_API_URL + '/api/controller/createmed';
        const res= await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                },
            body: JSON.stringify({id,quantity
          }),
        });
        const data = await res.json();
        console.log(data);
      }
        catch(err){
            console.log(err);
        }






};
const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  
  setQuantity(event.target.value);
}


  const vibgyorColors = ['bg-violet-500', 'bg-indigo-500', 'bg-blue-500'];
  
  return (
    <div className="flex flex-col bg-white  md:flex-row">
      <div className='flex'>
        <div className="w-full p-4 ">
          <Compo/>
          <MedCompo/>
        </div>
      </div>
      
      <div className="w-full md:w-7/10 ">

        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
          className=" w-full p-2  mb-4 border bg-slate-300 mt-6 border-gray-300 rounded"
        />
        <div className="flex flex-wrap ">
          {filteredPatients.map((patient, index) => (
            <div key={index} className='p-5 m-0 md:w-1/4' >

              <h2 className=" text-black text-2xl font-bold mb-2">{patient.name}</h2>
              <Button onClick={() => { handleOpenModal(); setid(patient.id); }}>
              <div  className={`card w-full  p-4 mb-4 
               hover:scale-125 rounded shadow-lg hover:shadow-xl transition-shadow 
               duration-200 ease-in-out ${vibgyorColors[index % vibgyorColors.length]}` 
               }>
                {patient.quantity && <p>quantity: {patient.quantity}</p>}
                {patient.price && <p>Price: {patient.price}</p>}
                {patient.description && <p>description: {patient.description}</p>}
                {patient.nextRefill && <p>nextRefill: {patient.nextRefill}</p>}
                {patient.retailerId && <p>retailerId {patient.retailerId}</p>}
                
              </div>
              </Button>
              {showModal && (
                <Modal onClose={handleCloseModal}>
                  <ModalHeader>{patient.name}</ModalHeader>
                  <ModalBody>
                    <Input value={quantity} onChange={handleQuantityChange} placeholder="Enter quantity" />
                  </ModalBody>
                  <ModalFooter>
                    <Button onClick={handleCloseModal}>Close</Button>
                  </ModalFooter>
                </Modal>
      )}
            </div>
          ))}
          
        </div>
      </div>

    </div>
  );
}

export default Patient;

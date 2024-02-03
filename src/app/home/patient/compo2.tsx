import React, { useState, useEffect } from 'react';
import jwt from 'jsonwebtoken';
import Image from 'next/image';
const Compo2 = () => {
    const [patient, setPatients] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    let token;
    if (typeof window !== 'undefined') {
        token = localStorage.getItem('token');
    }

    let decoded: any;
    if (token) {
        decoded = jwt.decode(token);
    }

    const fetchData = async () => {
        const url = process.env.NEXT_PUBLIC_API_URL + '/api/controller/getonepatient?id=' + decoded?.userId;
        const res = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await res.json();
        setPatients(data);
    };


    return (
        <div>
                    {patient.address && <p>Address: {patient.address}</p>}
                    {patient.bednumber && <p>Bed Number: {patient.bednumber}</p>}
                    {patient.details && <p>Details: {patient.details}</p>}
                    {patient.diet && <p>Diet: {patient.diet}</p>}
                    {patient.drugsPrescribed && <p>Drugs Prescribed: {patient.drugsPrescribed}</p>}
                    {patient.files && patient.files.length > 0 &&
                        <>
                            <p>Files:</p>
                            <Image src={patient.files[0]} alt="Patient" width={500} height={300} priority />
                        </>
                    }
                </div>
          
    );
};

export default Compo2;

interface Patient {
    name: string;
    details: string;
    address: string;
    bednumber: string;
    diet: string;
    drugsPrescribed: string;
    files: string[];
}

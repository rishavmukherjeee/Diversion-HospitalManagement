import React,{useState} from 'react'
import jwt from 'jsonwebtoken';
const Compo = () => {
    
  let token:any ;
  if (typeof window !== 'undefined') {
    token= localStorage.getItem('token');}
    let decoded:any;
    decoded = jwt.decode(token);
    console.log(decoded?.userId);
    const [patient, setPatient] = useState({
        name: decoded?.userId,
        details: '',
        address: '',
        bednumber: '',
        diet: '',
        drugsPrescribed: '',
        files: [],
      });
      const handleChange = (event:any) => {
        const { name, value, files } = event.target;
        if (name === 'files') {
          setPatient((prevState) => ({
            ...prevState,
            [name]: [...files],
          }));
        } else {
          setPatient((prevState) => ({
            ...prevState,
            [name]: value,
          }));
        }
      };
      const handleSubmit = (event:any) => {
        event.preventDefault();
        alert(JSON.stringify(patient));
        const url= process.env.NEXT_PUBLIC_API_URL + '/api/patient';
        const res= fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                },
            body: JSON.stringify(patient),
        });

      };
  return (
    <div> 
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
    <button className=" mt-16 px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700" type="submit">Submit</button>
  </form></div>
  )
}

export default Compo
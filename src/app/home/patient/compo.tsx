import React,{useState} from 'react'
import jwt from 'jsonwebtoken';
import Fileup from './fileup';
const Compo = () => {
    
  let token:any ;
  if (typeof window !== 'undefined') {
    token= localStorage.getItem('token');}
    let decoded:any;
    decoded = jwt.decode(token);
    console.log(decoded?.userId);
    const [details, setDetails] = useState('');
    const [drugsPrescribed, setDrugsPrescribed] = useState('');
    const [address, setAddress] = useState('');
    const [bednumber, setBednumber] = useState('');
    const [diet, setDiet] = useState('');
    const patient = {
        details: details,
        drugsPrescribed: drugsPrescribed,
        address: address,
        bednumber: bednumber,
        diet: diet,
        name:decoded?.name
      };
      
    const handleChange = (event:any) => {
        const target = event.target;
        const name = target.name;
        if(name=='details')
        setDetails(target.value);
        if(name=='drugsPrescribed')
        setDrugsPrescribed(target.value);
        if(name=='address')
        setAddress(target.value);
        if(name=='bednumber')
        setBednumber(target.value);
        if(name=='diet')
        setDiet(target.value);
      }
      const handleSubmit = async(event:any) => {

        event.preventDefault();
        alert(JSON.stringify(patient));
        const url= process.env.NEXT_PUBLIC_API_URL + '/api/controller/patient?id='+decoded?.userId
        const res= await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                },
            body: JSON.stringify(patient),
        });
        const data = await res.json();
        console.log(data);
      };
  return (
    <div> 
        <form onSubmit={handleSubmit}>
    <label className='p-1 flex items-center'>
      Details:
      <input placeholder='Details Here' className='ml-3 bg-transparent p-1' type="text" name="details" value={details} onChange={handleChange} />
    </label>
    <label className='p-1 flex items-center'>
      Address:
      <input placeholder='Address Here' className='ml-3 bg-transparent p-1' type="text" name="address" value={address} onChange={handleChange} />
    </label>
    <label className='p-1 flex items-center'>
      Bed No.:
      <input placeholder='Bed Number Here' className='ml-3 bg-transparent p-1' type="text" name="bednumber" value={bednumber} onChange={handleChange} />
    </label>
    <label className='p-1 flex items-center'>
      Diet:
      <input placeholder='Diet Here' className='ml-3 bg-transparent p-1' type="text" name="diet" value={diet} onChange={handleChange} />
    </label>
    <label className='p-1 flex items-center'>
      Drugs Prescribed:
      <input placeholder='Drugs Here' className='ml-3 bg-transparent p-1' type="text" name="drugsPrescribed" value={drugsPrescribed} onChange={handleChange} />
    </label>
    <Fileup/>
    <button className='bg-blue-500 mt-5 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
    type="submit">Submit</button>
    </form>
    </div>
  )
}

export default Compo;

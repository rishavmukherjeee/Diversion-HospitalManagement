"use client"
import React,{useState} from 'react'
import { useRouter } from 'next/navigation';
const Compo = () => {
  

  const router = useRouter();
  async function gettid(){
    let id:any ;
    if (typeof window !== 'undefined') {
      id= await localStorage.getItem('clicked');
    localStorage.removeItem('clicked');
    }
    console.log(id)
    return id;
  }

    
  
  const [details, setDetails] = useState('');
  const [drugsPrescribed, setDrugsPrescribed] = useState('');
  const [address, setAddress] = useState('');
  const [bednumber, setBednumber] = useState('');
  const [diet, setDiet] = useState('');

  const gotofileupload = () => {
    router.push('/home/nurse/sample');
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
        const urll=localStorage.getItem("urll");
        localStorage.removeItem("urll");
        const patient = {
          details: details,
          drugsPrescribed: drugsPrescribed,
          address: address,
          bednumber: bednumber,
          diet: diet,
          files:[urll]
        };


        event.preventDefault();
        alert(JSON.stringify(patient));
        const op=localStorage.getItem('clicked');
        const url= process.env.NEXT_PUBLIC_API_URL + '/api/controller/patient?id='+op
        console.log(url);
        const res= await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                },
            body: JSON.stringify(patient),
        });
        const data = await res.json();
        console.log(data);
        alert(data)
      };
  return (
    <div> 
      
    <button onClick={gotofileupload}
    className='bg-red-500 p-3 rounded-2xl text-white hover:bg-red-700 hover:text-white font-bold py-2 px-4 '
    >Go to File upload</button>
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

    <button className='bg-blue-500 mt-5 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
    type="submit">Submit</button>

    </form>
    
    </div>
  )
}

export default Compo;

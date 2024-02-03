"use client"
import React,{useEffect, useState} from 'react'
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

    
  
  const [patients, setPatients] = useState<Patient[]>([]);
  const [details, setDetails] = useState('');
  const [drugsPrescribed, setDrugsPrescribed] = useState('');
  const [address, setAddress] = useState('');
  const [bednumber, setBednumber] = useState('');
  const [diet, setDiet] = useState('');
  
  const [searchTerm, setSearchTerm] = useState('');
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

      const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
      };
      const vibgyorColors = ['bg-violet-500', 'bg-indigo-500', 'bg-blue-500'];

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
    <div className='flex flex-row bg-slate-700'> 
      
    <button onClick={gotofileupload}
    className='bg-red-500 p-3 rounded-2xl text-white hover:bg-red-700  h-20 hover:text-white font-bold py-2 px-4 '
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
    <div className="w-full md:w-7/10 p-4">
        <input
          type="text"
          placeholder="Search Medicines..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />

        <div className="flex flex-wrap ">
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
  )
}

export default Compo;
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
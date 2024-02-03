import { useState } from 'react';
import { Button, Modal, Input,ModalContent, ModalHeader, ModalBody, ModalFooter
} from '@nextui-org/react';
import jwt from 'jsonwebtoken';
/*
  name        String?
  quantity    Int?
  price       Int?
  description String?
  nextRefill  DateTime?
  retailerId  String? */
function MedCompo() {
    let token:any ;
  if (typeof window !== 'undefined') {
    token= localStorage.getItem('token');}
    let decoded:any;
    decoded = jwt.decode(token);
    console.log(decoded)

  const [isOpen, setIsOpen] = useState(false);
  const [medicine, setMedicine] = useState({name: '', quantity: '',
    price: '', description: '', nextRefill: ''
  
  });

  const createMed = async(med:any) => {
    try{
      const url= process.env.NEXT_PUBLIC_API_URL + '/api/controller/createmed';
          const res= await fetch(url, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
                  },
              body: JSON.stringify({...medicine,
            }),
          });
          const data = await res.json();
          console.log(data);
        }
          catch(err){
              console.log(err);
          }
    }
    
  

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const handleChange = (e:any) => {
    setMedicine({...medicine, [e.target.name]: e.target.value});
  };

  const handleSubmit = () => {
    createMed(medicine);
    
    handleClose();
  };

  return (
    <>
      <Button onClick={handleOpen} className="bg-blue-500 p-3 rounded-2xl text-white hover:bg-blue-700 hover:text-white font-bold py-2 px-4">
        Create Medicine
      </Button>
      <Modal className=' bg-slate-500' isOpen={isOpen} onClose={handleClose}>
        <ModalContent>
          <ModalHeader>Create Medicine</ModalHeader>
          <ModalBody >
            <Input className=' border-red-200 rounded-2xl' label="Name" name="name" value={medicine.name} onChange={handleChange} />
            <Input  className=' border-red-200 rounded-2xl' label="Quantity" name="quantity" value={medicine.quantity.toString()} onChange={handleChange} />
            <Input className=' border-red-200 rounded-2xl' label="Price" name="price" value={medicine.price.toString()} onChange={handleChange} />
            <Input className=' border-red-200 rounded-2xl' label="Description" name="description" value={medicine.description} onChange={handleChange} />
          </ModalBody>
          <ModalFooter>
            <Button onClick={handleSubmit}>Submit</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
  }

export default MedCompo

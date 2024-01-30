import {prisma} from '../db';
import { NextApiRequest, NextApiResponse } from 'next';
type Patient = {
    id: string;
    name: string;
    details: string;
    address: string;
    bednumber: string;
    appointedNurseId: string;
    appointedDoctor: string;
    diet: string;
    drugsPrescribed: string;
    ereports: string;
    vitalsLastCheck: string;
    files: string[];
    hospitalId: string;
}
export async function updatePatient(id: string, data: Partial<Patient>) {
    try {
      const updatedPatient = await prisma.patient.update({
        where: { id: id },
        data: data,
      });
      return updatedPatient;
    } catch (error) {
      console.error("Error updating patient: ", error);
      throw error;
    }
  }
  export async function deletePatient(id: string) {
    try {
      const deletedPatient = await prisma.patient.delete({
        where: { id: id },
      });
      return deletedPatient;
    } catch (error) {
      console.error("Error deleting patient: ", error);
      throw error;
    }
  }
  export default async function patient(req:NextApiRequest, res:NextApiResponse) {
    "use server"
    if(req.method !== 'PUT') {
        if(req.method === 'GET'){
            res.status(200).json({ text: 'Hello from patient' });
        }
        return res.status(405).json({ message: 'Method not allowed' });
    }
    try{
      const id=req.query.id as string;
    const {  name, details, address, bednumber, appointedNurseId, appointedDoctor, diet, drugsPrescribed, ereports, vitalsLastCheck, files, hospitalId } = req.body;
    const patient = await prisma.patient.findFirst({
        where: {
            id: id,
        },
    });
    if(!patient) {
        res.status(400).json({ message: 'Patient does not exist' });
        console.log("patient does not exist");
        return;
    }
    const updatedPatient = await updatePatient(id, {
        name: name,
        details: details,
        address: address,
        bednumber: bednumber,
        appointedNurseId: appointedNurseId,
        appointedDoctor: appointedDoctor,
        diet: diet,
        drugsPrescribed: drugsPrescribed,
        ereports: ereports,
        vitalsLastCheck: vitalsLastCheck,
        files: files,
        hospitalId: hospitalId,
    });
    res.status(200).json({ message: 'Patient updated successfully' });
    console.log("patient updated successfully",updatedPatient);
    return;
    }
    catch(error){
        console.log("Error updating patient: ", error);
        throw error;
    }
}

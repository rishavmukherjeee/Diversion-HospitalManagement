import {prisma} from '../db';
import { NextApiRequest, NextApiResponse } from 'next';
import { IncomingForm } from 'formidable';
const form = new IncomingForm();

export  async function updatePatient(id: string, data: Partial<Patient>) {
  try {
    console.log("Updating patient with id: ", data);

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
  export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;
    const patientId = id as string;
    const updatedPatient = await updatePatient(patientId, req.body);
    res.status(200).json(updatedPatient);
  }

  type Patient = {
    name: string;
    details: string;
    address: string;
    bednumber: string;
    appointedDoctor: string;
    diet: string;
    drugsPrescribed: string;
    ereports: string;
    vitalsLastCheck: string;
  }

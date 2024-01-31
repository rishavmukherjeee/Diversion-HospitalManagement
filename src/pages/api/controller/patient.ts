import {prisma} from '../db';
import { NextApiRequest, NextApiResponse } from 'next';
import { IncomingForm, File } from 'formidable';
const form = new IncomingForm();

import cloudinary from 'cloudinary';
const your_api_key=process.env.DB_CLOUDINARY_KEY;
const your_api_secret=process.env.DB_CLOUDINARY_SECRET;
const your_cloud_name=process.env.DB_CLOUDINARY_NAME;
cloudinary.v2.config({
  cloud_name: your_cloud_name,
  api_key: your_api_key,
  api_secret: your_api_secret,
});
type CloudinaryResult = {
  url: string;
  // include other properties returned by Cloudinary as needed
};

type FileWithCloudinaryPath = File & {
  path: string;
};
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


  export const config = {
    api: {
      bodyParser: false,
    },
  };

  export default async function patient(req: NextApiRequestWithFormData, res: NextApiResponse) {
    if (req.method === 'PUT') {
      const id = req.query.id as string;
      form.parse(req, async (err, fields, files) => {
        if (err) {
          console.error('Error', err);
          throw err;
        }
  
        const uploads = Object.values(files).map((file: FileWithCloudinaryPath) => {
          return new Promise((resolve, reject) => {
            if (file && file.path) {
              cloudinary.v2.uploader.upload(file.path, (error, result: CloudinaryResult) => {
                if (error) {
                  reject(error);
                } else {
                  resolve(result);
                }
              });
            } else {
              reject(new Error('No file provided'));
            }
          });
        });
        
        
  
        try {
          const results = await Promise.all(uploads);
          // Define data here
          const data = {
            ...fields,
            files: results.map((result) => result.url),
          };
          const updatedPatient = await updatePatient(id, data);
          res.status(200).json({ message: 'Patient updated successfully', updatedPatient });
        } catch (error) {
          console.error("Error updating patient: ", error);
          res.status(500).json({ message: 'Error updating patient', error });
        }
      });
    }
  }
  

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
type NextApiRequestWithFormData = NextApiRequest & {
  files: {
    [key: string]: File;
  };
  fields: {
    [key: string]: string;
  };
}
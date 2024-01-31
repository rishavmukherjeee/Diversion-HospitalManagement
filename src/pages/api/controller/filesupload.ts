/*import {prisma} from '../db';
import { NextApiRequest, NextApiResponse } from 'next';
import { IncomingForm, File } from 'formidable';
import nextConnect from 'next-connect';
const form = new IncomingForm();

import cloudinary from 'cloudinary';
import multer from 'multer';
const your_api_key=process.env.DB_CLOUDINARY_KEY;
const your_api_secret=process.env.DB_CLOUDINARY_SECRET;
const your_cloud_name=process.env.DB_CLOUDINARY_NAME;
cloudinary.v2.config({
  cloud_name: your_cloud_name,
  api_key: your_api_key,
  api_secret: your_api_secret,
});
import { NextApiRequest, NextApiResponse } from 'next';
import {nextConnect} from 'next-connect';
import cloudinary from 'cloudinary';
import multer from 'multer';

const upload = multer({ dest: '/tmp' });

cloudinary.v2.config({
  cloud_name: process.env.DB_CLOUDINARY_NAME,
  api_key: process.env.DB_CLOUDINARY_KEY,
  api_secret: process.env.DB_CLOUDINARY_SECRET,
});

const handler = nextConnect()
  .use(upload.array('files'))
  .post(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const files: Express.Multer.File[] = req.files as Express.Multer.File[];
      const urls = [];

      for (const file of files) {
        const result = await cloudinary.v2.uploader.upload(file.path);
        urls.push(result.secure_url);
      }

      console.log(urls);
      res.status(200).json({ urls });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Upload failed' });
    }
  });

export default handler;
*/
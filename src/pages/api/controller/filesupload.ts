import { NextApiRequest, NextApiResponse } from 'next';
import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import { Readable } from 'stream';

type NextApiRequestWithFiles = NextApiRequest & {
  files: any[]
};

const upload = multer();

cloudinary.config({ 
  cloud_name: 'dkcgowfwq', 
  api_key: '746926534893958', 
  api_secret: '5q0_ozUMXhoF_OQlIMsNdP-7hBE' 
});

export default async function handler(req: NextApiRequestWithFiles, res: NextApiResponse) {
  if (req.method === 'POST') {
    upload.array('files')(req, res, async (err) => {
      if (err) {
        console.error('Multer error:', err);
        return res.status(500).json({ error: err.message });
      }

      try {
        const urls = [];

        for (const file of req.files) {
          console.log('Uploading file:', file.originalname);

          const uploadStream = cloudinary.uploader.upload_stream({ folder: 'diversion' }, (error, result) => {
            if (error) {
              console.error('Cloudinary upload error:', error);
              throw error;
            }

            console.log('Upload result:', result);
            urls.push(result.secure_url);

            if (urls.length === req.files.length) {
              res.status(200).json({ urls });
            }
          });

          const readableStream = new Readable();
          readableStream.push(file.buffer);
          readableStream.push(null);
          readableStream.pipe(uploadStream);
        }
      } catch (error) {
        console.error('Error in upload:', error);
        res.status(500).json({ error: 'Upload failed' });
      }
    });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}

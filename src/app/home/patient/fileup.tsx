/*import React, { useRef } from 'react';

const Fileup = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadFiles = async () => {
    console.log('Uploading files...');
    if (!(fileInputRef.current instanceof HTMLInputElement)) {
      console.error('Invalid ref');
      return;
    }
  
    const files = fileInputRef.current.files;
    console.log(files);
    if (!files) {
      console.error('No files selected');
      return;
    }
    const formData = new FormData();
  
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }

    try {
      console.log('Sending request to /api/controller/files');
      const response = await fetch('/api/controller/filesupload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const { urls } = await response.json();
        console.log('Upload successful, received URLs:', urls);
      } else {
        console.error('Upload failed, response:', response);
      }
    } catch (error) {
      console.error('Error during fetch:', error);
    }
  };

  return (
    <div>
      <label className='p-1 flex items-center'>
        Files:
        <input
          className='ml-3 bg-transparent p-1'
          type="file"
          multiple
          ref={fileInputRef}
          onChange={uploadFiles}
        />
      </label>
    </div>
  );
};

export default Fileup;

import { useState } from 'react';

export default function HFileup() {
  const [selectedFile, setSelectedFile] = useState();

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('upload_preset', 'YOUR_UPLOAD_PRESET');
    try {
      const response = await fetch('https://api.cloudinary.com/v1_1/dkcgowfwq/image/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  

    if (data.secure_url) {
      console.log('File successfully uploaded to Cloudinary:', data.secure_url);
    } else {
      console.log('Upload failed');
    }
  };

  return (<div>
    <form onSubmit={handleFormSubmit}>
      <input type="file" onChange={handleFileChange} />
      <button type="submit">Upload</button>
    </form>
    </div>
  );
}
*/
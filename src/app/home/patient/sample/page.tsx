"use client"
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
    formData.append('upload_preset', 'xy1z3nqo');
    try {
      const response = await fetch('https://api.cloudinary.com/v1_1/dkcgowfwq/image/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      console.log(data);
      if (data.secure_url) {
        console.log('File successfully uploaded to Cloudinary:', data.secure_url);
      } else {
        console.log('Upload failed');
      }
    } catch (error) {
      console.error(error);
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

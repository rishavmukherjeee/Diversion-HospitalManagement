import React, { useRef } from 'react';

const Fileup = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadFiles = async () => {
    if (!(fileInputRef.current instanceof HTMLInputElement)) {
      console.error('Invalid ref');
      return;
    }
  
    const files = fileInputRef.current.files;
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
      const response = await fetch('/api/controller/files', {
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

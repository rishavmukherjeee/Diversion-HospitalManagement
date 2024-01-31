import React, { useRef } from 'react';

const Fileup = () => {
  const fileInputRef = useRef(null);

  const uploadFiles = async () => {
    const files = fileInputRef.current?.file;
    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }

    try {
      const response = await fetch('/api/controller/files', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const { urls } = await response.json();
        console.log(urls);
      } else {
        console.error('Upload failed');
      }
    } catch (error) {
      console.error('Error:', error);
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

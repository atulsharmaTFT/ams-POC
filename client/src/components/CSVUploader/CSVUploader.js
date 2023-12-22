// CSVUpload.js
import React from 'react';
import 'react-dropzone-uploader/dist/styles.css';
import Dropzone from 'react-dropzone-uploader';

const CSVUpload = ({ onUpload }) => {
  const getUploadParams = () => ({
    url: 'your-backend-endpoint', // Specify your backend endpoint for file upload
  });

  const handleChangeStatus = ({ meta, file }, status) => {
    if (status === 'done') {
      // File has been uploaded successfully
      onUpload(file);
    } else if (status === 'rejected_file_type') {
      alert('Invalid file type. Please upload a CSV file.');
    }
    // Handle other status as needed
  };

  return (
    <Dropzone
      getUploadParams={getUploadParams}
      onChangeStatus={handleChangeStatus}
      accept=".csv"
      maxFiles={1}
      inputContent="Drag & drop a CSV file here or click to select one"
      styles={dropzoneStyles}
    />
  );
};

const dropzoneStyles = {
  dropzone: {
    border: '2px dashed #cccccc',
    borderRadius: '4px',
    padding: '20px',
    textAlign: 'center',
    cursor: 'pointer',
  },
};

export default CSVUpload;

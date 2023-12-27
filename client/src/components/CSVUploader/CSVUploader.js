// CSVUpload.js
import React from "react";
import "react-dropzone-uploader/dist/styles.css";
import Dropzone from "react-dropzone-uploader";

const acceptedFileTypes = [
  "application/vnd.ms-excel", // .xls
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // .xlsx
  "application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml", // .xlsx worksheet
  ".csv",
];

const CSVUpload = ({ onUpload }) => {
  const getUploadParams = () => ({
    url: "your-backend-endpoint", // Specify your backend endpoint for file upload
  });

  const handleChangeStatus = ({ meta, file }, status) => {
    const validFileTypes = [
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/vnd.ms-et",
      ".csv",
    ];

    if (status === "done") {
      // File has been uploaded successfully
      onUpload(file);
    } else if (status === "rejected_file_type") {
      alert("Invalid file type. Please upload a CSV file.");
    }
    // Handle other status as needed
  };

  return (
    <Dropzone
      getUploadParams={getUploadParams}
      onChangeStatus={handleChangeStatus}
      accept={acceptedFileTypes.join(",")}
      maxFiles={1}
      inputContent="Drag & drop a CSV file here or click to select one"
      styles={dropzoneCss}
    />
  );
};

let dropzoneCss = {
  dropzone: {
    overflow: "hidden",
    maxHeight: "120px",
    borderRadius: "5px",
    border: "1px solid #cdcdcd",
    backgroundColor: "#fff",
    maxWidth: "50%",
    minWidth: "50%",
    padding: "5px",
  },
  inputLabelWithFiles: {
    display: "none",
  },
  inputLabel: {
    fontSize: "16px",
    fontWeight: "500",
    color: "#777",
    textAlign: "center",
    marginTop: "10px",
  },
  preview: {
    // padding: "15px",
    maxHeight: "20px",
  },
};
export default CSVUpload;

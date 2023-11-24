import React from "react";

function FileUploader({ title,onChange }) {
  return (
    <div>
      <label>{title}</label>
      <input type="file" onChange={onChange}/>
    </div>
  );
}

export default FileUploader;

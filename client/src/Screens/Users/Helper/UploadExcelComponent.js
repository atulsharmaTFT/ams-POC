import React from "react";
import classes from "./helper.module.scss"
import CSVUpload from "../../../components/CSVUploader/CSVUploader";
import Button from "../../../components/Button/Button";
const UploadExcelComponent = ({handleSampleFile, handleUpload, downloadClass}) => {
  return (
    <div>
        <Button
          type="submit"
          overrideClassName={downloadClass}
          buttonText={"Download Format"}
          onClick={handleSampleFile}
          loading={false}
        />
    
      <div className={classes.instructions}>
        <p>
          <strong>Instructions</strong>
        </p>
        <p>Please upload a CSV file in the following format:</p>
        <p>
          <strong>Format:</strong> Name, Employee ID, Designation, Email,
          Department, Manager Name, Manager Email, Joining Date
        </p>
        <p>
          <strong>Example:</strong> ABCD, 13232, Software Engineer,
          abc@tftus.com, Development, XYZ, xyz@tftus.com, 01/01/2024
        </p>
      </div>
      <CSVUpload onUpload={handleUpload} />
      <div className={classes.csvActions}>
    
        <button>Submit</button>
      </div>
    </div>
  );
};
export default UploadExcelComponent;

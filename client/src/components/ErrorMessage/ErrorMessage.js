import React from "react";
import styles from "./errorMessage.module.scss";

const ErrorMessage = ({ error, overrideErrorClassName }) => {
  return (
    <>
      {error ? (
        <div className={`${styles.error} ${overrideErrorClassName || ""}`}>
          {error}
        </div>
      ) : (
        <div style={{ height: "0.6rem" }}></div>
      )}
    </>
  );
};

export default ErrorMessage;

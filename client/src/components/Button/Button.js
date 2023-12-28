import React from "react";
// import { ColorRing } from "react-loader-spinner";
import styles from "./button.module.scss";

const Button = ({
  buttonText,
  icon,
  image,
  iconText,
  imageClassName = "",
  onClick,
  overrideClassName,
  loading,
  disabled,
}) => {
  return (
    <div
      style={{ backgroundColor: disabled ? "gray" : "" }}
      className={`${styles.button} ${overrideClassName}`}
      onClick={() => !disabled && onClick()}
    >
      {icon && icon}
      {image && <img src={image} alt="icon" className={imageClassName} />}
      {iconText && <span>{iconText}</span>}
      {loading ? (
        // <ColorRing
        //   visible={true}
        //   height="40"
        //   width="40"
        //   ariaLabel="blocks-loading"
        //   wrapperStyle={{}}
        //   wrapperClass="blocks-wrapper"
        //   colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
        // />
        "Loading"
      ) : (
        buttonText
      )}
    </div>
  );
};

export default Button;

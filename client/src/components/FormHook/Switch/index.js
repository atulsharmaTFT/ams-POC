import React from "react";
import classes from "./switch.module.scss";
const SlideSwitch = ({ label, checked, onChange }) => {
  return (
    <div className={classes.embed}>
      <p>{label}</p>
      <div className={classes.toggle}>
        <input type="checkbox" checked={checked} onChange={()=>onChange()} />
        <span className={classes.slide}></span>
      </div>
    </div>
  );
};

export default SlideSwitch;

import React from "react";
import classes from "./Navbar.module.scss";
import { BiSearchAlt } from "react-icons/bi";
const Navbar = () => {
  return (
    <div className={classes.navContainer}>
      <div className={classes.searchBar}>
        <BiSearchAlt />
      </div>
      {/* <h1 className={classes.title}>Asset Management System</h1> */}
      <div className={classes.profileContainer}>
        <img
          className={classes.avatar}
          alt={"avatar"}
          src={
            "https://t3.ftcdn.net/jpg/02/00/90/24/360_F_200902415_G4eZ9Ok3Ypd4SZZKjc8nqJyFVp1eOD6V.jpg"
          }
        />
      </div>
    </div>
  );
};
export default Navbar;

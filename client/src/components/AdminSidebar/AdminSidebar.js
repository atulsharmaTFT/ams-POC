import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import classes from "./AdminSidebar.module.scss";
import { motion } from "framer-motion";
import Scrollbars from "react-custom-scrollbars";
import { AppRoutes } from "../../constants/app.routes";
// import { AppRoutes } from "../../constants";

const AdminSidebar = () => {
  const open = true;
  const scrollbarRef = useRef();
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const [embedmenuOpen, setEmbedmenuOpen] = useState(false);
  const toggleSubmenu = () => {
    setSubmenuOpen(!submenuOpen);
  };
  const toggleEmbedmenu = () => {
    setEmbedmenuOpen(!embedmenuOpen);
  };
  const role = "admin";
  const scrollToBottom = () => {
    if (scrollbarRef.current) {
      scrollbarRef.current.scrollToBottom();
    }
  };
  useEffect(() => {
    if (embedmenuOpen || submenuOpen) {
      scrollToBottom();
    }
  }, [embedmenuOpen, submenuOpen]);
  return (
    <motion.div
      animate={{ width: open ? "15%" : "60px" }}
      className={`${classes.sliderBox} themeColor`}
    >
      <div className={classes.sidebar}>
        <div className={classes.logo}>
          {/* {open && (
            <Link to="#">
              <img src={logo} alt="logo" /> <h4>AMS</h4>
            </Link>
          )} */}
          <h1 style={{fontSize:"20px" , color:'white'}}> Asset Management System</h1>
        </div>
        <Scrollbars ref={scrollbarRef} className={classes.links} height={"80%"}>
            
            <NavLink
              className={({ isActive }) =>
                isActive ? `${classes.active}` : ""
              }
              to={AppRoutes.HOME}
            >
              {open && "Fields"}
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive ? `${classes.active}` : ""
              }
              to={AppRoutes.FIELDGROUP}
            >
              {open && "FieldGroups"}
            </NavLink>
        </Scrollbars>
      </div>
    </motion.div>
  );
};

export default React.memo(AdminSidebar);

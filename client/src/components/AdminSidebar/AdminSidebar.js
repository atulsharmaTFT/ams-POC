import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import classes from "./AdminSidebar.module.scss";
import { motion } from "framer-motion";
import Scrollbars from "react-custom-scrollbars";
import { useSelector } from "react-redux";
import { AppRoutes } from "../../constants/app.routes";
// import { AppRoutes } from "../../constants";

const AdminSidebar = () => {
  const open = true;
  const scrollbarRef = useRef();
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const [embedmenuOpen, setEmbedmenuOpen] = useState(false);
  const { user } = useSelector((state) => state.user);
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
          {/* {submenuOpen && (
            <ul className={classes.submenu}>
              <li style={{ marginLeft: open ? 20 : 0 }}>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? `${classes.active}` : ""
                  }
                  to={AppRoutes.CREATE_QUIZ}
                >
                  <img src={createQuiz} alt="createquiz" />
                  {open && "Create Quiz"}
                </NavLink>
              </li>

              <li style={{ marginLeft: open ? 20 : 0 }}>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? `${classes.active}` : ""
                  }
                  to={AppRoutes.SCHEDULE_QUIZ}
                >
                  <img src={scheduleQuiz} alt="scheduleQuiz" />
                  {open && "Scheduled Quiz"}
                </NavLink>
              </li>
              <li style={{ marginLeft: open ? 20 : 0 }}>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? `${classes.active}` : ""
                  }
                  to={AppRoutes.CREATE_TEMPLATE}
                >
                  <img src={createTemplate} alt="createquiz" />
                  {open && "Create Template"}
                </NavLink>
              </li>
            </ul>
          )} */}
        </Scrollbars>
      </div>
    </motion.div>
  );
};

export default React.memo(AdminSidebar);

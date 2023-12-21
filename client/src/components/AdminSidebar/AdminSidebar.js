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

  const navs = [
    {
      path: AppRoutes.ARCHIVEASSETS,
      name: "Domain",
      show: ["SuperAdmin"],
    },
    {
      path: AppRoutes.ORGANIZATIONS,
      name: "Organizations",
      show: ["SuperAdmin"],
    },
    {
      path: AppRoutes.FIELDS,
      name: "Fields",
      show: ["SuperAdmin", "OrganizationAdmin"],
    },
    {
      path: AppRoutes.FIELDGROUP,
      name: "Field Groups",
      show: ["SuperAdmin", "OrganizationAdmin"],
    },
    {
      path: AppRoutes.PRODUCT,
      name: "Product Category",
      show: ["SuperAdmin", "OrganizationAdmin"],
    },
    {
      path: AppRoutes.ASSETS,
      name: "Assets",
      show: ["OrganizationAdmin"],
    },
    {
      path: AppRoutes.ARCHIVEASSETS,
      name: "Archive Assets",
      show: ["OrganizationAdmin"],
    },
  ];
  const role = localStorage.getItem("organizationId")
    ? "OrganizationAdmin"
    : "SuperAdmin";
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
          <h1 style={{ fontSize: "20px", color: "white" }}>
            {" "}
            Asset Management System
          </h1>
        </div>
        <Scrollbars ref={scrollbarRef} className={classes.links} height={"80%"}>
          {navs.map((node) => {
            console.log(role, node.show, node.show.includes(role));
            if (node.show.includes(role)) {
              console.log(node);
              return (
                <NavLink
                  key={node.name}
                  className={({ isActive }) =>
                    isActive ? `${classes.active}` : ""
                  }
                  to={node.path}
                >
                  {open && node.name}
                </NavLink>
              );
            }
          })}
        </Scrollbars>
      </div>
    </motion.div>
  );
};

export default React.memo(AdminSidebar);

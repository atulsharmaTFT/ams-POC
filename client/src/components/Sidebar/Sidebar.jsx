import React, { useState, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import classes from "./Sidebar.module.scss";
import { RxDashboard } from "react-icons/rx";
import { TfiLayoutListThumb } from "react-icons/tfi";
import { VscGroupByRefType } from "react-icons/vsc";
import { FaFolderTree } from "react-icons/fa6";
import { GiCheckboxTree } from "react-icons/gi";
import { MdOutlineInventory2 } from "react-icons/md";
import { IoLogOutOutline } from "react-icons/io5";
import { SlOrganization } from "react-icons/sl";
import { MdCategory } from "react-icons/md";
import { CgOrganisation } from "react-icons/cg";
import { MdAdminPanelSettings } from "react-icons/md";
import { FaUsersGear } from "react-icons/fa6";
import { TbTemplate } from "react-icons/tb";
import { FaUserFriends } from "react-icons/fa";
import {
  IoIosArrowDropupCircle,
  IoIosArrowDropdownCircle,
} from "react-icons/io";
import { HiOutlineDesktopComputer } from "react-icons/hi";
import { TbLockAccess } from "react-icons/tb";
import { BiPieChart } from "react-icons/bi";

import { motion } from "framer-motion";
import { AppRoutes } from "../../constants/app.routes";
import Scrollbars from "react-custom-scrollbars";

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const [subMenuOpen, setSubmenuOpen] = useState(false);
  const scrollbarRef = useRef();
  const navigate = useNavigate();
  const toggleHandler = () => {
    setOpen(!open);
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
    // navigate(Routes.LOGIN)
  };
  const toggleSubmenu = () => {
    setSubmenuOpen(!subMenuOpen);
  };
  const role = localStorage.getItem("organizationId")
    ? "OrganizationAdmin"
    : "SuperAdmin";

  const navs = [
    {
      path: AppRoutes.HOME,
      name: "Dashboard",
      show: ["SuperAdmin", "OrganizationAdmin"],
      icon: <RxDashboard size={"25px"} className={classes.icon} />,
      subMenu: [],
    },
    {
      path: AppRoutes.DOMAIN,
      name: "Domain",
      show: ["SuperAdmin"],
      icon: <MdCategory size={"25px"} className={classes.icon} />,
      subMenu: [],
    },
    {
      path: AppRoutes.ORGANIZATIONS,
      name: "Organizations",
      show: ["SuperAdmin"],
      icon: <SlOrganization size={"25px"} className={classes.icon} />,
      subMenu: [
        {
          path: AppRoutes.ORGANIZATIONS,
          name: "Add Organisation",
          show: ["OrganizationAdmin"],
          icon: <CgOrganisation size={"25px"} className={classes.icon} />,
        },
        {
          path: AppRoutes.ORGANIZATIONS_ADMIN,
          name: "Add Admins",
          show: ["OrganizationAdmin"],
          icon: <MdAdminPanelSettings size={"25px"} className={classes.icon} />,
        },
      ],
    },
    {
      path: AppRoutes.FIELDS,
      name: "Fields",
      show: ["SuperAdmin", "OrganizationAdmin"],
      icon: <TfiLayoutListThumb size={"25px"} className={classes.icon} />,
      subMenu: [],
    },
    {
      path: AppRoutes.FIELDGROUP,
      name: "Field Groups",
      show: ["SuperAdmin", "OrganizationAdmin"],
      icon: <FaFolderTree size={"25px"} className={classes.icon} />,
      subMenu: [],
    },
    {
      path: AppRoutes.PRODUCT,
      name: "Product Category",
      show: ["SuperAdmin", "OrganizationAdmin"],
      icon: <GiCheckboxTree size={"25px"} className={classes.icon} />,
      subMenu: [],
    },
    {
      path: AppRoutes.ASSETS,
      name: "Assets",
      show: ["OrganizationAdmin"],
      icon: <MdOutlineInventory2 size={"25px"} className={classes.icon} />,
      subMenu: [],
    },
    {
      path: AppRoutes.ARCHIVEASSETS,
      name: "Archive Assets",
      show: ["OrganizationAdmin"],
      icon: <TbLockAccess size={"25px"} className={classes.icon} />,
      subMenu: [],
    },
    {
      path: AppRoutes.MANAGEUSERS,
      name: "Manage Users",
      show: ["OrganizationAdmin", "SuperAdmin"],
      icon: <TbLockAccess size={"25px"} className={classes.icon} />,
      subMenu: [],
    },
    {
      path: AppRoutes.ROLE_MANAGEMENT,
      name: "Role Management",
      show: ["OrganizationAdmin", "SuperAdmin"],
      icon: <FaUserFriends size={"25px"} className={classes.icon} />,
      subMenu: [],
    },
  ];
  return (
    <motion.div
      animate={{ width: open ? "18%" : "50px" }}
      className={`${classes.sliderBox} themeColor`}
    >
      <div className={classes.sidebar}>
        <div className={classes.logo}>
          {open && (
            <Link to="#">
              <img
                src={
                  "https://www.tftus.com/wp-content/uploads/2021/01/logo-1.png"
                }
                alt="logo"
              />
              <h4>Asset Management System</h4>
            </Link>
          )}
        </div>
        <div className={classes.content}>
          <Scrollbars
            ref={scrollbarRef}
            className={classes.links}
            height={"80%"}
          >
            {navs.map((node) => {
              if (node.show.includes(role)) {
                if (node.subMenu?.length > 0) {
                  return (
                    <>
                      <span
                        className={({ isActive }) =>
                          isActive ? `${classes.active}` : ""
                        }
                        onClick={toggleSubmenu}
                      >
                        {node.icon}
                        {open && node.name}
                        {subMenuOpen ? (
                          <IoIosArrowDropupCircle
                            size={20}
                            style={{ marginLeft: "25%" }}
                          />
                        ) : (
                          <IoIosArrowDropdownCircle
                            size={20}
                            style={{ marginLeft: "25%" }}
                          />
                        )}
                      </span>
                      {subMenuOpen && (
                        <ul className={classes.submenu}>
                          {node.subMenu?.map((item) => {
                            return (
                              <li style={{ marginLeft: open ? 20 : 0 }}>
                                <NavLink
                                  className={({ isActive }) =>
                                    isActive ? `${classes.active}` : ""
                                  }
                                  style={{ width: 220 }}
                                  to={item?.path}
                                >
                                  {item?.icon}
                                  {open && item?.name}
                                </NavLink>
                              </li>
                            );
                          })}
                        </ul>
                      )}
                    </>
                  );
                }
                return (
                  <NavLink
                    key={node.name}
                    className={({ isActive }) =>
                      isActive ? `${classes.active}` : ""
                    }
                    to={node.path}
                  >
                    {" "}
                    {node?.icon}
                    {open && node.name}
                  </NavLink>
                );
              }
            })}

            {/* <NavLink
              className={({ isActive }) =>
                isActive ? `${classes.active}` : ""
              }
              to={AppRoutes.HOME}
            >
              {" "}
              {<RxDashboard size={"25px"} className={classes.icon} />}
              {open && "Dashboard"}
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive ? `${classes.active}` : ""
              }
              to={AppRoutes.FIELDS}
            >
              {" "}
              {<TfiLayoutListThumb size={"25px"} className={classes.icon} />}
              {open && "Fields"}
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive ? `${classes.active}` : ""
              }
              to={AppRoutes.FIELDGROUP}
            >
              {
                <FaFolderTree
                  size={"25px"}
                  className={classes.icon}
                />
              }
              {open && "FieldGroups"}
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive ? `${classes.active}` : ""
              }
              to={AppRoutes.PRODUCT}
            >
              {
                <GiCheckboxTree
                  size={"25px"}
                  className={classes.icon}
                />
              }
              {open && "Product Category"}
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive ? `${classes.active}` : ""
              }
              to={AppRoutes.ASSETS}
            >
              {<MdOutlineInventory2 size={"25px"} className={classes.icon} />}
              {open && "Assets"}
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive ? `${classes.active}` : ""
              }
              to={AppRoutes.ARCHIVEASSETS}
            >
              {<TbLockAccess size={"25px"} className={classes.icon} />}
              {open && "Archive Assets"}
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive ? `${classes.active}` : ""
              }
              to={AppRoutes.ORGANIZATIONS}
            >
              {<SlOrganization size={"25px"} className={classes.icon} />}
              {open && "Organizations"}
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive ? `${classes.active}` : ""
              }
              to={AppRoutes.TEMPLATE}
            >
              {<TbTemplate size={"25px"} className={classes.icon} />}
              {open && "Templates"}
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive ? `${classes.active}` : ""
              }
              to={AppRoutes.MANAGEUSERS}
            >
              {<FaUsersGear size={"25px"} className={classes.icon} />}
              {open && "Manage Users"}
            </NavLink> */}
          </Scrollbars>
          <div className={classes.links}>
            <div className={classes.signout} onClick={handleLogout}>
              <IoLogOutOutline size={"25px"} className={classes.icon} />
              {"Logout "}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Sidebar;

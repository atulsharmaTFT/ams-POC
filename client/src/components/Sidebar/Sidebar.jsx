import React, { useState , useRef} from "react";
import { Link, NavLink ,useNavigate} from "react-router-dom";
import classes from "./Sidebar.module.scss";
import { RxDashboard } from "react-icons/rx";
import { TfiLayoutListThumb } from "react-icons/tfi";
import { VscGroupByRefType } from "react-icons/vsc";
import { FaFolderTree } from "react-icons/fa6";
import { GiCheckboxTree } from "react-icons/gi";
import { MdOutlineInventory2 } from "react-icons/md";
import { IoLogOutOutline } from "react-icons/io5";
import { SlOrganization } from "react-icons/sl";
import { FaUsersGear } from "react-icons/fa6";
import { TbTemplate } from "react-icons/tb";
import { FaUserFriends } from "react-icons/fa";
import { HiOutlineDesktopComputer } from "react-icons/hi";
import { TbLockAccess } from "react-icons/tb";
import { BiPieChart } from "react-icons/bi";

import { motion } from "framer-motion";
import { AppRoutes } from "../../constants/app.routes";
import Scrollbars from "react-custom-scrollbars";

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const scrollbarRef = useRef();
  const navigate = useNavigate()
  const toggleHandler = () => {
    setOpen(!open);
  };
  const handleLogout =()=>{
    localStorage.removeItem("token");
    window.location.reload();
    // navigate(Routes.LOGIN)
  }
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
        <Scrollbars ref={scrollbarRef} className={classes.links} height={"80%"}>
            <NavLink
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
            </NavLink>
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

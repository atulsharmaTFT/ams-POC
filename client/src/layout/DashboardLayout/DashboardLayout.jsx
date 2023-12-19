import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import classes from "./DashboardLayout.module.scss"
const DashboardLayout = () => {
  return (
    <div className={classes.layout}>
      <div className={classes.right}>
        <React.Suspense fallback={<div>Loading...</div>}>
          <Navbar />
          <div className={classes.main}>
            <Outlet />
          </div>
        </React.Suspense>
      </div>
      <div className={classes.left}>
        <Sidebar />
      </div>
    </div>
  );
};

export default DashboardLayout;

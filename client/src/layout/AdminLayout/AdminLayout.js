import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../../components/AdminSidebar/AdminSidebar";
import classes from "./AdminLayout.module.scss";

// import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getError,useAdminApiService } from "../../helper/commonHelpers";
const AdminLayout = () => {
  // const dispatch = useDispatch();
  return (
    <div className={classes.AdminLayout}>
      <div
        className={
          window.location.pathname === "/print"
            ? classes.printLayout
            : classes.adminRight
        }
      >
        <React.Suspense fallback={<p>Loading</p>}>
          <Outlet />
        </React.Suspense>
      </div>

      <div className={classes.adminLeft}>
        <AdminSidebar />
      </div>
    </div>
  );
};

export default AdminLayout;

import React from "react";
import { useRoutes } from "react-router-dom";
import { userRoutes, adminRoutes } from "./routes";
import classes from "./Page.module.scss";

const Screens = () => {
  const role = "admin";
  // const token = localStorage.getItem("token");
  var token = "";
  return (
    <div className={classes.page}>
      <React.Suspense fallback={<p>Loading...</p>}>
        {useRoutes(adminRoutes(token, role))}
      </React.Suspense>
    </div>
  );
};

export default React.memo(Screens);

import React from "react";
import classes from "./Dashboard.module.scss"
import { DashboardCards } from "../../components/DashboardCard/DashboardCards";
const Dashboard = () => {

  const dummyData=[
    {id:1, description: "Windows", icon: "FaWindows", count:"243", color:"#8cd7ff", iconColor:"#1ba7f2"},
    {id:2, description: "MacOS", icon: "AiFillApple", count:"173" , color:"#9db9c4", iconColor:"#465257"},
    {id:3, description: "Android", icon: "FcAndroidOs", count:"132", color:"#62b830", iconColor:"#3c701d"},
    {id:4, description: "iOS", icon: "FaMobileAlt", count:"61", color:"#757575", iconColor:"#161616"},
];
  return (
    <div className={classes.main}>
      <div className={classes.dashCard}>
      {dummyData.map((item)=> <DashboardCards key={item?.id} data={item}/>)}
      </div>
    </div>
  );
};
export default Dashboard;

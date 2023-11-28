import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import Screens from "./Screens";
import ToastNotification from "./components/ToastNotification/ToastNotification";

const App = () => {
  
  return (
    <BrowserRouter>
    <Screens />
    <ToastNotification />
  </BrowserRouter>
  );
};

export default App;

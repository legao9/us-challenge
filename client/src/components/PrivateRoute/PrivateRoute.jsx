import React, { useState } from 'react';
import { Navigate } from "react-router-dom";


const PrivateRoute = ({children }) => {


 
    return localStorage.getItem("token") ? children : <Navigate to="/signin" />;
  };

  export default PrivateRoute;
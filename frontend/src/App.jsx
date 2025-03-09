import { useState } from 'react'
import './App.css'
import { Router, Route, Routes } from 'react-router-dom';
import { Navigate } from "react-router-dom";
import RegisterUser from '../pages/RegisterUser.jsx';
import SuccessPage from '../pages/SuccessPage.jsx';
import UserData from '../pages/UserData.jsx';
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../src/utils";
function App() {
  return (
    <div className='h-[100%]'>
      
      <Routes>
      
        <Route path="/" element={<RegisterUser />} />
        <Route path="/success" element={<SuccessPage/>} />
        <Route path="/data" element={<UserData />} />
      </Routes>
      <ToastContainer position="top-right" />
    </div>
  );
}

export default App;

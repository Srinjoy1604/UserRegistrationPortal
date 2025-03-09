import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Router, Route, Routes } from 'react-router-dom';
import { Navigate } from "react-router-dom";
import RegisterUser from '../pages/RegisterUser.jsx';
import Dashboard from '../pages/Dashboard.jsx';
import UserData from '../pages/UserData.jsx';
function App() {
  return (
    <div className='h-[100%]'>
      
      <Routes>
      
        <Route path="/" element={<RegisterUser />} />
        <Route path="/success" element={<Dashboard />} />
        <Route path="/data" element={<UserData />} />
      </Routes>
    </div>
  );
}

export default App;

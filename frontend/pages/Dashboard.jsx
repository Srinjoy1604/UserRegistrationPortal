import React, { useEffect, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { handleSuccess } from '../src/utils';
import { toast, ToastContainer } from 'react-toastify';
import tick from "../images/SuccessTick.gif";
export default function Dashboard() {
  const navigate = useNavigate();

 
  return (
    <div className='h-[100%]  flex justify-center align-items-center'>
      <div className='w-[100%]  h-[100%] flex justify-center align-items-center flex-col text-center '>
        <div className='m-[5%]  bg-red-300 flex justify-center align-items-center flex-col text-[2rem] p-[2%]'>
          <div className='grid place-items-center '>
          <img src={tick} className='h-[100%] w-auto'></img>
          <h1 className=' bg-blue-700'>Thank you for registering !!</h1>
          <h1>Registration Successfull</h1>
          <button onClick={()=>navigate("/data")}>View User List</button>
          </div>
         
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

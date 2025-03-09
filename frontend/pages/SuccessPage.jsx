import React, { useEffect, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { handleSuccess } from '../src/utils';
import { toast, ToastContainer } from 'react-toastify';
import tick from "../images/SuccessTick.gif";
import styles from './Success.module.css';
export default function SuccessPage() {
  const navigate = useNavigate();


  return (
    <div className={`h-[100%]  flex justify-center align-items-center `}
      style={{
        backgroundImage: `url("./pexels-codioful-7134981.jpg")`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}

    >
      <div className='w-[100%]  h-[100%] flex justify-center align-items-center flex-col text-center '>
        <div className='m-[5%]   flex justify-center align-items-center flex-col text-[2rem] p-[2%]'
          style={{
            background: "rgba(0, 0, 0, 0.43)",
            borderRadius: "16px",
            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
            backdropFilter: "blur(6.7px)",
            WebkitBackdropFilter: "blur(6.7px)",
            border: "1px solid rgba(0, 0, 0, 0.3)",
          }}
        >
          <div className={`grid place-items-center ${styles.SuccessPageCont}`}>
            <img src={tick} className={`h-[100%] w-auto`}></img>
            <h1 className='text-[3rem] break-words text-amber-400 m-[1%]'>Registration Successful</h1>
            <h2 className='m-[1%]'>Thank you for registering !!</h2>

            <div className='w-[100%] flex flex-wrap justify-evenly flex-row mt-[2%]'>
              <button onClick={() => navigate("/data")} className={`${styles.ButtonMain} ${styles.GotoBtn} m-[1%]`}>View User Registrations</button>
              <button onClick={() => navigate("/")} className={`${styles.ButtonMain} ${styles.RegisterMoreBtn} m-[1%]`}>Register more users</button>
            </div>
          </div>

        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

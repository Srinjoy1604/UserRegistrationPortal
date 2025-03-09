import React, { useState, useEffect } from "react";
import styles from "./SignUp.module.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../src/utils";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Clogo from "../images/FinacPlus.webp";
const BASE_Url = import.meta.env.VITE_BASE_URL;

export default function RegisterUser() {
  const [signInfo, setSignUpInfo] = useState({
    name: "",
    age: "",
    dateOfBirth: "",
    gender: "",
    about: "",
    password: "",
  });

  const [genders, setGenders] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGenders = async () => {
      try {
        const response = await axios.get(`${BASE_Url}/user/genders`);
        setGenders(response.data);
      } catch (error) {
        handleError("Failed to fetch gender options.");
      }
    };
    fetchGenders();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignUpInfo({ ...signInfo, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, age, dateOfBirth, gender, about, password } = signInfo;

    if (!name || !age || !dateOfBirth || !gender || !password) {
      return handleError("All fields except 'About' are required.");
    }

    if (name.length < 2) return handleError("Name must be at least 2 characters.");
    if (isNaN(age) || age < 0 || age > 120) return handleError("Age must be between 0 and 120.");
    if (about.length > 5000) return handleError("About section should not exceed 5000 characters.");
    if (password.length < 10 || !/(?=.*[a-zA-Z])(?=.*\d)/.test(password)) {
      return handleError("Password must be at least 10 characters and contain letters and digits.");
    }

    const birthDate = new Date(dateOfBirth);
    const today = new Date();
    let calculatedAge = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      calculatedAge--;
    }

    if (parseInt(age) !== calculatedAge) {
      return handleError("Entered age does not match the date of birth.");
    }

    try {
      const response = await axios.post(`${BASE_Url}/user/register`, signInfo, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const { message, success, error } = response.data;

      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/success");
        }, 1000);
      } else if (error) {
        const details = error?.details[0]?.message || "Something went wrong!";
        handleError(details);
      } else {
        handleError(message);
      }
    } catch (error) {
      const details = error?.response?.data?.error?.details[0]?.message || "Server error.";
      handleError(details);
    }
  };

  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <div className={`${styles.MainBlockBackground} p-[2%]`}>
      <div className="grid place-items-center w-[100%]"><img src={Clogo} className="w-[10%]"></img></div>
      <div className={`m-[2%] `}><button onClick={() => navigate("/data")} className={`${styles.ButtonMain} ${styles.GotoBtn} `}>Show and update user registrations</button></div>
      <div className={styles.MainBlock}>
        <h1 className="text-[3rem] text-orange-500 break-words">Register User</h1>
        <form className={styles.FormMain} onSubmit={handleSubmit}>
          <div className={styles.InputBar}>
            <label htmlFor="name">User Name</label>
            <input
              onChange={handleChange}
              type="text"
              name="name"
              autoFocus
              placeholder="Enter your username"
              value={signInfo.name}
              
            />
          </div>
          <div className={styles.InputBar}>
            <label htmlFor="age">Age</label>
            <input
              onChange={handleChange}
              type="number"
              name="age"
              placeholder="Enter your age"
              value={signInfo.age}
            />
          </div>
          <div className={styles.InputBar}>
            <label htmlFor="dateOfBirth">Date of Birth</label>
            <input
              onChange={handleChange}
              type="date"
              name="dateOfBirth"
              value={signInfo.dateOfBirth}
              max={getTodayDate()}
            />
          </div>
          <div className={styles.InputBar}>
            <label htmlFor="password">Password</label>
            <div style={{ position: "relative" }} className="w-[100%]">
              <input
                onChange={handleChange}
                type={showPassword ? "text" : "password"}
                name="password"
                autoComplete="on"
                placeholder="Enter your password"
                value={signInfo.password}
                style={{ paddingRight: "35px" }}
                className="w-[100%]"
              />
              <span
                onClick={() => setShowPassword((prev) => !prev)}
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                  color: "#555"
                }}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>
          <div className={styles.InputBar}>
            <label htmlFor="gender">Gender</label>
            <select name="gender" onChange={handleChange} value={signInfo.gender} className="border-1 border-stone-500 p-[1%] rounded-[12px] ">
              <option value="">Select Gender</option>
              {genders.map((g, index) => (
                <option key={index} value={g}>{g}</option>
              ))}
            </select>
          </div>
          <div className={styles.InputBar}>
            <label htmlFor="about">About</label>
            <textarea
              onChange={handleChange}
              name="about"
              placeholder="Tell us about yourself..."
              value={signInfo.about}
              maxLength={5000}   className="w-[100%] h-[80%] min-h-[200px] border-2 border-black p-[1%] text-black"
            />
            <p style={{ fontSize: "12px", color: "black", marginTop: "5px" }} >
              {signInfo.about.length} / 5000 characters
            </p>
          </div>

          <div className={styles.SubmitButton}>
            <button type="submit">Register</button>
          </div>
        </form>

     
      </div>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import styles from "./SignUp.module.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../src/utils";

const BASE_Url=import.meta.env.VITE_BASE_URL;
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

    // Age validation based on date of birth
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

  // Get today's date in YYYY-MM-DD format for max attribute
  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <div className={`${styles.MainBlockBackground} p-[2%]`}>
    <div><button onClick={() => navigate("/data")}>Show and update user list</button></div>
      <div className={styles.MainBlock}>
        <h1>Register User</h1>
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
              max={getTodayDate()} // Prevents selecting future dates
            />
          </div>
          <div className={styles.InputBar}>
            <label htmlFor="password">Password</label>
            <input
              onChange={handleChange}
              type="password"
              name="password"
              autoComplete="on"
              placeholder="Enter your password"
              value={signInfo.password}
            />
          </div>
          <div className={styles.InputBar}>
            <label htmlFor="gender">Gender</label>
            <select name="gender" onChange={handleChange} value={signInfo.gender}>
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
              maxLength={5000}
            />
            {/* Character Count Below Textarea */}
            <p style={{ fontSize: "12px", color: "#555", marginTop: "5px" }}>
              {signInfo.about.length} / 5000 characters
            </p>
          </div>

          <div className={styles.SubmitButton}>
            <button type="submit">Register</button>
          </div>
        </form>

        <ToastContainer />
      </div>
    </div>
  );
}

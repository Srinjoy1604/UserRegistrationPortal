import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../src/utils";

import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from "dayjs";

import styles from "./UserData.module.css";
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const BASE_Url = import.meta.env.VITE_BASE_URL;

function UserData() {
    const [userData, setUserData] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [editOpen, setEditOpen] = useState(false);
    const [Loading,setLoadingText]=useState("Loading...");
    const [formData, setFormData] = useState({
        name: "",
        age: "",
        dateOfBirth: "",
        gender: "",
        about: "",
        password: ""
    });
    const [genders, setGenders] = useState([]);
    const fetchUsersData = async () => {
        try {
            const response = await axios.get(`${BASE_Url}/user/usersData`);
            if (response.data.success) {
                setUserData(response.data.users);
                
            } else {
                setUserData([]);
                setLoadingText("No user registration yet");
            }
        } catch (error) {
            handleError("Failed to fetch User Data ");
        }
    };
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
        fetchUsersData();
    }, []);

    const handleClickOpen = (user) => {
        setSelectedUser(user);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedUser(null);
    };

    const handleEditBox = (user) => {
        setFormData({
            name: user.name || "",
            age: user.age || "",
            dateOfBirth: user.dateOfBirth ? new Date(user.dateOfBirth).toISOString().split("T")[0] : "",
            gender: user.gender || "",
            about: user.about || "",
            password: ""
        });
        setSelectedUser(user);
        setEditOpen(true);
    };

    const handleEditClose = () => {
        setEditOpen(false);
        setFormData({
            name: "",
            age: "",
            dateOfBirth: "",
            gender: "",
            about: "",
            password: ""
        });
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const isAgeMatchingDOB = (dob, age) => {
        const birthDate = new Date(dob);
        const today = new Date();
        let calculatedAge = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            calculatedAge--;
        }
        return calculatedAge === parseInt(age);
    };

    const handleUpdate = async () => {
        if (!formData.password.trim()) {
            handleError("Please enter your password to confirm update.");
            return;
        }

        if (!isAgeMatchingDOB(formData.dateOfBirth, formData.age)) {
            handleError("The provided Age does not match the Date of Birth.");
            return;
        }

        const updated = await updateUserProfile(selectedUser._id, formData);
        if (updated.success) {
            handleEditClose();
            handleSuccess(updated.message);
            fetchUsersData();

        }
        else {
            handleError(updated.message);
        }
    };



    const handleDelete = async (user) => {
        try {
            const response = await axios.delete(`${BASE_Url}/user/${user._id}`);
            (response.data.success ? handleSuccess("User Deleted Successfully") : handleError(`${response.data.message}`));
            fetchUsersData();
        }
        catch (error) {
            handleError("Failed to delete User  ");
        }
    }

    const updateUserProfile = async (userId, formData) => {
        try {
            const response = await axios.put(
                `${BASE_Url}/user/${userId}`,
                formData,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            // handleSuccess("Profile updated successfully");
            return response.data;
        } catch (error) {
            if (error.response && error.response.data) {
                handleError(error.response.data.message);
            } else {
                handleError("Something went wrong");
            }
            return null;
        }
    };

    // useEffect(() => {
    //     fetchUsersData();
    // }, []);

    return (
        <div  className={`${styles.DataMain} h-[100%]`}
        style={{
            backgroundImage: `url("./pexels-codioful-7134981.jpg")`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}>
            <h1 className="w-[100%] bg-amber-500  p-[1%] text-black text-[2rem]">Registered Users</h1>
            <div>
                {userData.length > 0 ? (
                    <div >
                        {userData.map((ele, ind) => (
                            <div key={ind} className={`border-1 border-slate-400 m-[1%] ${styles.NameTag} p-[2%]`}>
                                <div className="grid w-[100%]">
                                    <p className="mt-[1%] text-[1.2rem] w-[100%] grid place-items-start">{ele.name}</p>
                                    <div className="flex flex-wrap justify-evenly align-middle">
                                        <button onClick={() => handleClickOpen(ele)} className={`${styles.ButtonMain} ${styles.ShowBtn}`}>Show data</button>
                                        <button onClick={() => handleDelete(ele)} className={`${styles.ButtonMain} ${styles.DeleteBtn}`}>Delete</button>
                                        <button onClick={() => handleEditBox(ele)} className={`${styles.ButtonMain} ${styles.UpdateDataBtn}`}>Update User Data</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <h1 className="text-orange-400 text-[2rem] break-words bg-black text-center">{Loading}</h1>
                )}
            </div>

            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
                maxWidth="md"
                fullWidth={true}
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    {selectedUser ? `User data of ${selectedUser.name}` : ""}
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={(theme) => ({
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: theme.palette.grey[500],
                    })}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent dividers>
                    <Typography gutterBottom>
                        Age: {selectedUser?.age}
                    </Typography>
                    <Typography>
                        Date of Birth: {selectedUser?.dateOfBirth ? new Date(selectedUser.dateOfBirth).toISOString().split('T')[0] : ''}
                    </Typography>
                    <Typography gutterBottom>
                        Gender: {selectedUser?.gender}
                    </Typography>
                    <Typography gutterBottom>
                        About: {selectedUser?.about}
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        OK
                    </Button>
                </DialogActions>
            </BootstrapDialog>

            <Dialog open={editOpen} onClose={handleEditClose} fullWidth maxWidth="sm">
                <DialogTitle>Update User Data</DialogTitle>
                <DialogContent>
                    <div className="flex flex-col gap-4 mt-2">
                        <label>Name</label>
                        <input type="text" name="name" value={formData.name} onChange={handleFormChange} className="border p-2 rounded" />

                        <label>Age</label>
                        <input type="number" name="age" value={formData.age} onChange={handleFormChange} className="border p-2 rounded" />

                        <label>Date of Birth</label>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label="Select DOB"
                                value={formData.dateOfBirth ? dayjs(formData.dateOfBirth) : null}
                                onChange={(newValue) => {
                                    setFormData((prev) => ({
                                        ...prev,
                                        dateOfBirth: newValue ? newValue.format("YYYY-MM-DD") : ""
                                    }));
                                }}
                                slotProps={{ textField: { fullWidth: true, variant: "outlined" } }}
                            />
                        </LocalizationProvider>

                        <label>Gender</label>
                        <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleFormChange}
                            className="border p-2 rounded"
                        >
                            <option value="">Select Gender</option>
                            {genders.map((genderOption, index) => (
                                <option key={index} value={genderOption}>
                                    {genderOption}
                                </option>
                            ))}
                        </select>


                        <label>About</label>
                        <textarea name="about" value={formData.about} onChange={handleFormChange} className="border p-2 rounded h-28 resize-none" maxLength={5000} />

                        <label>Enter Password to Confirm Update</label>
                        <input type="password" name="password" value={formData.password} onChange={handleFormChange} className="border p-2 rounded" />
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleEditClose}>Cancel</Button>
                    <Button onClick={handleUpdate} variant="contained" color="primary">Update</Button>
                </DialogActions>
            </Dialog>

       
        </div>
    );
}

export default UserData;


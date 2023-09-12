import "./App.css";
import React, { useState, createContext } from "react";

import { Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";


import { Button, TextField, Autocomplete } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import Login from "./auth_components/Login";
import Error from "./components/Error";
import UserFilter from "./auth_components/UserFilter";
import AdminDashboard from "./components/AdminDashboard";
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"

export const AppProvider = createContext();

function App() {
    // ============= RTK ==========
    const token = useSelector((state) => state.tokenSlice.token);
    const dispatch = useDispatch();

    const [isAdmin, setIsAdmin] = useState(false);
    const config = { headers: { authorization: `Bearer ${token}` } };

    const genderOptions = [
        { label: "Male", value: "male" },
        { label: "Female", value: "female" },
        { label: "Other", value: "other" },
    ];
    const userOption = [
        { label: "Admin", value: "admin" },
        { label: "User", value: "user" },
    ];

    return (
        <div className="main-container">
            <AppProvider.Provider
                value={{
                    config,
                    isAdmin,
                    setIsAdmin,
                }}
            >
                {token !== null ? (
                    <Navbar />
                ) : null}

                <Routes>
                    <Route path="*" element={<Error />} />
                    <Route path="/" element={<UserFilter />} />
                    <Route path="/login" element={<Login />} />
                </Routes>

                {token !== null ? (
                    <Footer />
                ) : null}

            </AppProvider.Provider>
        </div>

        // <div className="App">
        //     <header className="main-container">
        //         <h2>USER MANAGEMENT SYSTEM</h2>
        //         <TextField id="outlined-basic" label="Username" variant="outlined" />
        //         <TextField
        //             id="outlined-basic"
        //             type={showPassword ? "text" : "password"}
        //             label="Password"
        //             variant="outlined"
        //             InputProps={{
        //                 endAdornment: (
        //                     <InputAdornment position="end">
        //                         <IconButton onClick={togglePasswordVisibility} edge="end">
        //                             {showPassword ? <VisibilityOff /> : <Visibility />}
        //                         </IconButton>
        //                     </InputAdornment>
        //                 ),
        //             }}
        //         />

        //         <Button variant="contained" className="Button">
        //             LOGIN
        //         </Button>
        //     </header>

        //     {/*=====================================*/}
        //     <div className="form-container">
        //         <TextField id="outlined-basic" label="First Name" variant="outlined" />
        //         <TextField id="outlined-basic" label="Last Name" variant="outlined" />
        //         <TextField id="outlined-basic" label="Address" variant="outlined" />
        //         <TextField id="outlined-basic" label="Email" variant="outlined" />
        //         <TextField id="outlined-basic" label="Username" variant="outlined" />
        //         <Autocomplete
        //             id="gender-picker"
        //             options={genderOptions}
        //             getOptionLabel={(option) => option.label}
        //             clearOnEscape
        //             renderInput={(params) => <TextField {...params} label="Gender" variant="outlined" />}
        //         />
        //         <Autocomplete
        //             id="gender-picker"
        //             options={userOption}
        //             getOptionLabel={(option) => option.label}
        //             clearOnEscape
        //             renderInput={(params) => <TextField {...params} label="User Role" variant="outlined" />}
        //         />
        //         <LocalizationProvider dateAdapter={AdapterDayjs}>
        //             <DatePicker label="Birthday" />
        //         </LocalizationProvider>
        //     </div>
        // </div>
    );
}

export default App;

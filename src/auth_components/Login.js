import React, { useState, useContext, useEffect } from "react";
import { AppProvider } from "../App";

import { Box, Button, TextField, IconButton, InputAdornment, Alert, AlertTitle, CircularProgress } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useLoginUserMutation } from "../apiSlice";
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { setToken, setIsAdmin } from "../stateSlice";

import Loading from '../components/Loading'

const Login = () => {
    // ============= RTK ==========
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [loginUser,
        {
            isLoading: loginLoading
        }] = useLoginUserMutation();

    // ============= LOGIN FORM ==========

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [successLogin, setSuccessLogin] = useState(false);
    const [errorLogin, setErrorLogin] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    // useEffect(() => {
    //     if (loginLoading) {
    //         return (
    //             <Loading />
    //         )
    //     }

    // }, [loginLoading])

    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };

    const formData = {
        email: `${email}`,
        password: `${password}`,
    };

    // Event handler for form input changes
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const res = await loginUser(formData);
            if (res.data.status === 200) {
                dispatch(setToken(res.data.token));
                dispatch(setIsAdmin(res.data.filteredUser.isAdmin));
                navigate("/");
            } else {
                setErrorLogin(false);
                console.log("No user found");
            }
        } catch (err) {
            setErrorLogin(true);
        }
    };

    return (
        <div className="login-box">

            {loginLoading ? <Loading />
                :
                <form onSubmit={handleSubmit} className="form-box">
                    <h2>USER MANAGEMENT SYSTEM</h2>
                    <div className="col">
                        <TextField
                            id="outlined-basic"
                            className="login-textfield"
                            label="Email"
                            variant="outlined"
                            value={email}
                            onInput={(e) => setEmail(e.target.value)}
                            InputLabelProps={{ shrink: true }}
                        />
                        <TextField
                            id="outlined-basic"
                            className="login-textfield"
                            type={showPassword ? "text" : "password"}
                            label="Password"
                            variant="outlined"
                            value={password}
                            onInput={(e) => setPassword(e.target.value)}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={togglePasswordVisibility} edge="end">
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                            InputLabelProps={{ shrink: true }}

                        />
                        <div className="alert-container">
                            {successLogin && (
                                <Alert severity="success">
                                    <AlertTitle>Login Successful</AlertTitle>
                                </Alert>
                            )}
                            {errorLogin && (
                                <Alert severity="error">
                                    <AlertTitle>Incorrect Credentials</AlertTitle>
                                </Alert>
                            )}
                        </div>
                    </div>

                    <Button type="submit" variant="contained" className="Button">
                        LOGIN
                    </Button>
                </form>
            }

        </div>
    );
};

export default Login;

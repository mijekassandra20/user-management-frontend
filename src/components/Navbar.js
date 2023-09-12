import React from 'react'
import { AppBar, Box, Toolbar, Typography, Button } from "@mui/material";

import { clearToken } from '../stateSlice';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


const Navbar = () => {

    // ============= RTK ==========
    const token = useSelector((state) => state.tokenSlice.token);
    const dispatch = useDispatch();

    // ============= ROUTER & USESTATE ==========
    const navigate = useNavigate();

    // ============= HANDLE ==========
    const handleLogout = async () => {
        try {
            //clears the token from the store
            dispatch(clearToken());
            navigate("/");
            // console.log(token);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography component="div" sx={{ flexGrow: 1 }}>
                            <h4 className='nav-title'>USER MANAGEMENT SYSTEM</h4>
                        </Typography>
                        <Button color="inherit" onClick={handleLogout}>
                            LOGOUT
                        </Button>
                    </Toolbar>
                </AppBar>
            </Box>

        </div>
    )
}

export default Navbar
import React, { useState } from "react";

import DisplayUsers from "./DisplayUsers";
import AddUserForm from "./AddUserForm";

import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";

import { Button } from "@mui/material";
import { clearToken } from "../stateSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
    // ============= RTK ==========
    const token = useSelector((state) => state.tokenSlice.token);
    const dispatch = useDispatch();

    // ============= ROUTER & USESTATE ==========
    const navigate = useNavigate();
    const [openForm, setOpenForm] = useState(false);

    const handleOpenForm = () => {
        setOpenForm(true);
    };
    const handleCloseForm = () => {
        setOpenForm(false);
    };

    return (
        <div className="dashboard-container">
            <div className="header-container">
                <h2>Admin Dashboard</h2>
                <Button
                    className="button-style with-icons"
                    variant="contained"
                    startIcon={<PersonAddAlt1Icon />}
                    onClick={handleOpenForm}
                >
                    ADD USER
                </Button>
            </div>
            <DisplayUsers />

            <AddUserForm
                open={openForm}
                onClose={handleCloseForm}
                disagreeText="Cancel"
                agreeText="Submit"
                handleCloseForm={handleCloseForm}
            />
        </div>
    );
};

export default AdminDashboard;

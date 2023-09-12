// prettier-ignore
import React, { useContext } from "react";
import { AppProvider } from "../App";
import { Login } from "@mui/icons-material";
import AdminDashboard from "../components/AdminDashboard";
import UserDashboard from "../components/UserDashboard";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const UserFilter = () => {
    // ============= RTK ==========
    const token = useSelector((state) => state.tokenSlice.token);
    const isAdmin = useSelector((state) => state.isAdminSlice.isAdmin);

    return (
        <>
            {console.log(token)}
            {!token ? <Navigate to="/login" /> : isAdmin ? <AdminDashboard /> : <UserDashboard />}
        </>
    );
};

export default UserFilter;

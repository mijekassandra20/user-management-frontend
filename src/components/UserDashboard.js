import React from "react";
import DisplayUsers from "./DisplayUsers";

const UserDashboard = () => {

    return (
        <div className="dashboard-container">
            <div className="header-container">
                <h2>User Dashboard</h2>
            </div>
            <DisplayUsers />
        </div>
    )

};

export default UserDashboard;

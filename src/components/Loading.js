import React from 'react'

import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const Loading = () => {

    const loadingStyle = {
        height: "500px",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    };
    return (
        <Box sx={loadingStyle}>
            <CircularProgress />
        </Box>
    );
}

export default Loading
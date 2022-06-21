import React from "react";
import {Box} from "@mui/material";

const Layout = ({children}) => {
    return (
        <React.Fragment>
            <Box sx={{minHeight: '100vh', backgroundColor: 'background.default'}}>
                {children}
            </Box>
        </React.Fragment>
    )
}

export default Layout;
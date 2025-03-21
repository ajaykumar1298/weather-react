import { Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import FindInPageOutlinedIcon from "@mui/icons-material/FindInPageOutlined";
import React from "react";

function ClickButton({ onClick }) {
    return (
        <div className="mt-3 ">
            <Button variant="contained" color="primary" size="large" className="!bg-blue-600 hover:!bg-blue-700 text-white px-6 py-3 rounded-lg shadow-lg transition duration-300" endIcon={<FindInPageOutlinedIcon />} onClick={onClick}>
                Find
            </Button>
        </div>
    );
}

export default ClickButton;

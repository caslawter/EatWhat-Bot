import React from "react";
import { BackButton, useWebApp } from "@vkruglikov/react-telegram-web-app";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Wheel from "../components/Wheel";

function RNG() {
    const navigate = useNavigate();
    const { state } = useLocation();
    const { formData } = state;
    console.log(formData);

    return (
        <>
            <BackButton onClick={() => navigate(-1)} />
            <Wheel data={formData} />
        </>
    );
}

export default RNG;

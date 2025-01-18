import React from "react";
import { BackButton, useWebApp } from "@vkruglikov/react-telegram-web-app";
import { Link, useNavigate } from "react-router-dom";
import Wheel  from "../components/Wheel.tsx";

function RNG() {
    const navigate = useNavigate();
    return (
        <>
            <BackButton onClick={() => navigate(-1)} />
            <Wheel />
        </>
    );
}

export default RNG;

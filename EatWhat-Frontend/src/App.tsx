import { useState, useEffect } from "react";
// import "./App.css";
import axios from "axios";
import React from "react";
import { useWebApp } from "@vkruglikov/react-telegram-web-app";
import { useThemeParams } from "@vkruglikov/react-telegram-web-app";



import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import About from "./pages/About";
import Preference from "./pages/Preference";
import MapPage from "./pages/MapPage";
import RestaurantList from "./pages/RestaurantList";
import RestaurantDetail from "./pages/RestaurantDetail";
import RNG from "./pages/RNG";

function App() {
  const [colorScheme, themeParams] = useThemeParams();
  const WebApp = useWebApp();

  console.log(WebApp.version);

  console.log({
    text_color: themeParams.text_color,
    button_color: themeParams.button_color,
    bg_color: themeParams.bg_color,
  });

  

  useEffect(() => {
    console.log(import.meta.env.VITE_BACKEND_PORT);
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/about" element={<About />} />
      <Route path="/map" element={<MapPage />} />
      <Route path="/preference" element={<Preference />} />
      <Route path="/restaurantList" element={<RestaurantList />} />
      <Route path="/restaurantList/:id" element={<RestaurantDetail />} />
      <Route path="/rng" element={<RNG/>} />
    </Routes>
  );
}

export default App;

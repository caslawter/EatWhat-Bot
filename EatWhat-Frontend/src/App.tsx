import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import React from "react";
import { useWebApp } from "@vkruglikov/react-telegram-web-app";
import { useThemeParams } from "@vkruglikov/react-telegram-web-app";



import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import About from "./pages/About";
import Preference from "./pages/Preference";
import Map from "./pages/Map";
import RestaurantList from "./pages/RestaurantList";
import RestaurantDetail from "./pages/RestaurantDetail";

function App() {
  const [count, setCount] = useState(0);
  const [colorScheme, themeParams] = useThemeParams();
  const WebApp = useWebApp();

  console.log(WebApp.version);

  console.log({
    text_color: themeParams.text_color,
    button_color: themeParams.button_color,
    bg_color: themeParams.bg_color,
  });

  useEffect(() => {
    async function getGoogleResults() {
      try {
        let results = await axios.get(
          `${import.meta.env.VITE_BACKEND_PORT}/api/places`,
          {
            params: {
              lat: 1.2976174485362484,
              lng: 103.85488811330647,
              radius: 5000,
              min: 1,
              max: 1,
            },
          }
        );
        console.log(results);
      } catch (error) {
        console.log(error);
      }
    }
    getGoogleResults();
  }, []);

  useEffect(() => {
    console.log(import.meta.env.VITE_BACKEND_PORT);
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/about" element={<About />} />
      <Route path="/map" element={<Map />} />
      <Route path="/prefereence" element={<Preference />} />
      <Route path="/restaurantList" element={<RestaurantList />} />
      <Route path="/restaurantList/:id" element={<RestaurantDetail />} />
    </Routes>
  );
}

export default App;

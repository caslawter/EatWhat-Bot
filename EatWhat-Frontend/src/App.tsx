import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import React from 'react'
import { Routes,Route } from "react-router-dom";
import Landing from "./pages/Landing";
import About from "./pages/About";
import Preference from "./pages/Preference";
import Map from "./pages/Map";
import RestaurantList from "./pages/RestaurantList";
import RestaurantDetail from "./pages/RestaurantDetail";

function App() {
  return (
    <Routes>
      <Route path='/' element = {<Landing/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/map' element={<Map/>}/>
      <Route path='/prefereence' element={<Preference/>}/>
      <Route path='/restaurantList' element={<RestaurantList/>}/>
      <Route path='/restaurantList/:id' element={<RestaurantDetail/>}/>
    </Routes>
  )
}


export default App;

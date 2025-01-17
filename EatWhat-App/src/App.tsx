import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import React from 'react'
import { Routes } from "react-router-dom";
import Landing from "./pages/Landing";

function App() {
  return (
    <Routes>
      <Route path='/' element = {<Landing/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/map' element/>
      <Route/>
      <Route/>
      <Route/>
      <Route/>
    </Routes>
  )
}


export default App;

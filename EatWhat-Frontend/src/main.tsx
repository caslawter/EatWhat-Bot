import React, { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
// import './index.css'
import "./styles/tailwind.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { Loading } from './components/Loading.tsx';


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Suspense fallback={<Loading/>}>
        <App />
      </Suspense>
    </BrowserRouter>
  </StrictMode>
);


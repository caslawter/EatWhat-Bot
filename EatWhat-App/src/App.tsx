import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { useWebApp } from "@vkruglikov/react-telegram-web-app";
import { useThemeParams } from '@vkruglikov/react-telegram-web-app';
import axios from "axios";

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
        let results = await axios.get(`http://localhost:8000/api/places`,{
          params: {
            lat: 1.2976174485362484,
            lng:103.85488811330647,
            radius:5000,
            min:1,
            max:1
          },
        });
        console.log(results);
      } catch (error) {
        console.log(error);
      }
    }
    getGoogleResults();
  }, []);


  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> your nenekla
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;

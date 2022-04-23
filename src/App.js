import { useEffect } from "react";
import "./App.css";
import DetectLocation from "./DetectLocation";
import { weatherQuery } from "./helper";

function App() {
  useEffect(() => {
    fetch("http://localhost:4000/", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        query: weatherQuery("Changwon"),
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => console.log(response));
  }, []);

  return (
    <div className="App">
      <DetectLocation />
    </div>
  );
}

export default App;

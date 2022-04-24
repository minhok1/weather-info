import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { updateInfo } from "./actions";
import "./App.css";
import DetectLocation from "./DetectLocation";
import { weatherQuery } from "./helper";
import store from "./store";

function App() {
  const [city, setCity] = useState("");
  const weatherData = useSelector((state) => state);

  const makeFetchCall = useCallback(() => {
    fetch("https://graphql-weather-api.herokuapp.com/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: weatherQuery(city),
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        store.dispatch(updateInfo(response.data.getCityByName.weather));
      });
  }, [city]);

  useEffect(() => {
    if (city) {
      makeFetchCall();
    }
  }, [city, makeFetchCall]);

  return (
    <div className="App">
      <DetectLocation state={city} stateChanger={setCity} />

      <div>Weather for: {city}</div>

      {Object.keys(weatherData).map((key, i) => {
        if (key === "timestamp") {
          return (
            <div className="timestamp" key={i}>
              {key}-{weatherData[key]}
            </div>
          );
        } else {
          return (
            <div key={i}>
              <div className="category">{key}</div>
              {Object.keys(weatherData[key]).map((subkey, j) => {
                return (
                  <div className="entry" key={j}>
                    {subkey}-{weatherData[key][subkey]}
                  </div>
                );
              })}
            </div>
          );
        }
      })}

      <button
        className="refresh-button"
        onClick={() => {
          makeFetchCall();
        }}
      >
        Refresh
      </button>
    </div>
  );
}

export default App;

import { useEffect, useState } from "react";
import { updateInfo } from "./actions";
import "./App.css";
import DetectLocation from "./DetectLocation";
import { weatherQuery } from "./helper";
import store from "./store";

function App() {
  const [city, setCity] = useState("");

  const makeFetchCall = () => {
    fetch("http://localhost:4000/", {
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
  };

  useEffect(() => {
    if (city) {
      makeFetchCall();
    }
  }, [city]);

  return (
    <div className="App">
      <DetectLocation state={city} stateChanger={setCity} />
      <div>Clouds</div>
      <div>All: {store.getState().clouds.all}</div>
      <div>Humidity: {store.getState().clouds.humidity}</div>
      <div>Visibility: {store.getState().clouds.visibility}</div>

      <div>Summary</div>
      <div>Description: {store.getState().summary.description}</div>
      <div>Icon: {store.getState().summary.icon}</div>
      <div>Title: {store.getState().summary.title}</div>

      <div>Temperature</div>
      <div>Actual: {store.getState().temperature.actual}</div>
      <div>Feels like: {store.getState().temperature.feelslike}</div>
      <div>Max: {store.getState().temperature.max}</div>
      <div>Min: {store.getState().temperature.min}</div>

      <div>Wind</div>
      <div>Deg: {store.getState().wind.deg}</div>
      <div>Speed: {store.getState().wind.speed}</div>

      <button
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

import { UPDATE_INFO } from "./actions";

const initialState = {
  clouds: { all: "", visibility: "", humidity: "" },
  summary: { title: "", description: "", icon: "" },
  temperature: { actual: "", feelsLike: "", min: "", max: "" },
  wind: { speed: "", deg: "" },
  timestamp: "",
};

function rootReducer(state = initialState, action) {
  if (action.type === UPDATE_INFO) {
    return {
      ...state,
      clouds: {
        ...state.clouds,
        all: action.payload.clouds.all,
        visibility: action.payload.clouds.visibility,
        humidity: action.payload.clouds.humidity,
      },
      summary: {
        ...state.summary,
        title: action.payload.summary.title,
        description: action.payload.summary.description,
        icon: action.payload.summary.icon,
      },
      temperature: {
        ...state.temperature,
        actual: action.payload.temperature.actual,
        feelsLike: action.payload.temperature.feelsLike,
        min: action.payload.temperature.min,
        max: action.payload.temperature.max,
      },
      wind: {
        ...state.wind,
        speed: action.payload.wind.speed,
        deg: action.payload.wind.deg,
      },
      timestamp: action.payload.timestamp,
    };
  }
  return state;
}

export default rootReducer;

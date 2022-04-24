import { useCallback, useEffect } from "react";

export default function DetectLocation(props) {
  const success = useCallback(
    (pos) => {
      const crd = pos.coords;

      fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${crd.latitude}&lon=${crd.longitude}`
      )
        .then((response) => {
          return response.json();
        })
        .then((response) => {
          props.stateChanger(response.address.city);
        });
    },
    [props]
  );

  function errors(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  useEffect(() => {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };
    if (navigator.geolocation) {
      navigator.permissions.query({ name: "geolocation" }).then((result) => {
        navigator.geolocation.getCurrentPosition(success, errors, options);
      });
    } else {
      console.log("geo not available");
    }
  }, [success]);

  return <div></div>;
}

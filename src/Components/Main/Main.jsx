import React from "react";
import "./Main.css";
import { useState } from "react";
import axios from "axios";
import Weather from "./Weather";

export default function Main() {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [imgUrl, setimgUrl] = useState("");
  const [cityForecast, setCityForecast] = useState("");
  const [showForecast, setShowForecast] = useState(false);

  function handleChange(event) {
    setSearchQuery(event.target.value);
  }
  async function getLocation(event) {
    event.preventDefault();
    let res;
    try {
      //get city information on the api
      const API = `https://eu1.locationiq.com/v1/search?key=${process.env.REACT_APP_API_KEY}&q=${searchQuery}&format=json`;
      res = await axios.get(API);
      setLocation(res.data[0]);
      //get the image
      const APIImg = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_API_KEY}&center=${res.data[0].lat},${res.data[0].lon}&zoom=11&size=400x400&format=png&markers=icon:small-red-cutout|${res.data[0].lat},${res.data[0].lon}`;
      setimgUrl(APIImg);
    } catch (error) {
      if (error.response.status === 404) {
        alert("No location found with such name !");
      } else if (error.response.status === 500) {
        alert("Error from the server, pleae try again in a few minutes !");
      } else {
        alert("Don't spam, it's useless !");
      }
    }

    try {
      //get the weather
      const APIWeather = `http://localhost:8080/weather?lat=${res.data[0].lat}&lon=${res.data[0].lon}&searchQuery=${searchQuery}`;
      const weatherRes = await axios.get(APIWeather);
      let forecastList = <Weather forecast={weatherRes.data} />;
      setCityForecast(forecastList);
      setShowForecast(true);

      // let forecastList = weatherRes.data.map((forecast) => {
      //   return (
      //     <div>
      //       <p>Date: {forecast.date}</p>
      //       <p>Description: {forecast.description}</p>
      //     </div>
      //   );
      // });
    } catch (error) {
      setCityForecast("");
      setShowForecast(false);
      console.log(error.response.status);
    }
  }

  return (
    <main>
      <form>
        <input type="text" placeholder="Enter a city" onChange={handleChange} />
        <button onClick={getLocation}>Search Location</button>
      </form>
      {location && <p>Lat: {location.lat}</p>}
      {location && <p>Lon: {location.lon}</p>}
      {location && <img src={imgUrl} alt="img location" />}
      {showForecast && cityForecast}
    </main>
  );
}

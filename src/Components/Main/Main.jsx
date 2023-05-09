import React, { useEffect } from "react";
import "./Main.css";
import { useState } from "react";
import axios from "axios";

export default function Main() {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [imgUrl, setimgUrl] = useState("");

  function handleChange(event) {
    setSearchQuery(event.target.value);
  }
  async function getLocation(event) {
    event.preventDefault();

    try {
      const API = `https://eu1.locationiq.com/v1/search?key=${process.env.REACT_APP_API_KEY}&q=${searchQuery}&format=json`;
      const res = await axios.get(API);
      setLocation(res.data[0]);
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
    </main>
  );
}

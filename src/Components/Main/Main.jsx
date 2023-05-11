import React from "react";
import "./Main.css";
import { useState } from "react";
import axios from "axios";
import Weather from "./Weather";
import Movie from "./Movie";

export default function Main() {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [imgUrl, setimgUrl] = useState("");
  const [cityForecast, setCityForecast] = useState("");
  const [showForecast, setShowForecast] = useState(false);
  const [movieList, setMovieList] = useState("");
  const [showMovie, setShowMovie] = useState(false);

  function handleChange(event) {
    setSearchQuery(event.target.value);
  }
  async function getLocation(event) {
    event.preventDefault();

    try {
      //get city information on the api
      const API = `https://eu1.locationiq.com/v1/search?key=${process.env.REACT_APP_API_KEY}&q=${searchQuery}&format=json`;
      const res = await axios.get(API);
      let newLocation = res.data[0];
      setLocation(newLocation);
      getMap(newLocation);
      getWeather(newLocation);
      getMovie(newLocation);
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
  async function getMap(location) {
    //get the image
    const APIImg = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_API_KEY}&center=${location.lat},${location.lon}&zoom=11&size=400x400&format=png&markers=icon:small-red-cutout|${location.lat},${location.lon}`;
    setimgUrl(APIImg);
  }
  async function getWeather(location) {
    try {
      //get the weather
      //https://api-weather-lab.netlify.app/
      //http://localhost:8080/weather

      const APIWeather = `http://localhost:8080/weather?lat=${location.lat}&lon=${location.lon}&searchQuery=${searchQuery}`;
      const weatherRes = await axios.get(APIWeather);
      let forecastList = <Weather forecast={weatherRes.data} />;
      setCityForecast(forecastList);
      setShowForecast(true);
    } catch (error) {
      setCityForecast("");
      setShowForecast(false);
      console.log(error.response);
    }
  }
  async function getMovie(location) {
    try {
      //get the movie list
      const APIMovie = `http://localhost:8080/movies?searchQuery=${searchQuery}`;
      const movieRes = await axios.get(APIMovie);
      let movieList = <Movie movie={movieRes.data} />;
      console.log(movieList);
      setMovieList(movieList);
      setShowMovie(true);
    } catch (error) {
      setMovieList("");
      setShowMovie(false);
      console.log(error.response);
    }
  }

  return (
    <main>
      <div class="main-container">
        <form>
          <input type="text" placeholder="Enter a city" onChange={handleChange} />
          <button onClick={getLocation}>Search Location</button>
        </form>
        <div class="info">
          {location && (
            <article class="data">
              <div class="container">
                <div class="Title">
                  <h1>City information:</h1>
                </div>
                <div class="Name">
                  <p>City Name:</p>
                </div>
                <div class="Lat">
                  <p>Lat:</p>
                </div>
                <div class="Lon">
                  <p>Lon:</p>
                </div>
                <div class="Namedata">
                  <p>{location.display_name}</p>
                </div>
                <div class="Latdata">
                  <p>{location.lat}</p>
                </div>
                <div class="londata">
                  <p>{location.lon}</p>
                </div>
              </div>
            </article>
          )}
          {location && <article class="map">{location && <img id="map" src={imgUrl} alt="img location" />}</article>}
          {showForecast && <article class="weather"> {cityForecast}</article>}
          {showMovie && <article class="movie"> {movieList}</article>}
        </div>
      </div>
    </main>
  );
}

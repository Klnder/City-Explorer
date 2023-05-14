import React from "react";
import "./Main.css";
import { useState } from "react";
import axios from "axios";
import Weather from "./Weather/Weather";
import Movie from "./Movie/Movie";
import MovieModal from "./Movie/MovieModal";
import Restaurants from "./Restaurants/Restaurants";
import RestaurantModal from "./Restaurants/RestaurantModal";
import CityInformation from "./CityInformation/CityInformation";

export default function Main() {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [imgUrl, setimgUrl] = useState("");
  //city information
  const [cityInformation, setCityInformation] = useState("");
  const [showCityInformation, setShowCityInformation] = useState(false);
  //weather
  const [cityForecast, setCityForecast] = useState("");
  const [showForecast, setShowForecast] = useState(false);
  //movie
  const [movieList, setMovieList] = useState("");
  const [showMovie, setShowMovie] = useState(false);
  const [modalMovie, setModalMovie] = useState({});
  const [showModalMovie, setShowModalMovie] = useState(false);
  const [modalMovieImg, setModalMovieImg] = useState("");
  //restaurant
  const [restaurantList, setRestaurantList] = useState("");
  const [showRestaurant, setShowRestaurant] = useState(false);
  const [modalRestaurant, setModalRestaurant] = useState({});
  const [showModalRestaurant, setShowModalRestaurant] = useState(false);

  function handleChange(event) {
    setSearchQuery(event.target.value);
  }
  async function getLocation(event) {
    event.preventDefault();

    try {
      //get city information on the api
      const API = `https://eu1.locationiq.com/v1/search?key=${process.env.REACT_APP_API_KEY}&q=${searchQuery}&format=json`;
      const res = await axios.get(API);
      let locations = res.data.map((location) => {
        return {
          display_name: location.display_name,
          location_name: location.display_name.split(",")[0],
          lat: location.lat,
          lon: location.lon,
        };
      });
      let newLocation = locations[0];

      let cityElement = <CityInformation city={newLocation} />;
      setCityInformation(cityElement);
      setShowCityInformation(true);

      setLocation(newLocation);
      getMap(newLocation);
      getWeather(newLocation);
      getMovies(newLocation);
      getRestaurants(newLocation);
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
      const APIWeather = `${process.env.REACT_APP_SERVER_API_ADDRESS}/weather?searchQuery=${location.location_name}`;
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
  async function getMovies(location) {
    try {
      //get the movie list
      const APIMovie = `${process.env.REACT_APP_SERVER_API_ADDRESS}/movies?searchQuery=${location.location_name}`;
      const movieRes = await axios.get(APIMovie);
      let movieList = <Movie movie={movieRes.data} handleModal={handleModalMovie} />;
      setMovieList(movieList);
      setShowMovie(true);
    } catch (error) {
      setMovieList("");
      setShowMovie(false);
      console.log(error.response);
    }
  }
  async function getRestaurants(location) {
    try {
      //get the restaurant list
      const APIRestaurant = `${process.env.REACT_APP_SERVER_API_ADDRESS}/restaurants?searchQuery=${location.location_name}`;
      const restaurantRes = await axios.get(APIRestaurant);
      let restaurantList = <Restaurants restaurants={restaurantRes.data} handleModal={handleModalRestaurant} />;
      setRestaurantList(restaurantList);
      setShowRestaurant(true);
    } catch (error) {
      setRestaurantList("");
      setShowRestaurant(false);
      console.log(error.response);
    }
  }

  function handleModalRestaurant(restaurant) {
    setShowModalRestaurant(!showModalRestaurant);
    setModalRestaurant(restaurant);
  }
  function handleModalMovie(movie, srcMovie) {
    setShowModalMovie(!showModalMovie);
    setModalMovie(movie);
    setModalMovieImg(srcMovie);
  }

  return (
    <main>
      {showModalRestaurant && <RestaurantModal handleModal={handleModalRestaurant} restaurant={modalRestaurant} />}
      {showModalMovie && <MovieModal handleModal={handleModalMovie} movie={modalMovie} imgUrl={modalMovieImg} />}
      <div className="main-container">
        <form>
          <input type="text" placeholder="Enter a city" onChange={handleChange} />
          <button onClick={getLocation}>Search Location</button>
        </form>
        <div className="info">
          {showCityInformation && <article className="data">{cityInformation}</article>}
          {location && (
            <article className="map">
              <img id="map" src={imgUrl} alt="img location" />
            </article>
          )}
          {showForecast && <article className="weather">{cityForecast}</article>}
          {showMovie && (
            <article className="movie">
              <h1>Top movies:</h1>
              {movieList}
            </article>
          )}
          {showRestaurant && (
            <article className="restaurant">
              <h1>Top 20 restaurants: </h1>
              {restaurantList}
            </article>
          )}
        </div>
      </div>
    </main>
  );
}

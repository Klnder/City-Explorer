import React from "react";
import "./CityInformation.css";

export default function CityInformation({ city }) {
  return (
    <div className="container">
      <div className="title">
        <h1>City information:</h1>
      </div>
      <div className="name">
        <p>City Name:</p>
      </div>
      <div className="lat">
        <p>Lat:</p>
      </div>
      <div className="lon">
        <p>Lon:</p>
      </div>
      <div className="namedata">
        <p>{city.display_name}</p>
      </div>
      <div className="latdata">
        <p>{city.lat}</p>
      </div>
      <div className="londata">
        <p>{city.lon}</p>
      </div>
    </div>
  );
}

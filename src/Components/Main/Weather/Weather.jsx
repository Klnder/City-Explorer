import React from "react";
import "./Weather.css";
import DailyWeather from "./DailyWeather";

export default function Weather(props) {
  let tableForecast = props.forecast.map((data, index) => {
    return <DailyWeather data={data} key={index} />;
  });
  return (
    <table className="weather-container">
      <thead>
        <tr>
          <th>Date</th>
          <th>Forecast</th>
          <th>Min °C</th>
          <th>Max °C</th>
        </tr>
      </thead>
      <tbody>{tableForecast}</tbody>
    </table>
  );
}

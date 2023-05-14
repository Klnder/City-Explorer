import React from "react";
import DailyWeather from "./DailyWeather";

export default function Weather(props) {
  let tableForecast = props.forecast.map((data, index) => {
    return <DailyWeather data={data} key={index} />;
  });
  return (
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Forecast</th>
          <th>Min Temp C</th>
          <th>Max Temp C</th>
        </tr>
      </thead>
      <tbody>{tableForecast}</tbody>
    </table>
  );
}

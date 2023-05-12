import React from "react";

export default function Weather(props) {
  let tableForecast = props.forecast.map((data, index) => {
    return (
      <tr key={index}>
        <td>{data.date}</td>
        <td>
          <img src={data.icon} alt="icon weather" className="icon" />
        </td>
        <td>{data.description}</td>
        <td>{data.mintemp}</td>
        <td>{data.maxtemp}</td>
      </tr>
    );
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Icon</th>
          <th>Forecast</th>
          <th>Min Temp C</th>
          <th>Max Temp C</th>
        </tr>
      </thead>
      <tbody>{tableForecast}</tbody>
    </table>
  );
}

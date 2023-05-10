import React from "react";

export default function Weather(props) {
  let tableForecast = props.forecast.map((data) => {
    return (
      <tr>
        <td>{data.date}</td>
        <td>{data.description}</td>
      </tr>
    );
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Forecast</th>
        </tr>
      </thead>
      <tbody>{tableForecast}</tbody>
    </table>
  );
}

import React from "react";

export default function DailyWeather(props) {
  return (
    <tr>
      <td>{props.data.date}</td>
      <td>
        <img src={props.data.icon} alt="icon weather" className="icon-weather" title={props.data.description} />
      </td>
      <td>{props.data.mintemp}</td>
      <td>{props.data.maxtemp}</td>
    </tr>
  );
}

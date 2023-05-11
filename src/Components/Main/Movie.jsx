import React from "react";
import "./Movie.css";

export default function Movie(props) {
  let tableMovie = props.movie.map((movie) => {
    let srcMovie = `https://image.tmdb.org/t/p/original${movie.image_url}`;
    return (
      <tr>
        <td>{movie.title}</td>
        <td>{movie.overview}</td>
        <td>{movie.average_votes}</td>
        <td>{movie.total_votes}</td>
        <td>
          <img class="poster-img" src={srcMovie} alt="movie poster" />
        </td>
        <td>{movie.popularity}</td>
        <td>{movie.released_on}</td>
      </tr>
    );
  });
  return (
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Overview</th>
          <th>Average votes</th>
          <th>Total votes</th>
          <th>image url</th>
          <th>popularity</th>
          <th>released_on</th>
        </tr>
      </thead>
      <tbody>{tableMovie}</tbody>
    </table>
  );
}

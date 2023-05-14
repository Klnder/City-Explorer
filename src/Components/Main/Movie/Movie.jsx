import React from "react";
import "./Movie.css";
import MovieDetail from "./MovieDetail";

export default function Movie(props) {
  let tableMovie = props.movie.map((movie, index) => {
    return <MovieDetail movie={movie} key={index} handleModal={props.handleModal} />;
  });
  return (
    <table className="movie-container">
      <thead>
        <tr>
          <th>Title</th>
          <th>Image</th>
          <th>Details</th>
        </tr>
      </thead>
      <tbody>{tableMovie}</tbody>
    </table>
  );
}

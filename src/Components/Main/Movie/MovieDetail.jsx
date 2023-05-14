import React from "react";
import image from "../placeholderNoimg.png";

export default function MovieDetail(props) {
  let srcMovie;
  if (props.movie.image_url) {
    srcMovie = `https://image.tmdb.org/t/p/original${props.movie.image_url}`;
  } else {
    srcMovie = image;
  }

  return (
    <tr>
      <td>{props.movie.title}</td>
      <td>
        <img className="poster-img" src={srcMovie} alt="movie poster" />
      </td>
      <td>
        <button onClick={() => props.handleModal(props.movie, srcMovie)}>Click for more !</button>
      </td>
    </tr>
  );
}

import React from "react";
import "./MovieModal.css";

export default function MovieModal(props) {
  return (
    <div className="movie-modal" onClick={props.handleModal}>
      <div className="grid">
        <div className="Img">
          <img className="modal-img-movie" src={props.imgUrl} alt="movie" />
        </div>
        <div className="Details">
          <p>Title: {props.movie.title}</p>
          <p>Overview: {props.movie.overview}</p>
          <p>Average Votes: {props.movie.average_votes}</p>
          <p>Popularity: {props.movie.popularity}</p>
          <p>Released date: {props.movie.released_on}</p>
        </div>
      </div>
    </div>
  );
}

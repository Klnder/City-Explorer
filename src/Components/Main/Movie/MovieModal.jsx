import React from "react";
import "./MovieModal.css";

export default function MovieModal({ movie, handleModal, imgUrl }) {
  return (
    <div className="movie-modal" onClick={handleModal}>
      <div className="grid">
        <div className="Img">
          <img className="modal-img-movie" src={imgUrl} alt="movie" />
        </div>

        <div className="details">
          <div className="title-header">
            <p>Title:</p>
          </div>
          <div className="overview">
            <p>Overview:</p>
          </div>
          <div className="average-vote">
            <p>Average Votes:</p>
          </div>
          <div className="popularity">
            <p>Popularity:</p>
          </div>
          <div className="released-date">
            <p>Released date:</p>
          </div>
          <div className="title-data">
            <p>{movie.title}</p>
          </div>
          <div className="overview-data">
            <p>{movie.overview}</p>
          </div>
          <div className="average-vote-data">
            <p>{movie.average_votes}</p>
          </div>
          <div className="popularity-data">
            <p>{movie.popularity}</p>
          </div>
          <div className="released-date-data">
            <p>{movie.released_on}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

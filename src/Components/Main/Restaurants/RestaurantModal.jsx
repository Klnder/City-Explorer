import React from "react";
import "./RestaurantModal.css";

export default function RestaurantModal(props) {
  return (
    <div className="restaurant-modal" onClick={props.handleModal}>
      <div className="grid">
        <div className="Img">
          <img className="modal-img-restaurant" src={props.restaurant.image_url} alt="restaurant" />
        </div>
        <div className="Details">
          <p>Name: {props.restaurant.name}</p>
          <p>
            Link:{" "}
            <a target="_blank" rel="noreferrer" href={props.restaurant.url}>
              Yelp Details
            </a>
          </p>
          <p>Rating: {props.restaurant.rating}</p>
          <p>Price: {props.restaurant.price}</p>
          <p>Address: {props.restaurant.address}</p>
        </div>
      </div>
    </div>
  );
}

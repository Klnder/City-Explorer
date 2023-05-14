import React from "react";
import "./Restaurants.css";

export default function Restaurants(props) {
  let tableRestaurants = props.restaurants.map((restaurant) => {
    return (
      <tr key={restaurant.id}>
        <td>{restaurant.name}</td>
        <td>{restaurant.price}</td>
        <td>
          <img src={restaurant.image_url} alt="restaurant pic" />
        </td>
        <td>
          <button onClick={() => props.handleModal(restaurant)}>Click for more !</button>
        </td>
      </tr>
    );
  });
  return (
    <table className="restaurant-container">
      <thead>
        <tr>
          <th>name</th>
          <th>price</th>
          <th>Image</th>
          <th>Details</th>
        </tr>
      </thead>
      <tbody>{tableRestaurants}</tbody>
    </table>
  );
}

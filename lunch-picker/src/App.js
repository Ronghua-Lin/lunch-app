import React, { useState, useEffect } from "react";
import RestaurantForm from "./components/RestaurantForm";
import RestaurantList from "./components/RestaurantList";
import RandomizeButton from "./components/RandomizeButton";
import RestaurantVoting from "./components/RestaurantVoting";
import "./App.css";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

console.log("API_BASE_URL", API_BASE_URL);
const App = () => {
  const [restaurants, setRestaurants] = useState([]);

  // Fetch restaurants from the server
  useEffect(() => {
    fetch(`${API_BASE_URL}/restaurants`)
      .then((response) => response.json())
      .then((data) => setRestaurants(data));
  }, []);

  // Add a restaurant
  const addRestaurant = (restaurant) => {
    fetch(`${API_BASE_URL}/restaurants`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(restaurant),
    })
      .then((response) => response.json())
      .then((newRestaurant) =>
        setRestaurants((prev) => [...prev, newRestaurant])
      );
  };

  // Delete a restaurant
  const deleteRestaurant = (id) => {
    fetch(`${API_BASE_URL}/restaurants/${id}`, {
      method: "DELETE",
    }).then(() => setRestaurants((prev) => prev.filter((r) => r.id !== id)));
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Lunch Picker App</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          // alignItems: "center",
          gap: "10px",
        }}
      >
        <RandomizeButton restaurants={restaurants} />
        <p>or</p>
        <RestaurantVoting
          restaurants={restaurants}
          API_BASE_URL={API_BASE_URL}
        />
      </div>


      <RestaurantForm addRestaurant={addRestaurant} />
      <RestaurantList
        restaurants={restaurants}
        deleteRestaurant={deleteRestaurant}
      />
    </div>
  );
};

export default App;

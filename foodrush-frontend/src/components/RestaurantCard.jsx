function RestaurantCard({ restaurant }) {
  return (
    <div className="restaurant-card">
      <div className="restaurant-image">
        🍽️
      </div>

      <div className="restaurant-info">
        <h3>{restaurant.name}</h3>

        <p>{restaurant.cuisine.join(" • ")}</p>

        <span>⭐ {restaurant.rating}</span>
      </div>
    </div>
  );
}

export default RestaurantCard;

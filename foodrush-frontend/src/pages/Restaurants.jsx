import RestaurantCard from "../components/RestaurantCard";

function Restaurants() {
  const restaurants = [
    {
      name: "Spice Garden",
      cuisine: ["Indian", "North Indian"],
      rating: 4.5,
    },
    {
      name: "Pizza Hub",
      cuisine: ["Pizza", "Italian"],
      rating: 4.3,
    },
    {
      name: "Burger House",
      cuisine: ["Burger", "Fast Food"],
      rating: 4.6,
    },
  ];

  return (
    <main className="restaurants-page">
      <h1>Restaurants Near You 🍽️</h1>

      <div className="restaurant-list">
        {restaurants.map((restaurant, index) => (
          <RestaurantCard key={index} restaurant={restaurant} />
        ))}
      </div>
    </main>
  );
}

export default Restaurants;
import FoodCard from "../components/FoodCard";

function Foods() {
  const foods = [
    {
      name: "Paneer Butter Masala",
      description: "Creamy paneer cooked with rich Indian spices.",
      price: 220,
    },
    {
      name: "Margherita Pizza",
      description: "Classic pizza with tomato sauce and mozzarella.",
      price: 299,
    },
    {
      name: "Cheese Burger",
      description: "Juicy burger with cheese and fresh vegetables.",
      price: 199,
    },
    {
      name: "Veg Hakka Noodles",
      description: "Delicious noodles tossed with fresh vegetables.",
      price: 180,
    },
  ];

  return (
    <main className="foods-page">
      <h1>Popular Food 🍴</h1>

      <div className="food-list">
        {foods.map((food, index) => (
          <FoodCard key={index} food={food} />
        ))}
      </div>
    </main>
  );
}

export default Foods;
function FoodCard({ food }) {
  return (
    <div className="food-card">
      <div className="food-image">
        🍕
      </div>

      <div className="food-info">
        <h3>{food.name}</h3>

        <p>{food.description}</p>

        <div className="food-bottom">
          <span>₹{food.price}</span>
          <button>Add to Cart</button>
        </div>
      </div>
    </div>
  );
}

export default FoodCard;
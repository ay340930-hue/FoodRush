import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <h2>FoodRush 🍔</h2>

      <div>
        <Link to="/">Home</Link>
        <Link to="/restaurants">Restaurants</Link>
        <Link to="/orders">Orders</Link>
        <Link to="/cart">Cart 🛒</Link>
        <Link to="/login">Login</Link>
      </div>
    </nav>
  );
}

export default Navbar;
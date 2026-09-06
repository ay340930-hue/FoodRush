function Home() {
  return (
    <main className="home">
      <section className="hero-section">
        <div className="hero-content">
          <p className="hero-small">WELCOME TO FOODRUSH</p>

          <h1>
            Delicious Food,
            <br />
            Delivered Fast 🚀
          </h1>

          <p className="hero-text">
            Discover your favorite food from the best restaurants around you.
          </p>

          <button>Explore Food 🍕</button>
        </div>

        <div className="hero-image">
          <div className="food-circle">🍕</div>
        </div>
      </section>


<section className="categories">
  <h2>Explore Categories</h2>

  <div className="category-list">
    <div className="category-card">
      <span>🍕</span>
      <p>Pizza</p>
    </div>

    <div className="category-card">
      <span>🍔</span>
      <p>Burger</p>
    </div>

    <div className="category-card">
      <span>🍛</span>
      <p>Indian</p>
    </div>

    <div className="category-card">
      <span>🍜</span>
      <p>Chinese</p>
    </div>

    <div className="category-card">
      <span>🍰</span>
      <p>Dessert</p>
    </div>

    <div className="category-card">
      <span>🥤</span>
      <p>Drinks</p>
    </div>
  </div>
</section>


    </main>
  );
}

export default Home;
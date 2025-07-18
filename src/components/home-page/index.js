import { HomeCategoriesList } from "./home-categories-list";
import { NewsProducts } from "./news-products";
import "./homePage.css";
import { useDispatch } from "react-redux";
import socketIo from "../../services/socket";
import { useEffect } from "react";
import { addCategoryAction, removeCategoryAction, updateCategoryAction } from "../../redux/slicers/categories-slicer";

export const Dashboard = () => {
  const dispatch = useDispatch();
  const socket = socketIo.socket;

  useEffect(() => {
    const onAdminAddCategory = (category) => {
      dispatch(addCategoryAction(category));
    };

    const onAdminUpdateCategory = (updatedCategory) => {
      dispatch(updateCategoryAction(updatedCategory));
    };

    const onAdminRemoveCategory = (category_id) => {
      dispatch(removeCategoryAction(category_id));
    };

    socket.on('admin-add-category', onAdminAddCategory);
    socket.on('admin-remove-category', onAdminRemoveCategory);
    socket.on('admin-update-category', onAdminUpdateCategory);

    return () => {
      socket.off('admin-add-category', onAdminAddCategory);
      socket.off('admin-remove-category', onAdminRemoveCategory);
      socket.off('admin-update-category', onAdminUpdateCategory);
    }
  }, []);

  return (
    <div className="home-main-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Welcome to E.A Store</h1>
          <p className="hero-subtitle">Discover amazing products at unbeatable prices</p>
          <a href="#categories" className="hero-cta">
            Shop Now
          </a>
        </div>
      </section>

      <div className="home-inner-container">
        {/* Categories Section */}
        <section id="categories" className="home-section categories-section">
          <div className="section-header">
            <h2 className="section-title">Shop by Category</h2>
            <p className="section-subtitle">Browse our wide range of product categories</p>
          </div>
          <HomeCategoriesList />
        </section>

        {/* Featured Products Section */}
        <section className="home-section featured-products-section">
          <div className="section-header">
            <h2 className="section-title">Featured Products</h2>
            <p className="section-subtitle">Check out our latest and most popular items</p>
          </div>
          <NewsProducts />
        </section>

        {/* Stats Section */}
        <section className="stats-section">
          <div className="stats-container">
            <div className="stat-item">
              <h3 className="stat-number">10K+</h3>
              <p className="stat-label">Happy Customers</p>
            </div>
            <div className="stat-item">
              <h3 className="stat-number">500+</h3>
              <p className="stat-label">Products</p>
            </div>
            <div className="stat-item">
              <h3 className="stat-number">24/7</h3>
              <p className="stat-label">Support</p>
            </div>
            <div className="stat-item">
              <h3 className="stat-number">99%</h3>
              <p className="stat-label">Satisfaction</p>
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="newsletter-section">
          <div className="section-header">
            <h2 className="section-title">Stay Updated</h2>
            <p className="section-subtitle">Subscribe to our newsletter for exclusive offers and updates</p>
          </div>
          <form className="newsletter-form">
            <input
              type="email"
              placeholder="Enter your email"
              className="newsletter-input"
            />
            <button type="submit" className="newsletter-button">
              Subscribe
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};
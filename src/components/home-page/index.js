import { HomeCategoriesList } from "./home-categories-list";
import "./homePage.css";
import { NewsProducts } from "./news-products";

export const Dashboard = () => (
  <div className="home-main-container">
    <div className="home-inner-container">

      <div className="categories mt-30">
        <HomeCategoriesList />
      </div>

      <div className="news-products mt-50">
        <NewsProducts />
      </div>
    </div>
  </div>
);
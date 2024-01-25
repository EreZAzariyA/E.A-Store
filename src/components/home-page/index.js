import { HomeCategoriesList } from "./home-categories-list";
import "./dashboard.css";

export const Dashboard = () => (
  <div className="home-main-container">
    <div className="home-inner-container">
      <div className="categories-container mt-20">
        <HomeCategoriesList />
      </div>
    </div>
  </div>
);
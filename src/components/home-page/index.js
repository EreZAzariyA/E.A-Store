import { HomeCategoriesList } from "./home-categories-list";
import "./homePage.css";

export const Dashboard = () => (
  <div className="home-main-container">
    <div className="home-inner-container">
      <div className="categories-container mt-30">
        <HomeCategoriesList />
      </div>
    </div>
  </div>
);
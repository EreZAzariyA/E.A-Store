import { CategoriesList } from "./categoriesList";
import "./dashboard.css";

export const Dashboard = () => {

  return (
    <div className="home-main-container">
      <div className="home-inner-container">
        <div className="sub-categories-container mt-20">
          <CategoriesList />
        </div>
      </div>
    </div>
  );
};
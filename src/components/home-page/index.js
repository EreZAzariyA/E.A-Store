import { useEffect, useState } from "react";
import { productsServices } from "../../services/productsServices";
import { useNavigate } from "react-router-dom";
// import { SubCategoryList } from "./subCategory-list";
import "./dashboard.css";
import { CategoriesList } from "./categoriesList";

export const Dashboard = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const categories = await productsServices.fetchAllCategories();
      setCategories(categories);
    };
    fetchCategories();
  }, []);

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
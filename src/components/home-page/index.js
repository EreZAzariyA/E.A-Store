import { useEffect, useState } from "react";
import { productsServices } from "../../services/productsServices";
import { Menu } from "antd";
import { useNavigate } from "react-router-dom";
import { SubCategoryList } from "./subCategory-list";
import "./dashboard.css";

export const Dashboard = () => {
  const navigate = useNavigate();
  const [subCategories, setSubCategories] = useState([]);

  useEffect(() => {
    const fetchSubCategories = async () => {
      const subCategories = await productsServices.fetchAllSubCategories();
      setSubCategories(subCategories);
    };
    fetchSubCategories();
  }, []);

  return (
    <div className="home-main-container">
      <div className="home-inner-container">
        <Menu
          mode="horizontal"
          style={{background: 'transparent'}}
          items={subCategories?.map((subCategory) => {
            return {
              key: subCategory._id,
              label: subCategory.subCategory,
              onClick: () => navigate(`/categories/${subCategory.category_id}/sub-category/${subCategory._id}`)
            };
          })}
        />

        <div className="sub-categories-container mt-20">
          <SubCategoryList />
        </div>

      </div>
    </div>
  );
};
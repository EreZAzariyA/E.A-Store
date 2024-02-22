import { useSelector } from "react-redux";
import { CategoryCard } from "../../components/cards/category-card";
import "./HomeCategoriesList.css";
import { useEffect, useState } from "react";
import { storeServices } from "../../../services/store-services";
import { Spin } from "antd";

export const HomeCategoriesList = () => {
  const categories = useSelector((state) => (state.categories));
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    storeServices.fetchAllCategories().then((res) => {
      if (res) {
        setIsLoading(false);
      }
    })
  }, []);

  if (!isLoading) {
    return (
      <div className="categories-list">
        {categories.map((category) => (
          <div key={category?._id}>
            <CategoryCard category={category} />
          </div>
        ))}
      </div>
    );
  } return <Spin />
};
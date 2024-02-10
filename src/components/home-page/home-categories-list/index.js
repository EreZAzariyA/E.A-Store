import { Col, Row } from "antd";
import { useSelector } from "react-redux";
import { CategoryCard } from "../../components/cards/category-card";
import "./HomeCategoriesList.css";

export const HomeCategoriesList = () => {
  const categories = useSelector((state) => (state.categories));

  return (
    <div className="categories-list">
      {categories?.map((category) => (
        <div key={category?._id}>
          <CategoryCard category={category} />
        </div>
      ))}
    </div>
  );
};
import { useNavigate } from "react-router-dom";
import "./categoryCard.css";

export const CategoryCard = (props) => {
  const { category } = props;
  const navigate = useNavigate();

  return (
    <div className="category-card" onClick={() => navigate(`/category/${category._id}`)}>
      <div className="category-img">
        <img src={category.image_url} alt={`${category.category}-img`} />
      </div>
      <div className="background"></div>
      <div className="category-name">
        <span>{category.category}</span>
      </div>
    </div>
  );
};

import { useNavigate } from "react-router-dom";
import "./subCategoryCard.css";

export const SubCategoryCard = (props) => {
  const { subCategory } = props;
  const navigate = useNavigate();

  return (
    <div
      className="sub-category-card"
      onClick={() => navigate(`sub-category/${subCategory._id}`)}
    >
      <div className="sub-category-img">
        <img src={subCategory.image_url} alt={`${subCategory.subCategory}-img`} />
      </div>

      <div className="sub-category-name mt-5">
        <span>{subCategory.subCategory}</span>
      </div>
    </div>
  );
};
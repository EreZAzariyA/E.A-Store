import { useNavigate } from "react-router-dom";
import "./unifiedCard.css";

export const UnifiedCard = (props) => {
  const { item, type, onClick } = props;
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (type === "category") {
      navigate(`/category/${item._id}`);
    } else if (type === "sub-category") {
      navigate(`sub-category/${item._id}`);
    }
  };

  const getItemName = () => {
    if (type === "category") {
      return item.category;
    } else if (type === "sub-category") {
      return item.subCategory;
    }
    return item.name || "";
  };

  const getItemImage = () => {
    return item.image_url || "";
  };

  return (
    <div className="unified-card" onClick={handleClick}>
      <div className="unified-card-img">
        <img src={getItemImage()} alt={`${getItemName()}-img`} />
      </div>
      <div className="unified-card-name">
        <span>{getItemName()}</span>
      </div>
    </div>
  );
};
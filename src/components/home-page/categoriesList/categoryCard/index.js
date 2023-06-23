import { Card } from "antd";
import { useNavigate } from "react-router-dom";
import "./categoryCard.css";

export const CategoryCard = (props) => {
  const { category } = props;
  const navigate = useNavigate();

  return (
    <Card
      onClick={() => navigate(`/categories/${category._id}`)}
      hoverable
      style={{
        width: 240,
        borderRadius: '50%'
      }}
    >
      <img alt="example" style={{width: '150px',height: '120px', objectFit: 'contain'}} src={category?.image_url} />
      <Card.Meta description={category.category}/>
    </Card>
  );
};
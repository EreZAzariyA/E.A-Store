import { Card } from "antd";
import { useNavigate } from "react-router-dom";


export const CategoryCard = ({category}) => {
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
      <img alt="example" style={{width: '150px', height: '120px', objectFit: 'contain'}} src={category?.image_url} />
      <Card.Meta description={category.category}/>
    </Card>
  );
};
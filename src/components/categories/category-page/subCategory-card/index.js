import { useNavigate } from "react-router-dom";
import { Card } from "antd";
import "./subCategoryCard.css";

export const SubCategoryCard = (props) => {
  const { subCategory } = props;
  const navigate = useNavigate();

  return (
    <Card
      onClick={() => navigate(`sub-category/${subCategory._id}`)}
      hoverable
      style={{
        width: 240,
        borderRadius: '50%'
      }}
    >
      <img alt="example" style={{width: '150px', height: '120px', objectFit: 'contain'}} src={subCategory?.image_url} />
      <Card.Meta description={subCategory.subCategory}/>
    </Card>
  );
};
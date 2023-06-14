import { Card } from "antd";
import { useEffect } from "react";


export const SubCategoryCard = (props) => {
  const { subcategory } = props;

  return (
    <Card
      hoverable
      style={{
        width: 240,
      }}
      cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
    
    >
      <Card.Meta title="Europe Street beat" description="www.instagram.com" />
    </Card>
  );
};
import { Card } from "antd";
import { useEffect } from "react";


export const ProductCard = (props) => {
  const { product } = props;

  return (
    <Card
      hoverable
      style={{
        width: 240,
        borderRadius: '50%'
      }}
      cover={<img style={{height: '150px'}} alt={`${product?.name}-img`} src={'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'} />}
    >
      {/* <Card.Meta title="Europe Street beat" description="www.instagram.com" /> */}
    </Card>
  );
};
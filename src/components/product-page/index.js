// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { useSelector } from "react-redux";
import { Col, Row } from "antd";
import "./productPage.css";

export const ProductPage = () => {
  // const { product_id } = useParams();
  // const products = useSelector((state) => state.products);
  // const [product, setProduct] = useState(null);

  // useEffect(() => {
  //   const product = [...products].find((pro) => pro._id === product_id);
  //   setProduct(product);
  // }, [product_id, products]);

  return (
    <div className="product-page-container">
      <Row>
        <Col span={12}>a</Col>
        <Col span={12}>b</Col>
      </Row>
    </div>
  );
};
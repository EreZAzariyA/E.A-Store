import { useSelector } from "react-redux";
import { CategoryCard } from "./category-card";
import "./categories.css";
import { Col, Row } from "antd";

export const CategoriesPage = () => {
  const categories = useSelector((state) => state?.categories);

  return (
    <div className="categories-container">
      <div className="list mt-20">
        <Row align={"stretch"} justify={'space-evenly'} gutter={[0, 15]}>
          {categories.map((category) => (
            <Col key={category._id}>
              <CategoryCard category={category} />
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};
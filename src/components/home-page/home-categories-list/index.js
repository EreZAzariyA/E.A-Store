import { Col, Row } from "antd";
import { useSelector } from "react-redux";
import { CategoryCard } from "../../components/cards/category-card";

export const HomeCategoriesList = () => {
  const categories = useSelector((state) => (state.categories));

  return (
    <div className="categories-list-main-container">
      <div className="categories-list-inner-container">
        <div className="categories-list">
          <Row align={"stretch"} justify={'space-evenly'} gutter={[35, 80]}>
            {categories?.map((category) => (
              <Col key={category?._id}>
                <CategoryCard category={category} />
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </div>
  );
};
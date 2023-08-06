import { Col, Row } from "antd";
import { useSelector } from "react-redux";
import { CategoryCard } from "./categoryCard";

export const CategoriesList = () => {
  const categories = useSelector((state) => (state.categories));
  console.log(categories);

  return (
    <div className="subCategories-list-main-container">
      <div className="subCategories-list-inner-container">
        <div className="subCategories-list">

          <Row align={"stretch"} justify={'space-evenly'} gutter={[0, 15]}>
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
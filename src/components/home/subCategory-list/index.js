import { ProductCard } from "../../productCard";
import { Col, Row } from "antd";
import { useSelector } from "react-redux";

export const SubCategoryList = () => {
  const subCategories = useSelector((state) => (state.categoriesReducer?.subCategories));

  return (
    <div className="subCategories-list-main-container">
      <div className="subCategories-list-inner-container">
        <div className="subCategories-list">
          
          <Row align={"stretch"} justify={'space-evenly'} gutter={[0, 15]}>
            {subCategories?.map((subCategory) => (
              <Col key={subCategory?._id}>
                <ProductCard subCategory={subCategory} />
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </div>
  );
};
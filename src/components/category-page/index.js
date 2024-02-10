import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Col, Row } from "antd";
import { useSelector } from "react-redux";
import { SubCategoryCard } from "../components/cards/sub-category-card";

export const CategoryPage = () => {
  const { category_id } = useParams();
  const categories = useSelector((state) => state.categories);
  const allSubCategories = useSelector((state) => state.subCategories);
  const [subCategories, setSubCategories] = useState([]);

  useEffect(() => {
    if (category_id) {
      const category = categories.find((c) => c._id === category_id);
      if (category && category?.subCategories) {
        const newSubCategoriesList = [];
        for (const subCategoryId of category.subCategories) {
          const fullSubCategory = allSubCategories.find((subC) => subC._id === subCategoryId);
          if (fullSubCategory && fullSubCategory._id) {
            newSubCategoriesList.push(fullSubCategory);
          }
        }
        setSubCategories(newSubCategoriesList);
      }
    }
  }, [allSubCategories, categories, category_id]);

  return (
    <div className="subCategories-list-main-container mt-10">
      <div className="subCategories-list-inner-container">
        <div className="subCategories-list">
          <Row align={"stretch"} justify={'space-evenly'} gutter={[15, 35]}>
            {subCategories.map((subCategory) => (
              <Col key={subCategory?._id}>
                <SubCategoryCard subCategory={subCategory} />
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </div>
  );
};

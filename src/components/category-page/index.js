import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Col, Row } from "antd";
import { useSelector } from "react-redux";
import { SubCategoryCard } from "../components/cards/sub-category-card";
import "./categoryPage.css";

export const CategoryPage = () => {
  const { category_id } = useParams();
  const categories = useSelector((state) => state.categories);
  const allSubCategories = useSelector((state) => state.subCategories);
  const [subCategories, setSubCategories] = useState([]);
  const [currentCategory, setCurrentCategory] = useState(null);

  useEffect(() => {
    if (category_id) {
      const category = categories.find((c) => c._id === category_id);
      setCurrentCategory(category);

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
    <div className="category-page-main-container">
      {/* Hero Section */}
      <section className="category-hero-section">
        <div className="category-hero-content">
          <h1 className="category-hero-title">
            {currentCategory?.name || "Category"}
          </h1>
          <p className="category-hero-subtitle">
            Explore our {currentCategory?.name?.toLowerCase()} collection
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="category-content-section">
        <div className="category-section-header">
          <h2 className="category-section-title">Sub-Categories</h2>
          <p className="category-section-subtitle">
            Browse through our {currentCategory?.name?.toLowerCase()} sub-categories
          </p>
        </div>

        <div className="subCategories-list-main-container">
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

        {/* Stats Section */}
        <div className="category-stats-section">
          <div className="category-stats-container">
            <div className="category-stat-item">
              <div className="category-stat-number">{subCategories.length}</div>
              <div className="category-stat-label">Sub-Categories</div>
            </div>
            <div className="category-stat-item">
              <div className="category-stat-number">100+</div>
              <div className="category-stat-label">Products</div>
            </div>
            <div className="category-stat-item">
              <div className="category-stat-number">24/7</div>
              <div className="category-stat-label">Support</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

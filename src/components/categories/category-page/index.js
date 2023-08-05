import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Col, Menu, Row } from "antd";
import { useSelector } from "react-redux";
import { SubCategoryCard } from "./subCategory-card";

export const CategoryPage = () => {
  const { category_id } = useParams();
  const categories = useSelector((state) => state.categories);
  const allSubCategories = useSelector((state) => state.subCategories);
  const [subCategories, setSubCategories] = useState([]);
  const [current, setCurrent] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

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

  useEffect(() => {
    let locationArray =  location.pathname.split('/');
    let result = locationArray[3] + '/' + locationArray[4];
    setCurrent(result);
  }, [location.pathname]);

  return (
    <>
     <Menu
        mode="horizontal"
        style={{background: 'transparent'}}
        selectedKeys={[current]}
        items={subCategories.map((subCategory) => {
          return {
            key: 'sub-category/' + subCategory._id,
            label: subCategory.subCategory,
            onClick: () => navigate(`sub-category/${subCategory._id}`)
          };
        })}
      />
      <div className="subCategories-list-main-container mt-10">
        <div className="subCategories-list-inner-container">
          <div className="subCategories-list">
            <Row align={"stretch"} justify={'space-evenly'} gutter={[0, 15]}>
              {subCategories?.map((subCategory) => (
                <Col key={subCategory?._id}>
                  <SubCategoryCard subCategory={subCategory} />
                </Col>
              ))}
            </Row>
          </div>
        </div>
      </div>
    </>
  );
};

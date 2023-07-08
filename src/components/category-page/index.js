import { useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate, useParams } from "react-router-dom";
import { SubCategoryPage } from "../subCategoryPage";
import { SubCategoryList } from "./subCategories-list";
import { Menu } from "antd";
import { useSelector } from "react-redux";

export const CategoryPage = () => {
  const { category_id } = useParams();
  const stateSubCategories = useSelector((state) => state.subCategories);
  const subCategories = [...stateSubCategories].filter((subC) => subC.category_id === category_id);
  const [current, setCurrent] = useState('');
  const navigate = useNavigate();
  const location = useLocation();


  useEffect(() => {
    let locationArray =  location.pathname.split('/');
    let result = locationArray[3]+'/'+locationArray[4];
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

      <Routes>
        <Route path="/" element={<SubCategoryList category_id={category_id} />} />
        <Route path="/sub-category/:subCategoryId" element={<SubCategoryPage />} />
      </Routes>
    </>
  );
};

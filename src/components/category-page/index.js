import { useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate, useParams } from "react-router-dom";
import { categoriesServices } from "../../services/categoriesServices";
import { SubCategoryPage } from "../subCategoryPage";
import { SubCategoryList } from "./subCategories-list";
import { Menu, Spin, message } from "antd";
import { useSelector } from "react-redux";

export const CategoryPage = () => {
  const { category_id } = useParams();
  const stateSubCategories = useSelector((state) => state.subCategories);
  const subCategories = [...stateSubCategories].filter((subC) => subC.category_id === category_id);
  const [ isLoading, setIsLoading ] = useState(true);
  const [current, setCurrent] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  // const fetchSubCategoriesByCategoryId = async (category_id) => {
  //   try {
  //     const subCategories = await categoriesServices.fetchSubCategoriesByCategoryId(category_id);
  //     setSubCategories(subCategories);
  //   } catch (err) {
  //     message.error(err.message)
  //   }
  // };

  useEffect(() => {
    // fetchSubCategoriesByCategoryId(category_id);
    setIsLoading(false);
  }, [category_id]);

  useEffect(() => {
    let locationArray =  location.pathname.split('/');
    let result = locationArray[3]+'/'+locationArray[4];
    setCurrent(result);
  }, [location.pathname]);

  if (!isLoading) {
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
  } return <Spin />
};

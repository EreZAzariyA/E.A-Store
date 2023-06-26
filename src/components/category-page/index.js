import { useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate, useParams } from "react-router-dom";
import { productsServices } from "../../services/productsServices";
import { Menu, Spin, message } from "antd";
import { SubCategoryPage } from "../subCategoryPage";

export const CategoryPage = () => {
  const { category_id } = useParams();
  const [ subCategories, setSubCategories ] = useState([]);
  const [ isLoading, setIsLoading ] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const [current, setCurrent] = useState('');

  
  useEffect(() => {
    const fetchSubCategoriesByCategoryId = async (category_id) => {
      try {
        const subCategories = await productsServices.fetchSubCategoriesByCategoryId(category_id);
        setSubCategories(subCategories);
      } catch (err) {
        message.error(err.message)
      }
    };
    fetchSubCategoriesByCategoryId(category_id);
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
          items={subCategories?.map((subCategory) => {
            return {
              key: 'sub-category/' + subCategory._id,
              label: subCategory.subCategory,
              onClick: () => navigate(`sub-category/${subCategory._id}`)
            };
          })}
        />
        <Routes>
          <Route path="/sub-category/:subCategoryId" element={<SubCategoryPage />} />
        </Routes>
      </>
    );
  } return <Spin />
};

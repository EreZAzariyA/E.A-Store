import { useEffect, useState } from "react";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import { productsServices } from "../../services/productsServices";
import { Menu, Spin } from "antd";
import { SubCategoryPage } from "../subCategoryPage";

export const CategoryPage = () => {
  const { category_id } = useParams();
  const [ subCategories, setSubCategories ] = useState([]);
  const [ isLoading, setIsLoading ] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    productsServices.fetchSubCategoriesByCategoryId(category_id).then((subCategories) => {
      const mappedSucCategories = subCategories.map((subCategory) => {
        return {
          key: subCategory._id,
          label: subCategory.subCategory,
          onClick: () => navigate(`/categories/${subCategory.category_id}/sub-category/${subCategory._id}`)
        };
      });
      setSubCategories(mappedSucCategories);
    });
    setIsLoading(false);
  }, [category_id]);

  if (!isLoading) {
    return (
      <>
        <Menu
          mode="horizontal"
          style={{background: 'transparent'}}
          items={subCategories}
        />
        <Routes>
          <Route path="/sub-category/:subCategoryId" element={<SubCategoryPage />} />
        </Routes>
      </>
    );
  } return <Spin />
};

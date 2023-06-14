import { useEffect, useState } from "react";
import { productsServices } from "../../services/productsServices";
import { Menu } from "antd";
import { useNavigate } from "react-router-dom";
import { SubCategoryList } from "./subCategory-list";
import { useDispatch } from "react-redux";
import { CategoriesActions } from "../../redux/actions";

export const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [subCategories, setSubCategories] = useState([]);

  useEffect(() => {
    productsServices.fetchAllSubCategories().then((subCategories) => {
      dispatch(CategoriesActions.fetchSubCategories(subCategories))
      const mappedSubCategories = subCategories.map((subCategory) => {
        return {
          key: subCategory._id,
          label: subCategory.subCategory,
          onClick: () => navigate(`/categories/${subCategory.category_id}/sub-category/${subCategory._id}`)
        };
      });
      setSubCategories(mappedSubCategories);
    });
  }, []);


  return (
    <div className="home-main-container">
      <Menu
        mode="horizontal"
        style={{background: 'transparent'}}
        items={subCategories}
      />

      <div className="list">
        <SubCategoryList />
      </div>
    </div>
  );
};
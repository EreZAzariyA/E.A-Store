import { HomeCategoriesList } from "./home-categories-list";
import { NewsProducts } from "./news-products";
import "./homePage.css";
import { useDispatch } from "react-redux";
import socketIo from "../../services/socket";
import { useEffect } from "react";
import { addCategoryAction, removeCategoryAction, updateCategoryAction } from "../../redux/slicers/categories-slicer";

export const Dashboard = () => {
  const dispatch = useDispatch();
  const socket = socketIo.socket;

  useEffect(() => {
    const onAdminAddCategory = (category) => {
      dispatch(addCategoryAction(category));
    };

    const onAdminUpdateCategory = (updatedCategory) => {
      dispatch(updateCategoryAction(updatedCategory));
    };

    const onAdminRemoveCategory = (category_id) => {
      dispatch(removeCategoryAction(category_id));
    };

    socket.on('admin-add-category', onAdminAddCategory);
    socket.on('admin-remove-category', onAdminRemoveCategory);
    socket.on('admin-update-category', onAdminUpdateCategory);

    return () => {
      socket.off('admin-add-category', onAdminAddCategory);
      socket.off('admin-remove-category', onAdminRemoveCategory);
      socket.off('admin-update-category', onAdminUpdateCategory);
    }
  }, []);

  return (
    <div className="home-main-container">
      <div className="home-inner-container">
        <div className="categories mt-30">
          <HomeCategoriesList />
        </div>
        <div className="news-products mt-50">
          <NewsProducts />
        </div>
      </div>
    </div>
  );
};
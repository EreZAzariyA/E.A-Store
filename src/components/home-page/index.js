import { HomeCategoriesList } from "./home-categories-list";
import { NewsProducts } from "./news-products";
import "./homePage.css";
import { useDispatch } from "react-redux";
import socketIo from "../../services/socket";
import { useEffect } from "react";
import { addCategoryAction } from "../../redux/slicers/categories-slicer";
import { notification } from "antd";


export const Dashboard = () => {
  const dispatch = useDispatch();
  const socket = socketIo.socket;

  useEffect(() => {
    const onAdminAddCategory = (category) => {
      dispatch(addCategoryAction(category));
      notification.info({
        message: `Admin added new category "${category.category}"`
      });
    };
    socket.on('admin-add-category', onAdminAddCategory);

    return () => {
      socket.off('admin-add-category', onAdminAddCategory);
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
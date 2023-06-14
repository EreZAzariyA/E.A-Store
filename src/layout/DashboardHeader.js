import { Layout, Menu, Spin } from "antd";
import { useEffect, useState } from "react";
import { productsServices } from "../services/productsServices";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CategoriesActions } from "../redux/actions";

const { Header } = Layout;

export const DashboardHeader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [ isLoading, setIsLoading ] = useState(true);
  const [ categories, setCategories ] = useState([]);

  useEffect(() => {
    productsServices.fetchAllCategories().then((categories) => {
      dispatch(CategoriesActions.fetchCategories(categories));
      const mappedCategories = categories.map((category) => {
        return {
          key: category._id,
          label: category.category,
          onClick: () => navigate(`/categories/${category._id}`)
        };
      });
      setCategories(mappedCategories);
    });
    setIsLoading(false);
  }, [categories]);

  if (!isLoading) {
    return (
      <Header>
        <Menu
          mode="horizontal"
          style={{background: 'transparent'}}
          items={[{label: 'Home', key: 'home', onClick: () => navigate('/')}].concat(categories)}
        />
      </Header>
    );
  } return <Spin />
}
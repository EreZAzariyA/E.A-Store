import { Layout, Menu, Spin } from "antd";
import { useEffect, useState } from "react";
import { productsServices } from "../services/productsServices";

const { Header } = Layout;

export const DashboardHeader = () => {
  const [ isReady, setIsReady ] = useState(false);
  const [ categories, setCategories ] = useState([]);

  useEffect(() => {
    productsServices.fetchAllCategories().then((categories) => {
      const mappedCategories = categories.map((category) => {
        return {
          key: category._id,
          label: category.category,
        };
      });
      setCategories(mappedCategories);
    });
    setIsReady(true);
  }, []);

  if (isReady) {
    return (
      <Header>
        <Menu
          style={{background: 'transparent'}}
          mode="horizontal"
          items={categories}
        />
      </Header>
    );
  } return <Spin />
}
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { productsServices } from "../../services/productsServices";
import { authServices } from "../../services/auth-services";
import { Layout, Menu, Spin } from "antd";
import  UserOutlined  from "@ant-design/icons/UserOutlined";

const { Header } = Layout;

export const DashboardHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [ isLoading, setIsLoading ] = useState(true);
  const [ categories, setCategories ] = useState([]);
  const [current, setCurrent] = useState('/home');
  
  useEffect(() => {
    const fetchCategories = async () => {
      const categories = await productsServices.fetchAllCategories();
      setCategories(categories);
    };

    fetchCategories();
    setIsLoading(false);
  }, []);

  useEffect(() => {
    setCurrent(location.pathname);
  }, [location.pathname]);

  const defaultItems = [
    {
      label: 'Home',
      key: '/home',
      onClick: () => navigate('/home')
    },
  ];

  const mappedCategories = categories.map((category) => {
    return {
      key: '/categories/'+category._id,
      label: category.category,
      onClick: () => navigate(`/categories/${category._id}`)
    };
  });

  const authOptions = [
    {
      type: 'Grope',
      label: 'Account',
      icon: <UserOutlined />,
      children: [
        {
          label: 'Logout',
          key: '/logout',
          onClick: () => authServices.logout()
        }
      ]
    }
  ];

  if (!isLoading) {
    return (
      <Header>
        <Menu
          mode="horizontal"
          style={{background: 'transparent', width: '100%'}}
          items={defaultItems.concat(mappedCategories).concat(authOptions)}
          selectedKeys={[current]}
        />
      </Header>
    );
  } return <Spin />
}
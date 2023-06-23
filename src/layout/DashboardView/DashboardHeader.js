import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { productsServices } from "../../services/productsServices";
import { authServices } from "../../services/auth-services";
import { Col, Input, Layout, Menu, Row, Spin } from "antd";
import  UserOutlined  from "@ant-design/icons/UserOutlined";

const { Header } = Layout;

export const DashboardHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [ isLoading, setIsLoading ] = useState(true);
  const [ categories, setCategories ] = useState([]);
  const [ current, setCurrent ] = useState('/');

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
      key: '/',
      onClick: () => navigate('/')
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
        <Row>
          <Col span={24}>
            <p>We guarantee the lowest price in your city of residence for equal delivery and payment terms</p>
          </Col>
        </Row>

        <Row>
          <Col span={6} className="promotions">

          </Col>
          
          <Col span={12} className="search">
            <Input />
          </Col>
        
          <Col span={6} className="personal"></Col>
        
        </Row>


        {/* <Menu
          mode="horizontal"
          style={{background: 'transparent', width: '100%'}}
          items={defaultItems.concat(mappedCategories).concat(authOptions)}
          selectedKeys={[current]}
        /> */}
      </Header>
    );
  } return <Spin />
}
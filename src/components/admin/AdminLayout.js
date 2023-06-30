import { Button, Layout, Menu, message } from "antd";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { productsServices } from "../../services/productsServices";
import { categoriesServices } from "../../services/categoriesServices";
import { authServices } from "../../services/auth-services";
import AppstoreOutlined from "@ant-design/icons/AppstoreOutlined";
import OrderedListOutlined from "@ant-design/icons/OrderedListOutlined";
import HddOutlined from "@ant-design/icons/HddOutlined";
import LogoutOutlined from "@ant-design/icons/LogoutOutlined";
import UploadOutlined from "@ant-design/icons/UploadOutlined";

const { Content, Sider, Header } = Layout;

export const AdminLayout = () => {
  const { pathname } = useLocation();
  const [current,setCurrent] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        await productsServices.fetchAllProducts();
        await categoriesServices.fetchAllCategories();
        await categoriesServices.fetchAllSubCategories();
      } catch (err) {
        message.error(err.message);
      }
    };
    fetchAllData();
  }, []);

  useEffect(() => {
    const locationArray = pathname.split('/');
    setCurrent(locationArray[2]);
  }, [pathname]);

  const menu = () => {
    const items = [
      {
        label: 'Dashboard',
        key: 'dashboard',
        icon: <AppstoreOutlined />
      },
      {
        label: 'All-Products',
        key: 'all-products',
        icon: <OrderedListOutlined />
      },
      {
        label: 'All-Categories',
        key: 'all-categories',
        icon: <HddOutlined />
      },
      {
        label: 'Insert Doc',
        key: 'insert-doc',
        icon: <UploadOutlined />
      },
      // {
      //   label: 'Add-Product',
      //   key: 'add-product'
      // },
      // {
      //   label: 'Add-Category',
      //   key: 'add-category'
      // },
      {
        label: <Button danger type="text">Logout</Button>,
        key: '/',
        icon: <LogoutOutlined />,
        style: {'position': 'absolute', 'bottom': 0 },
        onClick: () => authServices.logout()
      }
    ]
    return (
      <Menu
        items={items}
        onClick={(e) => navigate(`${e.key}`)}
        selectedKeys={[current]}
        style={{ position: 'relative', height: '100%' }}
      />
    );
  };

  return (
    <Layout className="layout admin-layout">
      <Header>
        header
      </Header>
      <Layout>
        <Sider theme="light" collapsible>
          {menu()}
        </Sider>
        <Content style={{overflow: 'auto'}}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
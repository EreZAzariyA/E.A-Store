import { Layout, Menu, message } from "antd";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { productsServices } from "../../services/productsServices";
import { authServices } from "../../services/auth-services";

const { Content, Sider, Header } = Layout;

export const AdminLayout = () => {
  const { pathname } = useLocation();
  const [current,setCurrent] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        await productsServices.fetchAllProducts();
        await productsServices.fetchAllCategories();
        await productsServices.fetchAllSubCategories();
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
        key: 'dashboard'
      },
      {
        label: 'All-Products',
        key: 'all-products'
      },
      {
        label: 'All-Categories',
        key: 'all-categories'
      },
      {
        label: 'Insert Doc',
        key: 'insert-doc'
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
        label: 'Logout',
        key: '/',
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
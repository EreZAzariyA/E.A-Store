import { Layout, Menu, message } from "antd";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { AdminRouter } from "../../routes/admin-router";
import { useEffect, useState } from "react";
import { productsServices } from "../../services/productsServices";

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
        key: 'logout',
        style: {'marginTop': 'max-content' }
      }
    ]
    return <Menu selectedKeys={[current]} items={items} onClick={(e) => navigate(`${e.key}`)}/>;
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
        <Content>
          <AdminRouter />
        </Content>
      </Layout>
    </Layout>
  )
}
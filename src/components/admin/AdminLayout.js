import { Layout, Menu } from "antd";
import { useNavigate } from "react-router-dom";
import { AdminRouter } from "../../routes/admin-router";

const { Content, Sider, Header } = Layout;

export const AdminLayout = () => {
  const navigate = useNavigate();

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
    return <Menu items={items} onClick={(e) => navigate(`${e.key}`)}/>;
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
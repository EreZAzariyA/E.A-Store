import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { DashboardHeader } from "../../layout/DashboardView/DashboardHeader";
import { authServices } from "../../services/auth-services";
import { Button, Layout, Menu } from "antd";
import AppstoreOutlined from "@ant-design/icons/AppstoreOutlined";
import DatabaseOutlined from "@ant-design/icons/DatabaseOutlined";
import LogoutOutlined from "@ant-design/icons/LogoutOutlined";
import UploadOutlined from "@ant-design/icons/UploadOutlined";

const { Content, Sider } = Layout;

export const AdminLayout = () => {
  const { pathname } = useLocation();
  const [current,setCurrent] = useState('');
  const navigate = useNavigate();

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
        label: 'Tables',
        key: 'tables',
        icon: <DatabaseOutlined />
      },
      {
        label: 'Insert Doc',
        key: 'insert-doc',
        icon: <UploadOutlined />
      },
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
      <DashboardHeader />
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
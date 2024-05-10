import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { DashboardHeader } from "../../layout/DashboardView/DashboardHeader";
import { authServices } from "../../services/auth-services";
import { OrdersStatus } from "../../utils/helpers";
import { Badge, Layout, Menu, Typography } from "antd";
import PieChartOutlined from "@ant-design/icons/PieChartOutlined";
import AppstoreAddOutlined from "@ant-design/icons/AppstoreAddOutlined";
import TableOutlined from "@ant-design/icons/TableOutlined";
import DatabaseOutlined from "@ant-design/icons/DatabaseOutlined";
import UploadOutlined from "@ant-design/icons/UploadOutlined";
import LogoutOutlined from "@ant-design/icons/LogoutOutlined";
import ScheduleOutlined from "@ant-design/icons/ScheduleOutlined";
import ShopOutlined from "@ant-design/icons/ShopOutlined";

const { Content, Sider } = Layout;

export const AdminLayout = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [current, setCurrent] = useState('');
  const orders = useSelector((state) => state.orders);
  const paddingOrders = [...orders]?.filter((o) => o.status === OrdersStatus.PENDING);
  const count = paddingOrders.length;

  useEffect(() => {
    const locationArray = pathname.split('/');
    setCurrent(locationArray[2]);
  }, [pathname]);

  const logout = () => {
    authServices.logout();
  };

  const menu = () => {
    const items = [
      {
        label: 'Dashboard',
        key: 'dashboard',
        icon: <PieChartOutlined />
      },
      {
        label: 'Products',
        key: 'products',
        icon: <AppstoreAddOutlined />
      },
      {
        label: 'Categories',
        key: 'categories',
        icon: <DatabaseOutlined />
      },
      {
        label: 'Brands',
        key: 'brands',
        icon: <ShopOutlined />
      },
      {
        label: 'Sub-Categories',
        key: 'sub-categories',
        icon: <TableOutlined />
      },
      {
        label: 'Upload-Image',
        key: 'upload-image',
        icon: <UploadOutlined />
      },
      {
        label: <Badge count={count} style={{ marginRight: '-100%' }}>Orders</Badge>,
        key: 'orders',
        icon: <ScheduleOutlined />
      },
      {
        label: <Typography.Text type="danger">Sign-Out</Typography.Text>,
        key: '/',
        icon: <LogoutOutlined />,
        onClick: logout
      }
    ];

    return (
      <Menu
        items={items}
        onClick={(e) => navigate(`${e.key}`)}
        selectedKeys={[current]}
        style={{ position: 'relative', height: '100%', textAlign: 'justify' }}
      />
    );
  };

  return (
    <Layout className="layout admin-layout">
      <DashboardHeader />
      <Layout hasSider>
        <Sider
          collapsible
          theme="light"
        >
          {menu()}
        </Sider>
        <Content className="site-layout">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
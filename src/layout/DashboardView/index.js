import { Layout } from "antd";
import { DashboardHeader } from "./DashboardHeader";
import { DashboardWrapper } from "./DashboardWrapper";
import { Outlet } from "react-router-dom";

const { Content, Sider } = Layout;

export const DashboardView = () => (
  <Layout className="layout main-layout">
    <Sider
      trigger={null}
      theme="light"
      width={0}
      collapsedWidth={0}
      collapsible
    >
      asdasd
    </Sider>
    <Layout>
      <DashboardHeader />
      <Content className="site-layout">
        <DashboardWrapper />
        <Outlet />
      </Content>
    </Layout>
  </Layout>
);

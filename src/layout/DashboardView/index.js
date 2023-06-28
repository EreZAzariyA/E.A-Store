import { Layout } from "antd";
import { DashboardHeader } from "./DashboardHeader";
import { DashboardFooter } from "./DashboardFooter";
import { DashboardWrapper } from "./DashboardWrapper";
import { Outlet } from "react-router-dom";

const { Content } = Layout;

export const DashboardView = () => (
  <Layout className="layout main-layout">
    <DashboardHeader />

    <Content className="site-layout">
      <DashboardWrapper />
      <Outlet />
    </Content>

    <DashboardFooter />
  </Layout>
);

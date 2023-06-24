import { Layout } from "antd";
import { DashboardHeader } from "./DashboardHeader";
import { DashboardFooter } from "./DashboardFooter";
import { CustomDivider } from "../../components/components/Divider";
import { UserRouter } from "../../routes/user-router";
import { DashboardWrapper } from "./DashboardWrapper";

const { Content } = Layout;

export const DashboardView = () => (
  <Layout className="layout main-layout">
    <DashboardHeader />
    <CustomDivider />

    <Content className="site-layout">
      <DashboardWrapper />
      <UserRouter />
    </Content>

    <DashboardFooter />
  </Layout>
);

import { Layout } from "antd";
import { DashboardHeader } from "./DashboardHeader";
import { DashboardFooter } from "./DashboardFooter";
import { CustomDivider } from "../../components/components/Divider";
import { UserRouter } from "../../routes/user-router";

const { Content } = Layout;

export const DashboardView = () => (
  <Layout className="layout main-layout">
    <DashboardHeader />
    <CustomDivider />
    
    <Content>
      <UserRouter />
    </Content>

    <DashboardFooter />
  </Layout>
);

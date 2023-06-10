import { Layout } from "antd";
import { DashboardHeader } from "./DashboardHeader";
import { DashboardFooter } from "./DashboardFooter";
import "../styles/main.css";
import { CustomDivider } from "../components/components/Divider";

const { Content } = Layout;

export const Dashboard = () => {
  return (
    <Layout className="main-layout">
      <DashboardHeader />
      <CustomDivider />
      
      <Content>
        content
      </Content>

      <DashboardFooter />
    </Layout>
  );
};
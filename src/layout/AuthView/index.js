import { Layout } from "antd";
import { AuthRoutes } from "./AuthRoutes";
import "./AuthView.css";

const { Content } = Layout;

export const AuthView = () =>  (
  <>
    <div id="auth-bg"></div>
    <Layout className="layout auth-layout">
      <Content>
        <AuthRoutes />
      </Content>
    </Layout>
  </>
);
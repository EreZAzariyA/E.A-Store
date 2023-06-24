import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import "./AuthView.css";

const { Content } = Layout;

export const AuthView = () =>  (
  <>
    <div id="auth-bg"></div>
    <Layout className="layout auth-layout">
      <Content>
        <Outlet />
      </Content>
    </Layout>
  </>
);
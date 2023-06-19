import { Layout } from "antd";
import { AuthRouter } from "../../routes/auth-router";
import "./AuthView.css";

const { Content } = Layout;

export const AuthView = () => {
  return (
    <>
    <div id="auth-bg"></div>
      <Layout className="layout auth-layout">
        <Content>
          <AuthRouter />
        </Content>
      </Layout>
    </>
  );
};
import { Layout } from "antd";
import { AuthRouter } from "../../routes/auth-router";


const { Content } = Layout;

export const AuthView = () => {
  return (
    <Layout className="layout auth-layout">
      <Content>
        <AuthRouter />
      </Content>
    </Layout>
  );
};
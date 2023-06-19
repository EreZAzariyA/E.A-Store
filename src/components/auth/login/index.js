import { Button, Form, Input, message } from "antd";
import { authServices } from "../../../services/auth-services";
import { useNavigate } from "react-router-dom";
import { getError } from "../../../utils/helpers";

export const Login = () => {
  const navigate = useNavigate();

  const onFinish = async (credentials) => {
    try {
      await authServices.login(credentials);
      navigate('/');
    } catch (err) {
      message.error({
        content: getError(err),
        duration: 2
      })
    };
  };

  return (
    <Form onFinish={onFinish}>
      <Form.Item label={'Email'} name={'email'}>
        <Input type="email" />
      </Form.Item>
      
      <Form.Item label={'Password'} name={'password'}>
        <Input type="password" />
      </Form.Item>

      <Button htmlType="submit">Sign-in</Button>
    </Form>
  );
};
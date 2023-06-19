import { Button, Form, Input } from "antd";
import { authServices } from "../../../services/auth-services";
import { useNavigate } from "react-router-dom";
import { getError } from "../../../utils/helpers";

export const Register = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      await authServices.register(values);
      navigate('/auth/login');
    } catch (err) {
      console.log(getError(err));
    }
  };
  
  return (
    <Form onFinish={onFinish}>
      <Form.Item>
        <Form.Item label={'First-name'} name={'first_name'}>
          <Input type="text" />
        </Form.Item>
        <Form.Item label={'Last-name'} name={'last_name'}>
          <Input type="text" />
        </Form.Item>
      
      </Form.Item>

      <Form.Item label={'Email'} name={'email'}>
        <Input type="email" />
      </Form.Item>

      <Form.Item label={'Password'} name={'password'}>
        <Input type="password" />
      </Form.Item>

      <Button htmlType="submit">Sign-up</Button>
    </Form>
  );
};
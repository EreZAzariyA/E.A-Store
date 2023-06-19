import { Button, Form, Input, message } from "antd";
import { authServices } from "../../../services/auth-services";
import { Link, useNavigate } from "react-router-dom";
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

  const formItemLayout = {
    className: 'auth-form login',
    layout: "horizontal",
    labelAlign: 'left',
    labelCol: {
      sm: { span: 6 },
      lg: { span: 4 },
    },
    wrapperCol: {span: 24},
  };

  return (
    <div className="auth-form-main-container">
      <div className="auth-form-inner-container">
        <Form onFinish={onFinish} {...formItemLayout}>
          <Form.Item label={'Email'} name={'email'}>
            <Input type="email" />
          </Form.Item>
          
          <Form.Item label={'Password'} name={'password'}>
            <Input.Password />
          </Form.Item>

          <Button htmlType="submit">Sign-in</Button>
          <p>D'ont have account? <Link to={'/auth/register'}>Register</Link></p>
        </Form>

      </div>
    </div>
  );
};
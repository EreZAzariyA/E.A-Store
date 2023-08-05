import { Button, Form, Input, message } from "antd";
import { authServices } from "../../../services/auth-services";
import { Link, useNavigate } from "react-router-dom";
import { MessagesTypes, getError } from "../../../utils/helpers";

export const Login = () => {
  const navigate = useNavigate();

  const onFinish = async (credentials) => {
    authServices.login(credentials).then((res) => {
      if (res) {
        message.success(MessagesTypes.LOGGED_IN_SUCCESSFULLY);
        navigate('/');
      }
    }).catch((err) => {
      message.error(getError(err));
    });
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
          <Form.Item
            label={'Email'}
            name={'email'}
            rules={[
              { required: true, message: 'Please enter your email' },
            ]}
          >
            <Input type="email" />
          </Form.Item>

          <Form.Item
            label={'Password'}
            name={'password'}
            rules={[
              { required: true, message: 'Please enter your password' },
              { min: 6, message: 'Password must be at least 6 characters long' }
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Button htmlType="submit">Sign-in</Button>
          <p>D`ont have account? <Link to={'/auth/register'}>Register</Link></p>
        </Form>
      </div>
    </div>
  );
};
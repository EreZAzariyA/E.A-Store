import { Button, Form, Input, message } from "antd";
import { authServices } from "../../../services/auth-services";
import { Link, useNavigate } from "react-router-dom";
import { MessagesTypes, getError } from "../../../utils/helpers";
import { useState } from "react";

export const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async (credentials) => {
    setLoading(true);
    authServices.login(credentials).then((res) => {
      if (res) {
        message.success(MessagesTypes.LOGGED_IN_SUCCESSFULLY);
        navigate('/');
      }
    }).catch((err) => {
      message.error(getError(err));
    }).finally(() => {
      setLoading(false);
    });
  };

  const formItemLayout = {
    className: 'auth-form login',
    layout: "vertical",
    labelAlign: 'left',

  };

  return (
    <div className="auth-form-main-container">
      <div className="auth-form-inner-container">
        <Form onFinish={onFinish} {...formItemLayout}>
          <h1 className="auth-form-title">Welcome Back</h1>
          <Form.Item
            label={'Email'}
            name={'email'}
            rules={[
              { required: true, message: 'Please enter your email' },
              { type: 'email', message: 'Please enter a valid email' }
            ]}
          >
            <Input type="email" placeholder="Enter your email" />
          </Form.Item>

          <Form.Item
            label={'Password'}
            name={'password'}
            rules={[
              { required: true, message: 'Please enter your password' },
              { min: 6, message: 'Password must be at least 6 characters long' }
            ]}
          >
            <Input.Password placeholder="Enter your password" />
          </Form.Item>

          <Button ghost htmlType="submit" loading={loading}>Sign In</Button>
          <p>Don't have an account? <Link to={'/auth/register'}>Register</Link></p>
          <Button
            type="text"
            onClick={() => navigate('/')}
            style={{
              width: '100%',
              marginTop: '16px',
              textDecoration: 'underline'
            }}
          >
            Continue as Guest
          </Button>
        </Form>
      </div>
    </div>
  );
};
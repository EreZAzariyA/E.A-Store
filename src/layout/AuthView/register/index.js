import { Button, Form, Input, message } from "antd";
import { authServices } from "../../../services/auth-services";
import { Link, useNavigate } from "react-router-dom";
import { MessagesTypes, getError } from "../../../utils/helpers";
import { useState } from "react";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    authServices.register(values).then((res) => {
      if (res) {
        message.success(MessagesTypes.REGISTER_SUCCESSFULLY);
        navigate('/auth/login');
      }
    }).catch((err) => {
      message.error(getError(err));
    }).finally(() => {
      setLoading(false);
    });
  };

  const formItemLayout = {
    className: 'auth-form register',
    layout: "horizontal",
    labelAlign: 'left',
    labelCol: {
      sm: { span: 8 },
      md: { span: 6 },
      lg: { span: 4 },
    },
    wrapperCol: {span: 24},
  };

  return (
    <div className="auth-form-main-container">
      <div className="auth-form-inner-container">
        <Form onFinish={onFinish} {...formItemLayout}>
            <h1 className="auth-form-title">Create Account</h1>
            <Form.Item
              label={'First Name'}
              name={'first_name'}
              rules={[
                { required: true, message: 'Please enter your first name' },
                { min: 3, message: 'First name must be at least 3 characters long' }
              ]}
            >
              <Input type="text" placeholder="Enter your first name" />
            </Form.Item>
            <Form.Item
              label={'Last Name'}
              name={'last_name'}
              rules={[
                { required: true, message: 'Please enter your last name' },
                { min: 3, message: 'Last name must be at least 3 characters long' }
              ]}
            >
              <Input type="text" placeholder="Enter your last name" />
            </Form.Item>

            <Form.Item
              label={'Email'}
              name={'email'}
              rules={[
                { required: true, message: 'Please enter your email address' },
                { pattern: emailRegex, message: 'Please enter a valid email address' },
              ]}
            >
              <Input type="email" placeholder="Enter your email address" />
            </Form.Item>

            <Form.Item
              label={'Password'}
              name={'password'}
              rules={[
                { required: true, message: 'Please enter password' },
                { min: 6, message: 'Password must be at least 6 characters long' },
              ]}
            >
              <Input.Password placeholder="Enter your password" />
            </Form.Item>

            <Button htmlType="submit" loading={loading}>Sign Up</Button>
            <p>Already have an account? <Link to={'/auth/login'}>Login</Link></p>
        </Form>
      </div>
    </div>
  );
};
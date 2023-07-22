import { Button, Form, Input, message } from "antd";
import { authServices } from "../../../services/auth-services";
import { Link, useNavigate } from "react-router-dom";
import { MessagesTypes, getError } from "../../../utils/helpers";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const Register = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    authServices.register(values).then((res) => {
      if (res) {
        message.success(MessagesTypes.REGISTER_SUCCESSFULLY);
        navigate('/auth/login');
      };
    }).catch((err) => {
      message.error(getError(err));
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
            <Form.Item
              label={'First-name'}
              name={'first_name'}
              rules={[
                { required: true, message: 'Please enter your first name' },
                { min: 3, message: 'First name must be at least 3 characters long' }
              ]}
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              label={'Last-name'}
              name={'last_name'}
              rules={[
                { required: true, message: 'Please enter your last name' },
                { min: 3, message: 'Last name must be at least 3 characters long' }
              ]}
            >
              <Input type="text" />
            </Form.Item>

            <Form.Item
              label={'Email'}
              name={'email'}
              rules={[
                { required: true, message: 'Please enter your email address' },
                { pattern: emailRegex, message: 'Please enter a valid email address' },
              ]}
            >
              <Input type="email" />
            </Form.Item>

            <Form.Item
              label={'Password'}
              name={'password'}
              rules={[
                { required: true, message: 'Please enter password' },
                { min: 6, message: 'Password must be at least 6 characters long' },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Button htmlType="submit">Sign-up</Button>
            <p>Already have account? <Link to={'/auth/login'}>Login</Link></p>
        </Form>
      </div>
    </div>
  );
};
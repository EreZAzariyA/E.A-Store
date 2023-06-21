import { Button, Form, Input } from "antd";
import { authServices } from "../../../services/auth-services";
import { Link, useNavigate } from "react-router-dom";
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
            <Form.Item label={'First-name'} name={'first_name'}>
              <Input type="text" />
            </Form.Item>
            <Form.Item label={'Last-name'} name={'last_name'}>
              <Input type="text" />
            </Form.Item>

            <Form.Item label={'Email'} name={'email'}>
              <Input type="email" />
            </Form.Item>

            <Form.Item label={'Password'} name={'password'}>
              <Input.Password />
            </Form.Item>

            <Button htmlType="submit">Sign-up</Button>
            <p>Already have account? <Link to={'/auth/login'}>Login</Link></p>
        </Form>
      </div>
    </div>
  );
};
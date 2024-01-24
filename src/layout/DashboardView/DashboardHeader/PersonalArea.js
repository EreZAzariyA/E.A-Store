import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authServices } from "../../../services/auth-services";
import { HeartIcon } from "../../../utils/helpers";
import UserOutlined from "@ant-design/icons/UserOutlined";
import ShoppingCartOutlined from "@ant-design/icons/ShoppingCartOutlined";
import { Badge, Button, Col, Dropdown, Row, Space, Tooltip, Typography } from "antd";

let items = [];

export const PersonalArea = () => {
  const user = useSelector((state) => state.auth?.user);
  const products = useSelector((state) => state.shoppingCart?.products);
  const navigate = useNavigate();

  if (user) {
    items = [
      {
        label: <Typography.Text>Orders</Typography.Text>,
        key: 'orders',
        onClick: () => navigate('/my-orders')
      },
      {
        label: <Button type="text" danger>Logout</Button>,
        key: 'logout',
        onClick: () => authServices.logout()
      }
    ];
  } else {
    items = [{
      label: 'Login',
      key: 'login',
      onClick: () => navigate('auth/login')
    },
    {
      label: 'Register',
      key: 'register',
      onClick: () => navigate('auth/register')
    }];
  }

  return (
    <Row align={'middle'} justify={'space-evenly'}>
      <Col>
        <Tooltip title="My Cart">
          <Badge count={products?.length}>
            <Button type="link" onClick={() => navigate('/my-cart')}>
              <ShoppingCartOutlined style={{ fontSize: '24px', color: '#08c' }} />
            </Button>
          </Badge>
        </Tooltip>
      </Col>
      <Col>
        <Tooltip title="My Favorites">
          <Button type="link" onClick={() => navigate('/my-favorites')}>
            <HeartIcon style={{ fontSize: '24px', color: '#08c' }} />
          </Button>
        </Tooltip>
      </Col>
      <Col>
        <Dropdown
          menu={{
            items,
            style: {
              textAlign: 'center'
            }
          }}
        >
          <Space>
            <UserOutlined style={{ fontSize: '24px', color: '#08c' }} />
          </Space>
        </Dropdown>
      </Col>
    </Row>
  );
};

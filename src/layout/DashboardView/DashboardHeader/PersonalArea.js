import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authServices } from "../../../services/auth-services";
import { Colors, HeartIcon, Sizes } from "../../../utils/helpers";
import { Badge, Button, Col, Dropdown, Row, Space, Tooltip, Typography } from "antd";
import UserOutlined from "@ant-design/icons/UserOutlined";
import ShoppingCartOutlined from "@ant-design/icons/ShoppingCartOutlined";
import { LiaShippingFastSolid } from "react-icons/lia";

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
        icon: <LiaShippingFastSolid color={Colors.ICON} size={Sizes.ICON} />,
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
    <Row align={'middle'}>
      <Col span={8}>
        <Tooltip title="My Cart">
          <Badge offset={[-10, 0]} count={products?.length}>
            <Button type="link" onClick={() => navigate('/my-cart')}>
              <ShoppingCartOutlined style={{ fontSize: '24px', color: Colors.ICON }} />
            </Button>
          </Badge>
        </Tooltip>
      </Col>
      <Col span={8}>
        <Tooltip title="My Favorites">
          <Button type="link" onClick={() => navigate('/favorites')}>
            <HeartIcon style={{ fontSize: '24px', color: Colors.ICON }} />
          </Button>
        </Tooltip>
      </Col>
      <Col span={8}>
        <Dropdown
          menu={{
            items,
            style: {
              textAlign: 'center'
            }
          }}
        >
          <Space>
            <UserOutlined style={{ fontSize: '24px', color: Colors.ICON }} />
          </Space>
        </Dropdown>
      </Col>
    </Row>
  );
};

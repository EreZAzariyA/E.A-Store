import { Badge, Button, Col, Dropdown, Row, Space, Tooltip } from "antd";
import UserOutlined from "@ant-design/icons/UserOutlined";
import { authServices } from "../../../services/auth-services";
import { HeartIcon } from "../../../utils/helpers";
import { useNavigate } from "react-router-dom";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";

export const PersonalArea = () => {
  const navigate = useNavigate();
  const products = useSelector((state) => state.shoppingCart?.products);

  const items = [
    {
      label: <Button type="text" danger>Logout</Button>,
      key: 'logout', onClick: () => authServices.logout()
    },
  ];

  return (
    <Row align={'middle'} justify={'space-evenly'}>
      <Col>
        <Tooltip title="My Cart">
          <Badge count={products?.length}>
            <Button type="link" onClick={() => navigate('/my-cart')}>
              <ShoppingCartOutlined style={{ fontSize: '26px', color: '#08c' }} />
            </Button>
          </Badge>
        </Tooltip>
      </Col>
      <Col>
        <Tooltip title="My Favorites">
          <Button type="link" onClick={() => navigate('/my-favorites')}>
            <HeartIcon style={{ fontSize: '24px' }} />
          </Button>
        </Tooltip>
      </Col>
      <Col>
        <Dropdown
          menu={{
            items,
          }}
        >
          <Space>
            <UserOutlined style={{ fontSize: '26px', color: '#08c' }} />
          </Space>
        </Dropdown>
      </Col>
    </Row>
  );
};

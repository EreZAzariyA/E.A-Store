import { Button, Col, Dropdown, Row, Space } from "antd";
import { Link, useNavigate } from "react-router-dom";
import UserOutlined from "@ant-design/icons/UserOutlined";

export const PersonalArea = () => {
  const navigate = useNavigate();

  const items = [
    {label: <Button type="text" danger>Logout</Button>, key: 'logout', onClick: () => navigate('/logout')}
  ]

  return (
    <Row align={'middle'} justify={'space-evenly'}>
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
      <Col>b</Col>
      <Col>c</Col>
    </Row>
  );
};

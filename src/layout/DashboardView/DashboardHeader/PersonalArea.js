import { Button, Col, Dropdown, Row, Space } from "antd";
import UserOutlined from "@ant-design/icons/UserOutlined";
import { useDispatch } from "react-redux";
import { AuthActions } from "../../../redux/actions";

export const PersonalArea = () => {
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(AuthActions.logout());
  };

  const items = [
    {label: <Button type="text" danger>Logout</Button>, key: 'logout', onClick: () => logout()}
  ];

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

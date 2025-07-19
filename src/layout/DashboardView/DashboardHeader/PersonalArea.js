import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authServices } from "../../../services/auth-services";
import { Colors, HeartIcon, Sizes } from "../../../utils/helpers";
import { Badge, Button, Dropdown, Space, Tooltip, Typography } from "antd";
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

  const buttonStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '48px',
    height: '48px',
    background: 'rgba(255, 255, 255, 0.9)',
    backdropFilter: 'blur(8px)',
    border: '1px solid rgba(0, 0, 0, 0.08)',
    borderRadius: '50%',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)'
  };

  const iconStyle = {
    fontSize: '20px',
    color: '#434343',
    transition: 'all 0.3s ease'
  };

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
      padding: '0 8px',
      justifyContent: 'flex-end'
    }}>
      <Tooltip title="My Cart" placement="bottom">
        <Badge
          count={products?.length}
          offset={[-4, 4]}
          style={{
            backgroundColor: '#667eea',
            boxShadow: '0 2px 8px rgba(102, 126, 234, 0.3)'
          }}
        >
          <Button
            type="text"
            shape="circle"
            size="large"
            icon={<ShoppingCartOutlined style={iconStyle} />}
            onClick={() => navigate('/my-cart')}
            style={buttonStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.12)';
              e.currentTarget.style.background = 'rgba(255, 255, 255, 1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.9)';
            }}
          />
        </Badge>
      </Tooltip>

      <Tooltip title="My Favorites" placement="bottom">
        <Button
          type="text"
          shape="circle"
          size="large"
          icon={<HeartIcon style={iconStyle} />}
          onClick={() => navigate('/favorites')}
          style={buttonStyle}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.12)';
            e.currentTarget.style.background = 'rgba(255, 255, 255, 1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.9)';
          }}
        />
      </Tooltip>

      <Dropdown
        menu={{
          items,
          style: {
            minWidth: 180,
            borderRadius: 12,
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
            border: '1px solid rgba(0, 0, 0, 0.08)',
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(12px)'
          }
        }}
        placement="bottomRight"
        trigger={['click']}
      >
        <Button
          type="text"
          shape="circle"
          size="large"
          icon={<UserOutlined style={iconStyle} />}
          style={buttonStyle}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.12)';
            e.currentTarget.style.background = 'rgba(255, 255, 255, 1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.9)';
          }}
        />
      </Dropdown>
    </div>
  );
};

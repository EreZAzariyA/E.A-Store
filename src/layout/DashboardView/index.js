import { Button, Layout, Menu } from "antd";
import { DashboardHeader } from "./DashboardHeader";
import { DashboardWrapper } from "./DashboardWrapper";
import { Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Colors, Sizes } from "../../utils/helpers";
import { authServices } from "../../services/auth-services";
import { useSelector } from "react-redux";
import { AiOutlineShoppingCart, AiOutlineLogout, AiOutlineProfile } from "react-icons/ai";
import { IoIosStarOutline } from "react-icons/io";
import { VscAccount } from "react-icons/vsc";
import { LiaShippingFastSolid } from "react-icons/lia";

const { Content, Sider } = Layout;

export const DashboardView = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth?.token);
  const [isOpen, setIsOpen] = useState(false);

  const items = [
    {
      label: 'Cart',
      key: 'my-cart',
      icon: <AiOutlineShoppingCart color={Colors.ICON} size={Sizes.ICON} />
    },
    {
      label: 'Orders',
      key: 'my-orders',
      icon: <LiaShippingFastSolid color={Colors.ICON} size={Sizes.ICON} />
    },
  ];
  items.forEach((i) => {
    i.style = {
      display: 'flex',
      alignItems: 'center',
      textAlign: 'justify'
    }
    i.onClick = () => navigate(i.key);
  });
  items.push({
    label: 'Account',
    key: 'account',
    icon: <VscAccount color={Colors.ICON} size={Sizes.ICON} />,
    children: user ? [
      {
        label: 'Your Profile',
        key: 'profile',
        onClick: () => navigate('profile'),
        icon: <AiOutlineProfile color={Colors.ICON} size={Sizes.ICON} />
      },
      {
        label: 'Favorites Products',
        key: 'favorites',
        onClick: () => navigate('favorites'),
        icon: <IoIosStarOutline color={Colors.ICON} size={Sizes.ICON}/>
      },
      {
        label: <Button type="link" danger>Logout</Button>,
        key: 'logout',
        onClick: () => authServices.logout(),
        icon: <AiOutlineLogout color={Colors.DANGER} size={Sizes.ICON} />,
        style: {
          color: 'red'
        }
      },
    ] : [
      {
        label: 'Login',
        key: 'login',
        onClick: () => navigate('auth/login')
      },
      {
        label: 'Register',
        key: 'register',
        onClick: () => navigate('auth/register')
      }
    ]
  });

  const handleOnBreakpoint = (brake) => {
    if (!brake) {
      setIsOpen(false);
    }
  };

  return (
    <Layout className="layout main-layout">
      <DashboardHeader isOpen={isOpen} setIsOpen={setIsOpen} />
      <Layout>
        <Sider
          trigger={null}
          theme="light"
          width={225}
          collapsed={!isOpen}
          collapsedWidth={0}
          breakpoint="md"
          onBreakpoint={handleOnBreakpoint}
        >
          <Menu
            items={items}
            mode="inline"
            theme="light"
            style={{ textAlign: 'justify', height: '100%', fontSize: 14 }}
          />
        </Sider>
        <Content className="site-layout">
          <DashboardWrapper />
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}

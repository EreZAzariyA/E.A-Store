import { useEffect, useState } from "react";
import { PersonalArea } from "./PersonalArea";
import { useSelector } from "react-redux";
import { shoppingCartServices } from "../../../services/shoppingCart-services";
import { Button, Col, Layout, Row } from "antd";
import { storeServices } from "../../../services/store-services";
import { ordersServices } from "../../../services/orders-services";
import { CiMenuBurger, CiSearch } from "react-icons/ci";
import { SearchInput } from "../../../components/components/Search-input";
import { Colors, Sizes, isAdmin } from "../../../utils/helpers";
import { useNavigate } from "react-router-dom";
import adminOrdersServices from "../../../services/admin/orders-services";
import { Logo } from "../../../components/components/Logo/Logo";

const { Header } = Layout;

export const DashboardHeader = ({ sideBarHandler }) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth?.user);
  const admin = isAdmin(user);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const fetchStoreData = async () => {
      await storeServices.fetchAllProducts();
      await storeServices.fetchAllCategories();
      await storeServices.fetchAllSubCategories();
    };

    fetchStoreData();
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      await shoppingCartServices.fetchUserShoppingCart(user?._id);
      await ordersServices.fetchUserOrdersByUser_id(user?._id);
    };
    const fetchAdminAllOrders = async () => {
      await adminOrdersServices.fetchAllOrders();
    };

    if (user && !admin) {
      fetchUserData();
    }
    if (user && admin) {
      fetchAdminAllOrders();
    }
  }, [user, admin]);

  useEffect(() => {
    const handleScroll = () => {
      console.log('test');
      const currentScroll = window.pageYOffset;
      setIsSticky(currentScroll > 150);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Header className={isSticky ? "is-sticky" : ""}>
      <Row justify={admin ? 'start' : 'space-between'} align={'middle'}>
        <Col span={2}>
          <Logo />
        </Col>

        {!admin && (
          <>
            <Col md={{ span: 0 }} xs={{ span: 16 }}>
              <Row justify={"end"} align={'middle'}>
                <Col md={{ span: 0 }} xs={{ span: 4 }} sm={{ span: 3 }}>
                  <Button type="link"><CiSearch color={Colors.ICON} size={Sizes.ICON} onClick={() => navigate('search')} /></Button>
                </Col>
                <Col md={{ span: 0 }} xs={{ span: 4 }} sm={{ span: 3 }}>
                  <Button type="link"><CiMenuBurger color={Colors.ICON} size={Sizes.ICON} onClick={() => sideBarHandler()} /></Button>
                </Col>
              </Row>
            </Col>

            <Col md={{ span: 17 }} xs={{ span: 0 }}>
              <Row justify={"space-between"}>
                <Col md={{ span: 16 }} sm={{ span: 0 }} className="search">
                  <SearchInput />
                </Col>

                <Col md={{ span: 8 }} sm={{ span: 0 }} className="personal">
                  <PersonalArea />
                </Col>
              </Row>
            </Col>
          </>
        )}
      </Row>
    </Header>
  );
};

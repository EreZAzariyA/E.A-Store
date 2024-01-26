import { useEffect } from "react";
import { PersonalArea } from "./PersonalArea";
import { useSelector } from "react-redux";
import { shoppingCartServices } from "../../../services/shoppingCart-services";
import { Button, Col, Layout, Row } from "antd";
import { storeServices } from "../../../services/store-services";
import { ordersServices } from "../../../services/orders-services";
import { Logo } from "../../../components/components/Logo";
import { CiMenuBurger, CiSearch } from "react-icons/ci";
import { SearchInput } from "../../../components/components/Search-input";
import { Colors, Sizes, isAdmin } from "../../../utils/helpers";
import { useNavigate } from "react-router-dom";
import adminOrdersServices from "../../../services/admin/orders-services";

const { Header } = Layout;

export const DashboardHeader = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth?.user);
  const admin = isAdmin(user);

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

  return (
    <Header>
      <Row style={{width: '100%'}} justify={admin ? 'start' : 'space-between'} align={'middle'} wrap>
        <Col span={2}>
          <Logo />
        </Col>

        {!admin && (
          <>
            <Col sm={{span: 0}} xs={{ span: 16 }}>
              <Row justify={"end"}>
                <Col sm={{span: 0}} xs={{ span: 4 }}>
                  <Button type="link"><CiSearch color={Colors.ICON} size={Sizes.ICON} onClick={() => navigate('search')} /></Button>
                </Col>
                <Col sm={{span: 0}} xs={{ span: 4 }}>
                  <Button type="link"><CiMenuBurger color={Colors.ICON} size={Sizes.ICON} onClick={() => setIsOpen(!isOpen)} /></Button>
                </Col>
              </Row>
            </Col>

            <Col sm={{ span: 17 }} xs={{ span: 0 }}>
              <Row justify={"space-between"}>
                <Col sm={{ span: 16 }} xs={{ span: 0 }} className="search">
                  <SearchInput />
                </Col>

                <Col sm={{ span: 8 }} xs={{ span: 0 }} className="personal">
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

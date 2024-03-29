import { useEffect } from "react";
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

  useEffect(() => {
    const fetchStoreData = async () => {
      await storeServices.fetchAllProducts();
      await storeServices.fetchAllCategories();
      await storeServices.fetchAllSubCategories();
      await storeServices.fetchAllBrands();
    };

    fetchStoreData();
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      await shoppingCartServices.fetchUserShoppingCart(user?._id);
      await ordersServices.fetchUserOrdersByUser_id(user?._id);
    };
    const fetchAdminRequiredData = async () => {
      await adminOrdersServices.fetchAllOrders();
    };

    if (user && !admin) {
      fetchUserData();
    }
    if (user && admin) {
      fetchAdminRequiredData();
    }
  }, [user, admin]);

  return (
    <Header>
      <Row justify={admin ? 'start' : 'space-between'} align={'middle'}>
        <Col span={4}>
          <Logo />
        </Col>

        {!admin && (
          <>
            <Col md={{ span: 0 }} xs={{ span: 18 }}>
              <Row justify={"end"} align={'middle'}>
                <Col md={{ span: 0 }} xs={{ span: 4 }} sm={{ span: 3 }}>
                  <Button type="link"><CiSearch color={Colors.ICON} size={Sizes.ICON} onClick={() => navigate('search')} /></Button>
                </Col>
                <Col md={{ span: 0 }} xs={{ span: 4 }} sm={{ span: 3 }}>
                  <Button type="link"><CiMenuBurger color={Colors.ICON} size={Sizes.ICON} onClick={() => sideBarHandler()} /></Button>
                </Col>
              </Row>
            </Col>

            <Col md={{ span: 18 }} xs={{ span: 0 }}>
              <Row justify={"space-between"}>
                <Col md={{ span: 18 }} className="search">
                  <SearchInput />
                </Col>

                <Col md={{ span: 6 }} className="personal">
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

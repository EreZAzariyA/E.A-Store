import { useEffect } from "react";
import { PersonalArea } from "./PersonalArea";
import { useSelector } from "react-redux";
import { shoppingCartServices } from "../../../services/shoppingCart-services";
import { Button, Col, Flex, Layout, Row } from "antd";
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
    const fetchUserData = async (user_id) => {
      await shoppingCartServices.fetchUserShoppingCart(user_id);
      await ordersServices.fetchUserOrdersByUser_id(user_id);
    };
    const fetchAdminRequiredData = async () => {
      await adminOrdersServices.fetchAllOrders();
    };

    if (user && user._id && !admin) {
      fetchUserData(user._id);
    }
    if (user && user._id && admin) {
      fetchAdminRequiredData();
    }
  }, [user, admin]);

  return (
    <Header>
      <Row align="middle">
        <Col xs={16} sm={16} md={16} lg={4} xl={4}>
          <Logo />
        </Col>

        {!admin && (
          <>
            <Col xs={8} sm={8} md={8} lg={0} xl={0}>
              <Flex justify="end" align="center" gap={8}>
                <Button
                  type="link"
                  icon={<CiSearch color={Colors.ICON} size={Sizes.ICON} />}
                  onClick={() => navigate('search')}
                />
                <Button
                  type="link"
                  icon={<CiMenuBurger color={Colors.ICON} size={Sizes.ICON} />}
                  onClick={() => sideBarHandler()}
                />
              </Flex>
            </Col>

            <Col xs={0} sm={0} md={0} lg={20} xl={20}>
              <Flex justify="end" align="center" gap={16}>
                <SearchInput />
                <PersonalArea />
              </Flex>
            </Col>
          </>
        )}

        {admin && (
          <Col xs={8} sm={8} md={8} lg={8} xl={8}>
            <Row justify="end" align="middle">
              <PersonalArea />
            </Row>
          </Col>
        )}
      </Row>
    </Header>
  );
};

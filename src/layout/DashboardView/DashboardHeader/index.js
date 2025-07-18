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
    <Header
      style={{
        background: 'rgba(255, 255, 255, 0.25)',
        backdropFilter: 'blur(16px)',
        height: '75px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08), 0 1px 3px rgba(0, 0, 0, 0.05)',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        padding: '0 12px'
      }}
    >
      <Row
        justify="space-between"
        align="middle"
        style={{ height: '100%' }}
      >
        <Col xs={16} sm={12} md={8} lg={6} xl={4}>
          <Logo />
        </Col>

        {!admin && (
          <>
            <Col xs={8} sm={0} md={0} lg={0} xl={0}>
              <Row justify="end" align="middle" gutter={[8, 0]}>
                <Col span={12}>
                  <Button
                    type="link"
                    icon={<CiSearch color={Colors.ICON} size={Sizes.ICON} />}
                    onClick={() => navigate('search')}
                    style={{ padding: '4px 8px' }}
                  />
                </Col>
                <Col span={12}>
                  <Button
                    type="link"
                    icon={<CiMenuBurger color={Colors.ICON} size={Sizes.ICON} />}
                    onClick={() => sideBarHandler()}
                    style={{ padding: '4px 8px' }}
                  />
                </Col>
              </Row>
            </Col>

            <Col xs={0} sm={12} md={16} lg={18} xl={20}>
              <Row gutter={[16, 0]} justify="end" align="middle">
                <Col xs={0} sm={16} md={16} lg={16} xl={18}>
                  <SearchInput />
                </Col>

                <Col xs={0} sm={8} md={8} lg={8} xl={6}>
                  <PersonalArea />
                </Col>
              </Row>
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

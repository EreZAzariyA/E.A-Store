import { useEffect } from "react";
import { PersonalArea } from "./PersonalArea";
import { useSelector } from "react-redux";
import { shoppingCartServices } from "../../../services/shoppingCart-services";
import { Col, Input, Layout, Row } from "antd";
import { storeServices } from "../../../services/store-services";
import { ordersServices } from "../../../services/orders-services";
import { Logo } from "../../../components/components/Logo";

const { Header } = Layout;

export const DashboardHeader = () => {
  const user = useSelector((state) => state.auth?.user);
  const isAdmin = user?.admin || false;

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

    if (user) {
      fetchUserData();
    }
  }, [user]);

  return (
    <Header>
      {!isAdmin && (
        <>
          <Row className="top-header-text">
            <Col span={24}>
              <p>We guarantee the lowest price in your city of residence for equal delivery and payment terms</p>
            </Col>
          </Row>

          <Row justify={'space-evenly'} align={'middle'}>
            <Col span={6}>
              <Logo />
            </Col>

            <Col span={12} className="search">
              <Input placeholder="Search products by name or id" />
            </Col>

            <Col span={6} className="personal">
              <PersonalArea />
            </Col>
          </Row>
        </>
      )}
    </Header>
  );
};

import { useEffect } from "react";
import { PersonalArea } from "./PersonalArea";
import { PromotionsArea } from "./PromotionsArea";
import { useSelector } from "react-redux";
import { shoppingCartServices } from "../../../services/shoppingCart-services";
import { Col, Input, Layout, Row } from "antd";
import { storeServices } from "../../../services/store-services";

const { Header } = Layout;

export const DashboardHeader = () => {
  const user = useSelector((state) => state.auth?.user);
  const isAdmin = user?.admin || false;

  useEffect(() => {
    const fetchAllData = async () => {
      await storeServices.fetchAllProducts();
      await storeServices.fetchAllCategories();
      await storeServices.fetchAllSubCategories();
      await shoppingCartServices.fetchUserShoppingCart(user?._id);
    };

    fetchAllData();
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
            <Col span={6} className="promotions">
              <PromotionsArea />
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

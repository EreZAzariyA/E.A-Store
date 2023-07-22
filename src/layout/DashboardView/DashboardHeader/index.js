import { useEffect } from "react";
import { PersonalArea } from "./PersonalArea";
import { PromotionsArea } from "./PromotionsArea";
import { useSelector } from "react-redux";
import { productsServices } from "../../../services/productsServices";
import { categoriesServices } from "../../../services/categoriesServices";
import { shoppingCartServices } from "../../../services/shoppingCart-services";
import { Col, Input, Layout, Row } from "antd";

const { Header } = Layout;

export const DashboardHeader = () => {
  const user = useSelector((state) => state.auth?.user);
  const isAdmin = user.admin;

  useEffect(() => {
    const fetchAllData = async () => {
      await productsServices.fetchAllProducts();
      await categoriesServices.fetchAllCategories();
      await categoriesServices.fetchAllSubCategories();
      await shoppingCartServices.fetchUserCart(user._id);
    };
    if (user) {
      fetchAllData();
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

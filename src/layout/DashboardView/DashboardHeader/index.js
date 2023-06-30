import { useEffect } from "react";
import { productsServices } from "../../../services/productsServices";
import { categoriesServices } from "../../../services/categoriesServices";
import { PersonalArea } from "./PersonalArea";
import { PromotionsArea } from "./PromotionsArea";
import { Col, Input, Layout, Row, message } from "antd";

const { Header } = Layout;

export const DashboardHeader = () => {

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        await productsServices.fetchAllProducts();
        await categoriesServices.fetchAllCategories();
        await categoriesServices.fetchAllSubCategories();
      } catch (err) {
        message.error(err.message);
      }
    };
    fetchAllData();
  }, []);

  return (
    <Header>
      <Row>
        <Col span={24}>
          <p>We guarantee the lowest price in your city of residence for equal delivery and payment terms</p>
        </Col>
      </Row>

      <Row justify={'space-evenly'} align={'middle'}>
        <Col span={6} className="promotions">
          <PromotionsArea />
        </Col>
        
        <Col span={12} className="search">
          <Input />
        </Col>
      
        <Col span={6} className="personal">
          <PersonalArea />
        </Col>
      </Row>
    </Header>
  );
};

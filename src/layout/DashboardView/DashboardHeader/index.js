import { useEffect } from "react";
import { PersonalArea } from "./PersonalArea";
import { PromotionsArea } from "./PromotionsArea";
import { useSelector } from "react-redux";
import { shoppingCartServices } from "../../../services/shoppingCart-services";
import { Col, Input, Layout, Row } from "antd";
import { storeServices } from "../../../services/store-services";

const { Header } = Layout;

export const DashboardHeader = () => {
  // const userState = useSelector((state) => state.auth);
  // const { user, token } = userState;
  // const isAdmin = user.admin;

  // useEffect(() => {
  //   const fetchAllData = async () => {
  //     await storeServices.fetchAllProducts();
  //     await storeServices.fetchAllCategories();
  //     await storeServices.fetchAllSubCategories();
  //     await shoppingCartServices.fetchUserShoppingCart(user._id);
  //   };
  //   if (token) {
  //     fetchAllData().then((res) => {
  //       if (res) {
  //         console.log(res);
  //       }
  //     }).catch((err) => {
  //       console.log({err});
  //     });
  //   }
  // }, [token, user._id]);

  return (
    <Header>
      {/* {!isAdmin && (
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
      )} */}
      head
    </Header>
  );
};

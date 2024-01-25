import { useEffect } from "react";
import { PersonalArea } from "./PersonalArea";
import { useSelector } from "react-redux";
import { shoppingCartServices } from "../../../services/shoppingCart-services";
import { Button, Col, Input, Layout, Row } from "antd";
import { storeServices } from "../../../services/store-services";
import { ordersServices } from "../../../services/orders-services";
import { Logo } from "../../../components/components/Logo";
import { CiMenuBurger } from "react-icons/ci";

const { Header } = Layout;

export const DashboardHeader = ({isOpen, setIsOpen}) => {
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
      <Row style={{width: '100%'}} justify={isAdmin ? 'start' : 'space-between'} align={'middle'} wrap>
        <Col span={6}>
          <Logo />
        </Col>
        {!isAdmin && (
          <>
            <Col sm={{span: 0}}>
              <Button type="link"><CiMenuBurger color="#08c" size={30} onClick={() => setIsOpen(!isOpen)} /></Button>
            </Col>

            <Col sm={{span: 10}} xs={{span: 0}} className="search">
              <Input placeholder="Search Products By Name Or ID" />
            </Col>

            <Col sm={{span: 8}} xs={{span: 0}} className="personal">
              <PersonalArea />
            </Col>
          </>
        )}
      </Row>
    </Header>
  );
};

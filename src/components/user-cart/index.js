import { useSelector } from "react-redux";
import "./userCart.css";
import { useEffect, useState } from "react";
import { Button, Card, Col, Row } from "antd";
import { CiEraser } from "react-icons/ci";
import { CartProductCard } from "./cart-product-card";

export const UserCart = () => {
  const [cartProducts, setCartProducts] = useState([]);
  const shoppingCart = useSelector((state) => state.shoppingCart);

  useEffect(() => {
    if (shoppingCart && shoppingCart?.products) {
      const cartProducts = shoppingCart.products;
      setCartProducts(cartProducts);
    };
  }, [shoppingCart]);

  const mainCardTitle = () => (
    <Row justify={'space-between'} align={'middle'}  style={{ padding: '0 5px' }}>
      <Col>
        {cartProducts.length > 0 && (
          <>
            <p>
              You have {cartProducts.length}
              {cartProducts.length === 1 ? ' product' : ' products'}
            </p>
          </>
        )}
      </Col>
      <Col>
        <Button size="large">
          <Row>
            <Col>
              Reset cart
            </Col>
            <Col>
              <CiEraser color="red"  style={{ marginLeft: '5px' }} size={25} />
            </Col>
          </Row>
        </Button>
      </Col>
    </Row>
  );

  return (
    <div className="user-cart-container mt-10">
      <Card title={mainCardTitle()} className="main-cart-product">
        {(cartProducts && cartProducts.length > 0) && (
          <div className="cart-products-list">
            {cartProducts.map((productInCart) => (
              <CartProductCard
                key={productInCart.product_id}
                productInCart={productInCart}
              />
            ))}
          </div>
        )}
      </Card>
    </div>
  );
};
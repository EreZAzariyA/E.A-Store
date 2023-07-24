import { Avatar, Button, Card, Col, Form, Image, Input, Row } from "antd";
import { useSelector } from "react-redux";
import "./cartProductCard.css";
import { useState } from "react";
import { numberWithCommas } from "../../../utils/helpers";


export const CartProductCard = ({productInCart}) => {
  const { product_id, shoppingCart_id, stock, totalPrice } = productInCart;
  const [amount, setAmount] = useState(stock);
  const product = useSelector((state) => state.products.find((p) => (p._id === product_id)));

  const handleAmountClick = (name) => {
    if (name === 'plus') {
      setAmount(amount + 1);
      return
    } else {
      if (amount === 1) return;
      setAmount(amount - 1);
    };
  };

  return (
    <Card
      type="inner"
      bordered={false}
      className="cart-product-card"
      headStyle={{ background: 'transparent' }}
      extra={<Button danger>X</Button>}
    >
      <Row align={'middle'} justify={'start'}>
        <Col span={4}>
          <Image
            preview={false}
            src={product.image_url}
            alt={`${product.name}-image`}
            className="cart-product-card-image"
          />
        </Col>

        <Col xs={{ span: 16 }} sm={{ span: 20 }} push={3} className="product-details">
    
          <Row align={'middle'}>
            <Col xs={{ span: 4 }} className="col-label">
              <p>SKU:</p>
            </Col>
            <Col xs={{ span: 20 }}>
              <p>{product_id.slice(0, product_id.length / 3)}</p>
            </Col>
          </Row>

          <Row align={'middle'}>
            <Col xs={{ span: 4 }} className="col-label">
              <p>Description:</p>
            </Col>
            <Col xs={{ span: 20 }}>
              <p>{product.description}</p>

            </Col>
          </Row>

          <Row align={'middle'}>
            <Col xs={{ span: 24 }} sm={{ span: 12 }}>
              <Row align={'middle'}>
                <Col xs={{ span: 4 }} className="col-label">
                  <p>Amount: </p>
                </Col>
                <Col xs={{ span: 20, push: 2 }}>
                  <div className="stock">
                    <div className="stock-wrapper">
                      <Button size="small" type="primary" onClick={() => handleAmountClick('plus')}>+</Button>
                      <Input size="small" disabled value={amount} />
                      <Button size="small" danger disabled={amount === 1} onClick={() => handleAmountClick('minus')}>-</Button>
                    </div>
                  </div>
                </Col>
              </Row>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 12 }}>
              <Row>
                <Col xs={{ span: 10 }} sm={{ span: 14 }} className="col-label">
                  <p>Price per one:</p>
                </Col>
                <Col xs={{ span: 14 }} sm={{ span: 10, pull: 3 }}>
                  <p>${numberWithCommas(product.price)}</p>
                </Col>
              </Row>
            </Col>
          </Row>

          <Row align={'middle'} justify={'center'}>
            <Col className="col-label" span={4}>Total price</Col>
            <Col span={20}>${(product.price * amount) || 0}</Col>
          </Row>
        </Col>
      </Row>
    </Card>
  );
};
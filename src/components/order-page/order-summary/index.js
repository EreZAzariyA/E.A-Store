import { useEffect, useState } from "react";
import { CustomDivider } from "../../components/Divider";
import { Col, Row, Table } from "antd";
import "./orderSummary.css";

export const OrderSummary = ({products}) => {
  const [subTotalPrice, setSubTotalPrice] = useState(0);
  const deliveryPrice = 0;

  useEffect(() => {
    for (let product of products) {
      setSubTotalPrice((perv) => perv + product?.totalPrice || 0);
    }
  }, []);

  const columns = [
    {
      title: "Product",
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: "Product ID",
      dataIndex: 'product_id',
      key: 'product_id',
    },
    {
      title: "Amount",
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: "Price per one",
      dataIndex: 'price',
      key: 'price',
      render: (value) => (
        <p>${value}</p>
      ),
    },
    {
      title: "TotalPrice",
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      render: (value) => (
        <p>${value}</p>
      ),
    },
  ];

  return (
    <div className="order-summary-container">
      <div className="order-summary-title">
        <span>order-summary</span>
      </div>
      <Table
        rowKey={'product_id'}
        columns={columns}
        dataSource={products}
        pagination={false}
      />

      <div className="sub-total mt-20">
        <Row justify={'space-between'}>
          <Col>
            <p>SubTotal</p>
          </Col>
          <Col>
            <p>${subTotalPrice}</p>
          </Col>
        </Row>

        <Row justify={'space-between'}>
          <Col>
            <p>Delivery Price</p>
          </Col>
          <Col>
            <p>${deliveryPrice}</p>
          </Col>
        </Row>
        <CustomDivider />
        <Row justify={'space-between'}>
          <Col>
            <p>Total</p>
          </Col>
          <Col>
            <p>${(subTotalPrice + deliveryPrice)}</p>
          </Col>
        </Row>
      </div>

      <div className="accept-terms">
        <span>* By pressing finish order i accept the terms of service</span>
      </div>
    </div>
  );
};
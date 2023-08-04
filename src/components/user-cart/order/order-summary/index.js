import { Col, Row, Table } from "antd";
import "./orderSummary.css";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { CustomDivider } from "../../../components/Divider";

export const OrderSummary = ({products}) => {
  const allProducts = useSelector((state) => state.products);
  const [cartProducts, setCartProducts] = useState([...products]);
  const [isTableLoading, setIsTableLoading] = useState(true);
  const [subTotalPrice, setSubTotalPrice] = useState(0);
  const [deliveryPrice, setDeliveryPrice] = useState(0);

  useEffect(() => {
    if (products && products?.length) {
      const updatedList = [];
      for (let product of products) {
        if ([...allProducts]?.find((p) => p._id === product.product_id)) {
          const fullPro = [...allProducts]?.find((p) => p._id === product.product_id);
          product = {
            ...product,
            ...fullPro
          };
          updatedList.push(product);
          setSubTotalPrice((perv) => perv += product?.totalPrice || 0);
        };
      };
      setCartProducts(updatedList);
      setIsTableLoading(false);
    };
  }, [allProducts, products]);

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
      dataIndex: 'stock',
      key: 'stock',
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
        dataSource={cartProducts}
        loading={isTableLoading}
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
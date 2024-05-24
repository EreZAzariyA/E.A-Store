import { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { AddToCartButton } from "../components/AddToCartButton";
import { numberWithCommas } from "../../utils/helpers";
import { Col, Image, InputNumber, Row, Spin, Tooltip } from "antd";
import { FcPaid, FcInTransit } from "react-icons/fc";
import "./productPage.css";
import { RemoveFromCartButton } from "../components/RemoveFromCartButton";

export const ProductPage = () => {
  const { product_id } = useParams();
  const shoppingCart = useSelector((state) => state.shoppingCart);
  const products = useSelector((state) => state.products);
  const product = [...products].find((pro) => pro._id === product_id);
  const isInCart = shoppingCart?.products.find((p) => p.product_id === product._id);
  const brands = useSelector((state) => (state.brands));
  const brand = brands.find((b) => b.name === product?.brand);
  const [amount, setAmount] = useState(1);
  let isAvailable = false;

  if (product) {
    isAvailable = product.stock > 0;

    return (
      <div className="product-page-container">
        <Row>
          <div className="product-name">
            <span>{product.name}</span>
          </div>
        </Row>
        <Row>
          <div className="product-id">
            <span>ID: </span>{product._id}
          </div>
        </Row>

        <br /><br />
        <Row align={'top'} gutter={[20, 0]} justify={"space-between"}>
          <Col md={{ span:10 }}>
            <div className="product-img">
              <Image preview={false} src={product.image_url} alt={product.name + ' img'} />
            </div>
            <div className="brand-img">
              <Image preview={false} src={brand?.image_url} alt={brand?.name + ' img'} />
            </div>
          </Col>

          <Col md={{ span: 12 }} xs={{ span: 24 }}>
            <div className="product-details">
              <div className="product-price">
                ${numberWithCommas(product.price) || 0}
              </div>
              <div className="product-availability">
                Branches availability:
                <br />
                <span>
                  {isAvailable ? 'This product is available ✅' : 'This product is unavailable ❌'}
                </span>
              </div>
              <div className="product-delivery-options">
                Pick up and delivery options
                <ul>
                  <li><FcPaid /> Collection from a branch</li>
                  <li><FcInTransit /> Delivery to the customer's home</li>
                </ul>
              </div>
              <div className="quantity">
                Quantity:
                <div className="d-flex justify-space-between align-items-center">
                  <InputNumber disabled={!isAvailable} size="small" min={1} max={10} defaultValue={isInCart?.amount || amount} onChange={(val) => setAmount(val)} />
                  {!isInCart && (
                    <AddToCartButton isDisabled={!isAvailable} product={product} shoppingCart_id={shoppingCart?._id} amount={amount} />
                  )}
                  {isInCart && (
                    <RemoveFromCartButton shoppingCart_id={shoppingCart?._id} product={product} />
                  )}
                  <span>c</span>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    );
  } else <Spin />
};
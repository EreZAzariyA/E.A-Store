import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button, Col, Image, InputNumber, Row, Spin } from "antd";
import "./productPage.css";
import { numberWithCommas } from "../../utils/helpers";
import { FcPaid, FcInTransit } from "react-icons/fc";

export const ProductPage = () => {
  const { product_id } = useParams();
  const products = useSelector((state) => state.products);
  const product = [...products].find((pro) => pro._id === product_id);
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
                <Row gutter={[10, 0]} justify={'space-between'}>
                  <Col span={8}>
                    <InputNumber min={1} max={10} defaultValue={3} />
                  </Col>
                  <Col span={8}><Button type="primary" style={{ background: 'orange', height: '60%' }}>Add To Cart</Button></Col>
                  <Col span={8}>c</Col>
                </Row>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    );
  } else <Spin />
};
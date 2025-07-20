import { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { AddToCartButton } from "../components/AddToCartButton";
import { numberWithCommas } from "../../utils/helpers";
import {
  Image,
  InputNumber,
  Spin,
  Row,
  Col,
  Card,
  Typography,
  Tag,
  List,
  Statistic,
  Space,
  Divider
} from "antd";
import { FcPaid, FcInTransit } from "react-icons/fc";
import { RemoveFromCartButton } from "../components/RemoveFromCartButton";

const { Title, Text } = Typography;

export const ProductPage = () => {
  const { product_id } = useParams();
  const shoppingCart = useSelector((state) => state.shoppingCart);
  const products = useSelector((state) => state.products);
  const product = [...products].find((pro) => pro._id === product_id);
  const isInCart = shoppingCart?.products.find((p) => p.product_id === product._id);
  const brands = useSelector((state) => (state.brands));
  const brand = brands.find((b) => b._id === product?.brand_id);
  const [amount, setAmount] = useState(1);
  let isAvailable = false;

  if (product) {
    isAvailable = product.stock > 0;

    return (
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: 24, backgroundColor: '#fafafa', minHeight: '100vh' }}>
        <Card style={{ marginBottom: 24 }}>
          <Title level={1} style={{ margin: '0 0 8px 0' }}>{product.name}</Title>
          <Text type="secondary">Product ID: {product._id}</Text>
        </Card>

        <Row gutter={32}>
          <Col xs={24} lg={12}>
            <Card>
              <Image
                preview={true}
                src={product.image_url}
                alt={product.name + ' img'}
                style={{ width: '100%', borderRadius: 12 }}
              />
              <Divider />
              <Space align="center">
                <Image
                  preview={false}
                  src={brand?.image_url}
                  alt={brand?.name + ' img'}
                  width={60}
                  style={{ borderRadius: 8, padding: 8, backgroundColor: 'white' }}
                />
                <div>
                  <Text type="secondary" style={{ fontSize: 12, display: 'block' }}>Brand</Text>
                  <Title level={5} style={{ margin: 0 }}>{brand?.name}</Title>
                </div>
              </Space>
            </Card>
          </Col>

          <Col xs={24} lg={12}>
            <Card>
              <Space direction="vertical" size="large" style={{ width: '100%' }}>
                <div>
                  <Statistic
                    title=""
                    value={numberWithCommas(product.price) || 0}
                    prefix="$"
                    valueStyle={{ fontSize: 36, fontWeight: 700, color: '#1890ff' }}
                  />
                </div>

                <Divider />

                <div>
                  <Title level={4}>Availability</Title>
                  <Tag
                    color={isAvailable ? 'success' : 'error'}
                    style={{ padding: '8px 16px', borderRadius: 20, fontSize: 14 }}
                  >
                    {isAvailable ? '✅ In Stock' : '❌ Out of Stock'}
                  </Tag>
                </div>

                <Divider />

                <div>
                  <Title level={4}>Delivery Options</Title>
                  <List
                    size="small"
                    dataSource={[
                      { icon: <FcPaid />, text: 'Collection from store' },
                      { icon: <FcInTransit />, text: 'Home delivery available' }
                    ]}
                    renderItem={(item) => (
                      <List.Item>
                        <Space>
                          {item.icon}
                          {item.text}
                        </Space>
                      </List.Item>
                    )}
                  />
                </div>

                <Divider />

                <div>
                  <Title level={4}>Description</Title>
                  <Text>{product.description}</Text>
                </div>

                <Divider />

                <div>
                  <Title level={4}>Quantity</Title>
                  <Space direction="vertical" style={{ width: '100%' }}>
                    <InputNumber
                      disabled={!isAvailable}
                      min={1}
                      max={10}
                      defaultValue={isInCart?.amount || amount}
                      onChange={(val) => setAmount(val)}
                      style={{ width: 120 }}
                    />
                    <Space wrap>
                      {!isInCart && (
                        <AddToCartButton isDisabled={!isAvailable} product={product} shoppingCart_id={shoppingCart?._id} amount={amount} />
                      )}
                      {isInCart && (
                        <RemoveFromCartButton shoppingCart_id={shoppingCart?._id} product={product} />
                      )}
                    </Space>
                  </Space>
                </div>
              </Space>
            </Card>
          </Col>
        </Row>
      </div>
    );
  } else <Spin />
};
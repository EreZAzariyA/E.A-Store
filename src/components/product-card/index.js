import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { shoppingCartServices } from "../../services/shoppingCart-services";
import { CustomDivider } from "../components/Divider";
import { RedHeartIcon, HeartIcon, brands } from "../../utils/helpers";
import { Button, Card, Col, Row, Tooltip } from "antd";
import BarChartOutlined from "@ant-design/icons/BarChartOutlined";
import ShoppingCartOutlined from "@ant-design/icons/ShoppingCartOutlined";
import DeleteOutlined from "@ant-design/icons/DeleteOutlined";
import "./productCard.css";

export const ProductCard = ({ product }) => {
  const shoppingCart = useSelector((state) => state.shoppingCart);
  const navigate = useNavigate();
  const [inCart, setInCart] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (shoppingCart?.products && shoppingCart?.favorites) {
      const isInCart = shoppingCart.products.some((pro) => (
        pro.product_id === product._id
      ));
      setInCart(isInCart);

      const isInFavorites = shoppingCart.favorites.some((pro) => (
        pro === product._id
      ));
      setIsFavorite(isInFavorites);
    }
  }, [shoppingCart, product]);

  const addProductHandler = async () => {
    const amount = 1;
    setInCart(true);
    try {
      await shoppingCartServices.addProductToCart(product._id, shoppingCart._id, amount);
    } catch (err) {
      console.log(err);
    }
  };

  const removeProductHandler = async () => {
    setInCart(false);
    try {
      await shoppingCartServices.removeProductFromCart(shoppingCart._id, product._id);
    } catch (err) {
      console.log(err);
    }
  };

  const favoritesHandler = async (name) => {
    try {
      if (name === 'remove') {
        await shoppingCartServices.removeProductFromFavorites(shoppingCart._id, product._id);
        setIsFavorite(false);
        return;
      }
      await shoppingCartServices.addProductToFavorites(product._id, shoppingCart._id);
      setIsFavorite(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Card
      className="card product-card"
      cover={
        <img
          alt={''}
          loading="lazy"
          src={product.image_url}
          onClick={() => navigate(`product/${product._id}`)}
        />
      }
    >
      <Row justify={'space-between'} align={'middle'}>
        <Col>
          <div className="logo">
            <img src={brands['samsung'].image_url} alt="" />
          </div>
        </Col>

        <Col>
          <Row gutter={5}>
            <Col>
            {isFavorite ? (
              <Tooltip title='Remove from favourites'>
                <Button shape="circle" size="small" onClick={() => favoritesHandler('remove')}>
                  <RedHeartIcon />
                </Button>
              </Tooltip>
            ) : (
              <Tooltip title='Add to favourites'>
                <Button shape="circle" size="small" onClick={() => favoritesHandler('add')}>
                  <HeartIcon />
                </Button>
              </Tooltip>
            )}
            </Col>

            <Col>
            <Tooltip title='Compare to other brands'>
              <Button shape="circle" size="small">
                <BarChartOutlined />
              </Button>
            </Tooltip>
            </Col>
          </Row>
        </Col>
      </Row>

      <Row>
        <Col>
          <p>
            <span>SKU: {product._id?.slice(0, product._id?.length / 3)}</span>
          </p>
        </Col>
      </Row>

      <Row style={{ height: '70px' }}>
        <Col>
          <p className="description-field">{product.description}</p>
        </Col>
      </Row>

      <Row justify={'end'}>
        <Col>
          <p>${product.price}</p>
        </Col>
      </Row>
      <CustomDivider />

      <Row justify={'start'} gutter={[10, 10]} className="mt-10">
        <Col>
          {inCart ? (
            <Tooltip title='Remove from cart'>
              <Button type="primary" style={{ background: 'red' }} onClick={removeProductHandler}>
                <DeleteOutlined style={{ fontSize: '16px' }} />
              </Button>
            </Tooltip>
          ) : (
            <Tooltip title='Add to cart'>
              <Button type="primary" style={{ background: 'orange' }} onClick={addProductHandler}>
                <ShoppingCartOutlined style={{ fontSize: '16px' }} />
              </Button>
            </Tooltip>
          )}
        </Col>
        <Col>
          <Tooltip title='Buy now'>
            <Button type="primary" style={{ background: 'green' }}>
              Buy now
            </Button>
          </Tooltip>
        </Col>
      </Row>
    </Card>
  );
};
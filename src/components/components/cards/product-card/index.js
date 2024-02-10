import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Tooltip, message } from "antd";
import BarChartOutlined from "@ant-design/icons/BarChartOutlined";
import ShoppingCartOutlined from "@ant-design/icons/ShoppingCartOutlined";
import DeleteOutlined from "@ant-design/icons/DeleteOutlined";
import { Brands, HeartIcon, RedHeartIcon, getShortID } from "../../../../utils/helpers";
import { shoppingCartServices } from "../../../../services/shoppingCart-services";
import "./productCard.css";

export const ProductCard = ({ product }) => {
  const user = useSelector((state) => state.auth?.user);
  const shoppingCart = useSelector((state) => state.shoppingCart);
  const navigate = useNavigate();
  const [inCart, setInCart] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const brand = Brands.find((b) => b.name === product.brand);

  useEffect(() => {
    if (shoppingCart) {
      const isInCart = shoppingCart.products.some((pro) => (
        pro.product_id === product._id
      ));
      setInCart(isInCart);

      const isInFavorites = shoppingCart.favorites.some((pro) => (
        pro === product._id
      ));
      setIsFavorite(isInFavorites);
    } else {
      setInCart(false);
      setIsFavorite(false);
    }
  }, [shoppingCart, product]);

  const addProductHandler = async () => {
    if (!user) {
      navigate('/auth/login');
      return;
    }
    try {
      await shoppingCartServices.addProductToCart(product._id, shoppingCart._id, 1);
      setInCart(true);
    } catch (err) {
      message.error(err.message);
    }
  };

  const removeProductHandler = async () => {
    try {
      await shoppingCartServices.removeProductFromCart(shoppingCart._id, product._id);
      setInCart(false);
    } catch (err) {
      message.error(err.message);
    }
  };

  const favoritesHandler = async (name) => {
    if (!user) {
      navigate('/auth/login');
      return;
    }
    try {
      if (name === 'remove') {
        await shoppingCartServices.removeProductFromFavorites(shoppingCart._id, product._id);
        setIsFavorite(false);
        return;
      }
      await shoppingCartServices.addProductToFavorites(product._id, shoppingCart._id);
      setIsFavorite(true);
    } catch (err) {
      message.error(err.message);
    }
  };

  return (
    <div className="product-card" onClick={() => navigate(`product/${product._id}`)}>
      <div className="product-img">
        <img src={product.image_url} alt={`${product.name}-img`} />
      </div>
      <div className="product-brand-fav-stat">
        <div className="product-fav-and-stat">
          <div className="fav">
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
          </div>
          <div className="statistic">
            <Tooltip title='Compare to other brands'>
              <Button shape="circle" size="small">
                <BarChartOutlined />
              </Button>
            </Tooltip>
          </div>
        </div>
        <div className="product-brand">
          <img src={brand.image_url} alt={brand.name + ' image'} />
        </div>
      </div>
      <div className="product-details">
        <div className="sku">SKU: {getShortID(product._id)}</div>
        <span className="product-name">{product.name}</span>
        <div className="product-description">
          <span className="muted-text">{product.description}</span>
        </div>
      </div>
        <div className="product-price">
          <span>${product.price || 0}</span>
        </div>
      <div className="product-card-footer">
        <div className="cart-btn">
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
        </div>
        <div className="buy-now-btn">
          <Tooltip title='Buy now'>
            <Button type="primary" style={{ background: 'green' }}>
              Buy now
            </Button>
          </Tooltip>
        </div>
      </div>
    </div>
  )
};
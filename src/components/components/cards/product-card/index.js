import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { shoppingCartServices } from "../../../../services/shoppingCart-services";
import { HeartIcon, RedHeartIcon, getShortID } from "../../../../utils/helpers";
import { Button, Tooltip, message } from "antd";
import BarChartOutlined from "@ant-design/icons/BarChartOutlined";
import ShoppingCartOutlined from "@ant-design/icons/ShoppingCartOutlined";
import DeleteOutlined from "@ant-design/icons/DeleteOutlined";
import "./productCard.css";

export const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth?.user);
  const shoppingCart = useSelector((state) => state.shoppingCart);
  const brands = useSelector((state) => (state.brands));
  const brand = brands.find((b) => b.name === product.brand);

  let isInCart = false;
  let isFavorite = false;
  if (shoppingCart) {
    const inCart = shoppingCart.products.some((pro) => (
      pro.product_id === product._id
    ));
    isInCart = inCart;

    const isInFavorites = shoppingCart.favorites.some((pro) => (
      pro === product._id
    ));
    isFavorite = isInFavorites
  } else {
    isInCart = false;
    isFavorite = false;
  }

  const addProductHandler = async () => {
    if (!user) {
      navigate('/auth/login');
    } else {
      try {
        await shoppingCartServices.addProductToCart(product._id, shoppingCart._id, 1);
        isInCart = true;
      } catch (err) {
        message.error(err.message);
      }
    }
  };

  const removeProductHandler = async () => {
    try {
      await shoppingCartServices.removeProductFromCart(shoppingCart._id, product._id);
      isInCart = false;
    } catch (err) {
      message.error(err.message);
    }
  };

  const favoritesHandler = async (name) => {
    if (!user) {
      navigate('/auth/login');
    } else {
      try {
        if (name === 'remove') {
          await shoppingCartServices.removeProductFromFavorites(shoppingCart._id, product._id);
          isFavorite = false;
          return;
        }
        await shoppingCartServices.addProductToFavorites(product._id, shoppingCart._id);
        isFavorite = true;
      } catch (err) {
        message.error(err.message);
      }
    }
  };

  return (
    <div className="product-card">
      <div className="product-img" onClick={() => navigate(`product/${product._id}`)}>
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
          <img src={brand?.image_url} alt={brand?.name + ' image'} />
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
          {isInCart ? (
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
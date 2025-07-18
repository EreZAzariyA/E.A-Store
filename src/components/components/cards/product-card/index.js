import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { shoppingCartServices } from "../../../../services/shoppingCart-services";
import { HeartIcon, RedHeartIcon, getShortID } from "../../../../utils/helpers";
import { Button, Tooltip, message } from "antd";
import BarChartOutlined from "@ant-design/icons/BarChartOutlined";
import ShoppingCartOutlined from "@ant-design/icons/ShoppingCartOutlined";
import DeleteOutlined from "@ant-design/icons/DeleteOutlined";
import { useState } from "react";
import "./productCard.css";

export const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth?.user);
  const shoppingCart = useSelector((state) => state.shoppingCart);
  const brands = useSelector((state) => (state.brands));
  const brand = brands.find((b) => b._id === product.brand_id);
  const isAvailable = product?.stock > 0;
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

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
        message.success('Product added to your shopping cart');
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
      <div className="product-img" onClick={() => navigate(`/category/${product?.category_id}/sub-category/${product?.subCategory_id}/product/${product?._id}`)}>
        <img src={product.image_url} alt={`${product.name}-img`} />
        <div className={`stock-badge ${!isAvailable ? 'out-of-stock' : ''}`}>
          {isAvailable ? 'In Stock' : 'Out of Stock'}
        </div>
      </div>

      <div className="product-content">
        <div className="product-header">
          <div className="product-brand">
            <img src={brand?.image_url} alt={brand?.name + ' image'} />
            <span className="product-brand-name">{brand?.name}</span>
          </div>
          <div className="product-actions">
            <div className="fav">
              {isFavorite ? (
                <Tooltip title='Remove from favourites'>
                  <Button shape="circle" size="small" className="fav-btn active" onClick={() => favoritesHandler('remove')}>
                    <RedHeartIcon />
                  </Button>
                </Tooltip>
              ) : (
                <Tooltip title='Add to favourites'>
                  <Button shape="circle" size="small" className="fav-btn" onClick={() => favoritesHandler('add')}>
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
        </div>

        <div className="product-details">
          <h3 className="product-name">{product.name}</h3>
          <div className="product-sku">SKU: {getShortID(product._id)}</div>
          <div className="product-description-container">
            <p className={`product-description ${isDescriptionExpanded ? 'expanded' : ''}`}>
              {product.description}
            </p>
            {product.description && product.description.length > 100 && (
              <button
                className="description-toggle"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsDescriptionExpanded(!isDescriptionExpanded);
                }}
              >
                {isDescriptionExpanded ? 'Show Less' : 'Show More'}
              </button>
            )}
          </div>
        </div>

        <div className="product-footer">
          <div className="product-price">
            <span className="currency">$</span>{product.price || 0}
          </div>
          <div className="product-cart-actions">
            <div className="cart-btn">
              {isInCart ? (
                  <Tooltip title='Remove from cart'>
                    <Button type="primary" className="remove-btn" onClick={removeProductHandler}>
                      <DeleteOutlined />
                    </Button>
                  </Tooltip>
                ) : (
                  <Tooltip title={isAvailable ? 'Add to cart' : 'This product is unavailable'}>
                    <Button disabled={!isAvailable} type="primary" onClick={addProductHandler}>
                      <ShoppingCartOutlined />
                    </Button>
                  </Tooltip>
                )}
            </div>
            <div className="buy-now-btn">
              <Tooltip title='Buy now'>
                <Button disabled type="primary">
                  Buy Now
                </Button>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { AddToCartButton } from "../components/AddToCartButton";
import { numberWithCommas } from "../../utils/helpers";
import { Image, InputNumber, Spin } from "antd";
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
  const brand = brands.find((b) => b._id === product?.brand_id);
  const [amount, setAmount] = useState(1);
  let isAvailable = false;

  if (product) {
    isAvailable = product.stock > 0;

    return (
      <div className="product-page-container">
        <div className="product-page-header">
          <h1 className="product-name">{product.name}</h1>
          <div className="product-id">
            <span>Product ID: </span>{product._id}
          </div>
        </div>

        <div className="product-page-content">
          <div className="product-image-section">
            <div className="product-image-container">
              <Image preview={true} src={product.image_url} alt={product.name + ' img'} />
            </div>
            <div className="brand-section">
              <Image preview={false} src={brand?.image_url} alt={brand?.name + ' img'} />
              <div className="brand-info">
                <p className="brand-label">Brand</p>
                <h4 className="brand-name">{brand?.name}</h4>
              </div>
            </div>
          </div>

          <div className="product-details-section">
            <div className="product-price-section">
              <div className="product-price">
                <span className="currency">$</span>{numberWithCommas(product.price) || 0}
              </div>
            </div>

            <div className="product-availability">
              <h3>Availability</h3>
              <div className={`availability-badge ${isAvailable ? 'in-stock' : 'out-of-stock'}`}>
                {isAvailable ? (
                  <>
                    <span>✅</span>
                    <span>In Stock</span>
                  </>
                ) : (
                  <>
                    <span>❌</span>
                    <span>Out of Stock</span>
                  </>
                )}
              </div>
            </div>

            <div className="product-delivery-options">
              <h3>Delivery Options</h3>
              <ul className="delivery-options-list">
                <li><FcPaid /> Collection from store</li>
                <li><FcInTransit /> Home delivery available</li>
              </ul>
            </div>

            <div className="product-description">
              <h3>Description</h3>
              <p>{product.description}</p>
            </div>

            <div className="quantity-section">
              <h3>Quantity</h3>
              <div className="quantity-controls">
                <InputNumber
                  disabled={!isAvailable}
                  min={1}
                  max={10}
                  defaultValue={isInCart?.amount || amount}
                  onChange={(val) => setAmount(val)}
                />
                <div className="action-buttons">
                  {!isInCart && (
                    <AddToCartButton isDisabled={!isAvailable} product={product} shoppingCart_id={shoppingCart?._id} amount={amount} />
                  )}
                  {isInCart && (
                    <RemoveFromCartButton shoppingCart_id={shoppingCart?._id} product={product} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else <Spin />
};
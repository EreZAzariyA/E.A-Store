import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { UserCartFooter } from "./cart-footer";
import { Order } from "./order";
import { CartProductCard } from "./cart-product-card";
import { shoppingCartServices } from "../../services/shoppingCart-services";
import { numberWithCommas } from "../../utils/helpers";
import { Button, Card, Modal, message } from "antd";
import ExclamationCircleFilled from '@ant-design/icons/ExclamationCircleFilled'
import { CiEraser } from "react-icons/ci";
import "./userCart.css";

const { confirm } = Modal;

const Steps = {
  CREATE_ORDER: "CREATE_ORDER",
  UPDATE_ORDER: "UPDATE_ORDER",
};

export const UserCart = () => {
  const shoppingCart = useSelector((state) => state.shoppingCart);
  const [cartProducts, setCartProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [step, setStep] = useState(null);
  const [order, setOrder] = useState(null);

  useEffect(() => {
    if (shoppingCart && shoppingCart?.products) {
      const cartProducts = shoppingCart.products;
      calculateTotals(cartProducts);
      setCartProducts(cartProducts);
    };
  }, [shoppingCart]);

  const calculateTotals = (products) => {
    let total = 0;
    [...products].forEach((product) => {
      total += product.totalPrice;
    });
    setTotalPrice(total);
  };

  const onRest = () => {
    confirm({
      title: "Are you sure you want to delete those items?",
      icon: <ExclamationCircleFilled />,
      content: `You have ${shoppingCart.products?.length || 0} items`,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: onResetConfirm,
    });
  };

  const onResetConfirm = async () => {
    try {
      await shoppingCartServices.resetCart(shoppingCart?._id);
      message.success('Shopping cart reset success');
    } catch (err) {
      message.error({
        content: `Some error with, ${err}`
      });
    }
  };

  const onStockUpdate = async (product_id, amount, newTotalPrice) => {
    try {
      await shoppingCartServices.updateStockInCart(shoppingCart?._id, product_id, amount, newTotalPrice);
    } catch (err) {
      console.log(err);
    }
  };

  const mainCardTitle = () => (
    <div className="head-container">
      <div className="left">
        <p>
          You have {cartProducts.length}
          {cartProducts.length === 1 ? ' item' : ' items'}
        </p>
      </div>

      <div className="right">
        <Button
          size="large"
          disabled={!shoppingCart.products?.length}
          danger
          type="primary"
          className="reset-cart-btn"
          onClick={onRest}
        >
          Reset cart
          <CiEraser style={{ marginLeft: '5px' }} size={25} />
        </Button>
      </div>
    </div>
  );

  const onCreateOrder = () => {
    setStep(Steps.CREATE_ORDER);
  };

  const onBack = () => {
    setStep(null);
  };

  return (
    <div className="user-cart-container mt-10">
      {!step && (
        <>
          <Card title={mainCardTitle()} className="main-cart-product">
            {(cartProducts && cartProducts.length > 0) && (
              <div className="cart-products-list">
                {cartProducts.map((productInCart) => (
                  <CartProductCard
                    key={productInCart.product_id}
                    productInCart={productInCart}
                    onStockUpdate={onStockUpdate}
                  />
                ))}
              </div>
            )}

            <div className="footer">
              <div className="subtotal-container">
                <span>Subtotal</span>
                <span>${numberWithCommas(totalPrice)}</span>
              </div>
            </div>
          </Card>
          {(cartProducts && cartProducts.length > 0) && (
            <div className="user-cart-footer">
              <UserCartFooter onCreateOrder={onCreateOrder} />
            </div>
          )}
        </>
      )}

      {(step === Steps.CREATE_ORDER) && (
        <Order
          products={cartProducts}
          onBack={onBack}
        />
      )}
      {(step === Steps.UPDATE_ORDER) && (
        <Order
          order={order}
          products={cartProducts}
          onBack={onBack}
        />
      )}
    </div>
  );
};
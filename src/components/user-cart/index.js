import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { UserCartFooter } from "./cart-footer";
import { Order } from "../order-page";
import { CartProductCard } from "./cart-product-card";
import { shoppingCartServices } from "../../services/shoppingCart-services";
import { OrdersStatus, calculateTotals, numberWithCommas } from "../../utils/helpers";
import { Button, Card, Modal, message } from "antd";
import { CiEraser } from "react-icons/ci";
import ExclamationCircleFilled from '@ant-design/icons/ExclamationCircleFilled'
import "./userCart.css";

const { confirm } = Modal;

const Steps = {
  CREATE_ORDER: "CREATE_ORDER",
  UPDATE_ORDER: "UPDATE_ORDER",
};

export const UserCart = () => {
  const shoppingCart = useSelector((state) => state.shoppingCart);
  const orders = useSelector((state) => state.orders);
  const [order, setOrder] = useState(null);
  const [step, setStep] = useState(null);
  const cartProducts = shoppingCart?.products || [];
  const totalPrice = calculateTotals(cartProducts);

  useEffect(() => {
    if (orders && orders.length) {
      const paddingOrders = [...orders].filter((o) => o.status === OrdersStatus.PENDING);
      const latestOrder = [...paddingOrders].sort((a, b) => b.createdAt > a.createdAt)?.[0] || null;
      setOrder(latestOrder);
    }
  }, [orders]);

  const onRest = () => {
    confirm({
      title: "Are you sure you want to delete those items?",
      icon: <ExclamationCircleFilled />,
      content: `You have ${cartProducts.length || 0} items`,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: onResetConfirm,
    });
  };

  const onResetConfirm = async () => {
    try {
      const updatedCart = await shoppingCartServices.resetCart(shoppingCart?._id);
      if (updatedCart) {
        message.success('Shopping cart reset success');
      }
    } catch (err) {
      message.error(`Some error with, ${err}`);
      return err;
    }
  };

  const onStockUpdate = async (product_id, amount, newTotalPrice) => {
    try {
      await shoppingCartServices.updateStockInCart(shoppingCart?._id, product_id, amount, newTotalPrice);
    } catch (err) {
      console.log(err);
    }
  };

  const handleStepChange = (step) => {
    setStep(step);
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
          disabled={!cartProducts.length}
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
            <>
              <div className="user-cart-footer">
                <UserCartFooter
                  order={order}
                  onCreateOrder={() => handleStepChange(Steps.CREATE_ORDER)}
                  onUpdateOrder={() => handleStepChange(Steps.UPDATE_ORDER)}
                />
              </div>
            </>
          )}
        </>
      )}

      {(step === Steps.CREATE_ORDER) && (
        <Order
          products={cartProducts}
          onBack={() => handleStepChange(null)}
        />
      )}

      {(step === Steps.UPDATE_ORDER) && (
        <Order
          order={order}
          products={cartProducts}
          onBack={() => handleStepChange(null)}
        />
      )}
    </div>
  );
};
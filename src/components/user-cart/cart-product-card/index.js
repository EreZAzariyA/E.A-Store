import { useState } from "react";
import { useSelector } from "react-redux";
import { numberWithCommas } from "../../../utils/helpers";
import { shoppingCartServices } from "../../../services/shoppingCart-services";
import { Button, Card, Image, Input, Popconfirm, message } from "antd";
import "./cartProductCard.css";

export const CartProductCard = ({ productInCart, onStockUpdate }) => {
  const shoppingCart = useSelector((state) => state.shoppingCart);
  const [amount, setAmount] = useState(productInCart.amount);
  const [newTotalPrice, setNewTotalPrice] = useState(productInCart.totalPrice);

  const handleAmountClick = (name) => {
    let newAmount = 0;

    switch (name) {
      case 'plus':
        newAmount = amount + 1;
        break;
      case 'minus':
        newAmount = amount - 1;
        break;
    }
    setAmount(newAmount);
    const subTotalPrice = (productInCart?.price * newAmount).toFixed(2);
    setNewTotalPrice(subTotalPrice);
    onStockUpdate(productInCart.product_id, newAmount, subTotalPrice);
  };

  const removeProductFromCart = async () => {
    try {
      const res = await shoppingCartServices.removeProductFromCart(shoppingCart._id, productInCart.product_id);
      if (res) {
        message.info(`Product ${productInCart.name} removed from your cart`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Card
      type="inner"
      bordered={false}
      className="cart-product-card"
      headStyle={{ background: 'transparent' }}
    >
      <div className="remove-btn">
        <Popconfirm
          title="Are you sure?"
          onConfirm={removeProductFromCart}
        >
          <Button type="text" danger>X</Button>
        </Popconfirm>
      </div>
      <div className="left">
        <div className="card-image">
          <Image
            preview={false}
            src={productInCart?.image_url}
            alt={`${productInCart?.name}-image`}
          />
        </div>
      </div>
      <div className="right">
        <div className="details">
          <div className="field sku-field">
            <p>
              <span className="label">SKU: </span>
              <span>{productInCart.product_id.slice(0, productInCart.product_id.length / 3)}</span>
            </p>
          </div>
          <div className="field description-field">
            <p>
              <span>{productInCart?.description} Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquam numquam nesciunt animi, exercitationem consequuntur quasi ullam, nisi, incidunt culpa similique expedita temporibus alias. Repellendus velit nobis deleniti! Ipsa, fugit tenetur!</span>
            </p>
          </div>
          <div className="field prices-fields">
            <div className="prices-left">
              <div className="label">
                <span>Amount: </span>
              </div>
              <div className="stock-wrapper">
                <Button size="small" type="primary" onClick={() => handleAmountClick('plus')}>+</Button>
                <Input size="small" disabled value={amount} />
                <Button size="small" danger disabled={amount === 1} onClick={() => handleAmountClick('minus')}>-</Button>
              </div>
            </div>
            <div className="prices-center">
              <p>
                <span className="label">Price per unit: </span>
                <span>${numberWithCommas(productInCart?.price)}</span>
              </p>
            </div>
            <div className="prices-right">
              <p>
                <span className="label">Total price: </span>
                <span>${numberWithCommas(newTotalPrice)}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
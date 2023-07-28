import { useState } from "react";
import { useSelector } from "react-redux";
import { numberWithCommas } from "../../../utils/helpers";
import { shoppingCartServices } from "../../../services/shoppingCart-services";
import { Button, Card, Image, Input, Popconfirm } from "antd";
import "./cartProductCard.css";

export const CartProductCard = ({ productInCart, onStockUpdate }) => {
  const { product_id, shoppingCart_id, stock, totalPrice } = productInCart;
  const product = useSelector((state) => state.products.find((p) => (p._id === product_id)));

  const [amount, setAmount] = useState(stock);
  const [newTotalPrice, setNewTotalPrice] = useState(totalPrice);

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
    setNewTotalPrice(product?.price * newAmount);
    onStockUpdate(product_id, newAmount, product?.price * newAmount);
  };

  const removeProductFromCart = async () => {
    try {
      await shoppingCartServices.removeProductFromCart(shoppingCart_id, product_id);
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
            src={product?.image_url}
            alt={`${product?.name}-image`}
          />
        </div>
      </div>
      <div className="right">
        <div className="details">
          <div className="field sku-field">
            <p>
              <span className="label">SKU: </span>
              <span>{product_id.slice(0, product_id.length / 3)}</span>
            </p>
          </div>
          <div className="field description-field">
            <p>
              <span>{product?.description} Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquam numquam nesciunt animi, exercitationem consequuntur quasi ullam, nisi, incidunt culpa similique expedita temporibus alias. Repellendus velit nobis deleniti! Ipsa, fugit tenetur!</span>
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
                <span>${numberWithCommas(product?.price)}</span>
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
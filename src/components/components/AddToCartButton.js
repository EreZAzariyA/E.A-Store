import { shoppingCartServices } from "../../services/shoppingCart-services";
import { message, notification } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons"
import { NotificationConfig, NotificationMessages } from "../../utils/helpers";

export const AddToCartButton = ({isDisabled, product, shoppingCart_id, amount}) => {

  const onClickHandler = async () => {
    try {
      await shoppingCartServices.addProductToCart(product._id, shoppingCart_id, amount);
      notification.success({
        message: NotificationMessages.PRODUCT_ADDED_TO_CART_SUCCESS,
        placement: NotificationConfig.placement,
        duration: NotificationConfig.duration,
        description: `${amount} X ${product.name} Added Successfully.`
      })
    } catch (err) {
      message.error(err.message);
    }
  };

  return (
    <button
      disabled={isDisabled}
      onClick={onClickHandler}
      className={`add-to-cart-btn ${isDisabled ? 'not-allowed' : ''}`}
    >
      <ShoppingCartOutlined style={{ fontSize: '25px'}} /> Add To Cart
    </button>
  );
};
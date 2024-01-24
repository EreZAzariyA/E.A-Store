import { shoppingCartServices } from "../../services/shoppingCart-services";
import { notification } from "antd";
import { NotificationConfig, NotificationMessages } from "../../utils/helpers";
import { CiCircleRemove } from "react-icons/ci";

export const RemoveFromCartButton = ({ shoppingCart_id, product }) => {

  const onClickHandler = async () => {
    try {
      await shoppingCartServices.removeProductFromCart(shoppingCart_id, product._id);
      notification.error({
        message: NotificationMessages.PRODUCT_REMOVED_FROM_CART_SUCCESS,
        placement: NotificationConfig.placement,
        duration: NotificationConfig.duration,
        description: `${product.name} Successfully Removed`
      })
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <button
      onClick={onClickHandler}
      className='remove-from-cart-btn'
    >
      <CiCircleRemove style={{ fontSize: '25px'}} /> Remove From Cart
    </button>
  );
};
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { shoppingCartServices } from "../../services/shoppingCart-services";
import { NotificationConfig, NotificationMessages } from "../../utils/helpers";
import { Button, Tooltip, notification } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons"

export const AddToCartButton = ({isDisabled, product, shoppingCart_id, amount}) => {
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth?.token);
  const user = token ? true : false;

  const onClickHandler = async () => {
    if (!user) {
      navigate('/auth/login')
    } else {
      try {
        await shoppingCartServices.addProductToCart(product._id, shoppingCart_id, amount);
        notification.success({
          message: NotificationMessages.PRODUCT_ADDED_TO_CART_SUCCESS,
          placement: NotificationConfig.placement,
          duration: NotificationConfig.duration,
          description: `${amount} X ${product.name} Added Successfully.`
        })
      } catch (err) {
        console.log(err.message);
      }
    }
  };

  return (
    <Tooltip title={isDisabled ? 'We Sorry, this product is unavailable right now' : ''}>
      <Button
        type="text"
        disabled={isDisabled}
        onClick={onClickHandler}
        className={`add-to-cart-btn ${isDisabled ? 'not-allowed' : ''}`}
      >
        <ShoppingCartOutlined style={{ fontSize: '25px'}} /> Add To Cart
      </Button>
    </Tooltip>
  );
};
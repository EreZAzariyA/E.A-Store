import { useParams } from "react-router-dom";


const OrderDetails = () => {
  const { order_id } = useParams();

  console.log(order_id);

  return (
    <p>asfd</p>
  );
};

export default OrderDetails;
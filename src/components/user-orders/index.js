import { Card } from "antd";
import { useSelector } from "react-redux";
import { OrderCard } from "./order-card";

export const UserOrders = () => {
  const orders = useSelector((state) => state.orders);

  return (
    <Card>
      {[...orders]?.map((order) => (
        <OrderCard key={order._id} order={order} />
      ))}
    </Card>
  )
};
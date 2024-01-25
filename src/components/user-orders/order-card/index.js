import { Card, Typography } from "antd";
import "./order-card.css";
import moment from "moment";

export const OrderCard = ({order}) => {
  console.log(order);
  return (
    <Card
      type="inner"
      title={<Typography.Text style={{ float: 'left' }}>{moment(order.createdAt).format('LLLL')}</Typography.Text>}
    >
      asdasd
    </Card>
  );
};
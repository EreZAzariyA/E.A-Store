import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';
import Timer from './Timer';

export const ResultView = ({createdOrder}) => {
  const navigate = useNavigate();

  return (
    <Result
      status={'success'}
      title="Successfully Purchased On E.A-Store!"
      subTitle={`Order id: ${createdOrder.order_details.orderID} Successfully Sent. Estimated arrival time 5 - 9 business days, please be patient.`}
      extra={[
        <Button type="primary" key={'home'} onClick={() => navigate('/')}>
          Go Home
        </Button>,
        <Timer key={'date'} targetDate={createdOrder.arrival_date}/>
      ]}
    />
  );
};
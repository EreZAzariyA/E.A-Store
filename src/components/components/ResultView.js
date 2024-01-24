import { Button, Result } from 'antd';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Timer from './Timer';

export const ResultView = ({createdOrder}) => {
  const [remainingTime, setRemainingTime] = useState(moment.duration());
  const navigate = useNavigate();

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = moment();
      const endDate = moment(createdOrder.arrival_date);
      const duration = moment.duration(endDate.diff(now));

      setRemainingTime(duration);

      if (duration.asSeconds() <= 0) {
        clearInterval(intervalId);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [createdOrder.arrival_date]);

  const formatTime = (value) => {
    return value < 10 ? `0${value}` : value;
  };

  return (
    <Result
      status={'success'}
      title="Successfully Purchased On E.A-Store!"
      subTitle={`Order id: ${createdOrder.order_details.orderID} Successfully Sent. Estimated arrival time 5 - 9 business days, please be patient.`}
      extra={[
        <Button type="primary" onClick={() => navigate('/')}>
          Go Home
        </Button>,
        <Timer targetDate={createdOrder.arrival_date}/>
      ]}
    />
  );
};
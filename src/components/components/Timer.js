import React, { useEffect, useState } from 'react';
import moment from 'moment';

const Timer = ({ targetDate }) => {
  const [remainingTime, setRemainingTime] = useState(moment.duration());

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = moment();
      const endDate = moment(targetDate);
      const duration = moment.duration(endDate.diff(now));

      setRemainingTime(duration);

      if (duration.asSeconds() <= 0) {
        clearInterval(intervalId);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [targetDate]);

  const formatTime = (value) => {
    return value < 10 ? `0${value}` : value;
  };

  return (
    <div>
      <p>
        {formatTime(remainingTime.days())}d {formatTime(remainingTime.hours())}h{' '}
        {formatTime(remainingTime.minutes())}m {formatTime(remainingTime.seconds())}s
      </p>
    </div>
  );
};

export default Timer;

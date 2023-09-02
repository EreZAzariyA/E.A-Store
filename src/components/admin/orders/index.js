import { useEffect, useState } from "react";
import adminOrdersServices from "../../../services/admin/orders-services";


export const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    adminOrdersServices.fetchAllOrders().then((orderss) => {
      console.log(orderss);
      setOrders(orderss);
    });
  }, []);


  return (
    <p>orders</p>
  );
};
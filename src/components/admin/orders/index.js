import { useEffect, useState } from "react";
import adminOrdersServices from "../../../services/admin/orders-services";


export const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    adminOrdersServices.fetchAllOrders().then((allOrders) => {
      console.log(allOrders);
      setOrders(allOrders);
    });
  }, []);


  return (
    <p>orders</p>
  );
};
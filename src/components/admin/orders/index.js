import { useEffect, useState } from "react";
import adminOrdersServices from "../../../services/admin/orders-services";
import { Space, Table } from "antd";

export const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getAllOrders = async () => {
      const orders = await adminOrdersServices.fetchAllOrders();
      if (orders) {
        setOrders(orders);
      }
    }

    getAllOrders();
  }, []);

  const columns = [
    {
      title: 'User',
      key: 'user',
      fixed: 'left',
      dataIndex: 'user_details',
      render: (val) => (
        <p>{val.email}</p>
      ),
      sorter: (a, b) => (a.email.localeCompare(b.email))
    },
  ];

  return (
    <Space>
      <Table columns={columns} dataSource={orders} rowKey={'_id'} />
    </Space>
  );
};
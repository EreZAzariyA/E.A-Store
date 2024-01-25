import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import adminOrdersServices from "../../services/admin/orders-services";
import { ordersServices } from "../../services/orders-services";
import { calculateTotals, getShortID, isAdmin } from "../../utils/helpers";
import { Popconfirm, Space, Table, Typography } from "antd";
import moment from "moment";
import Timer from "../components/Timer";


export const Orders = () => {
  const [orders, setOrders] = useState([]);
  const user = useSelector((state) => state.auth?.user);
  const isAdminValidate = isAdmin(user);

  const getTimeToCancel = (targetDate) => {
    return moment(targetDate).add(1, 'day').valueOf();
  };
  const isCancelAvailable = (lastCancelDate) => {
    return moment().valueOf() < lastCancelDate;
  }

  useEffect(() => {
    if (isAdminValidate) {
      adminOrdersServices.fetchAllOrders().then((allOrders) => {
        setOrders(allOrders);
      });
    } else {
      ordersServices.fetchUserOrdersByUser_id(user?._id).then((userOrders) => {
        setOrders(userOrders);
      })
    }
  }, [isAdminValidate, user]);

  const handleDelete = () => {

  };

  const columns = [
    {
      title: 'Order ID',
      key: 'order_id',
      dataIndex: '_id',
      render: (val) => (getShortID(val))
    },
    {
      title: 'Order Date',
      key: 'date',
      dataIndex: 'createdAt',
      render: (val) => (
        <p>{moment(val).format('llll')}</p>
      ),
      sorter: (a, b) => (a.email.localeCompare(b.email))
    },
    {
      title: 'Shopping-Cart ID',
      key: 'shoppingCart_id',
      dataIndex: 'shoppingCart_id',
      render: (val) => (getShortID(val))
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
    },
    {
      title: 'Price',
      key: 'price',
      render: (val) => (<span>${calculateTotals(val.products)}</span>)
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (record) => {
        const targetDate = getTimeToCancel(record.createdAt);
        const cancelAvailable = isCancelAvailable(targetDate);

        if (isAdminValidate) {

        } else {
          return (
            <>
              {cancelAvailable && (
                <>
                  <span>Time to cancel</span>
                  <Timer targetDate={targetDate} />
                </>
              )}
              <Popconfirm title="Sure to cancel?" onConfirm={() => handleDelete(record)}>
                <Typography.Link disabled={!cancelAvailable}>Cancel Order</Typography.Link>
              </Popconfirm>
            </>
          );
        }
      }
    },
  ];


  return (
    <Space direction="vertical" className="w-100" >
      <Table
        columns={columns}
        dataSource={orders}
        rowKey={'_id'}
        scroll={{ x: 800}}
      />
    </Space>
  );
};
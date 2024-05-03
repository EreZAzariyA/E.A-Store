import { useSelector } from "react-redux";
import { ordersServices } from "../../services/orders-services";
import { OrdersStatus, calculateTotals, getShortID, isAdmin } from "../../utils/helpers";
import { Popconfirm, Space, Table, Typography } from "antd";
import moment from "moment";
import Timer from "../components/Timer";


export const Orders = () => {
  const orders = useSelector((state) => state.orders);
  const user = useSelector((state) => state.auth?.user);
  const isAdminValidate = isAdmin(user);

  const getTimeToCancel = (targetDate) => {
    return moment(targetDate).add(1, 'day').valueOf();
  };
  const isCancelAvailable = (lastCancelDate) => {
    return moment().valueOf() < lastCancelDate;
  }

  const handleApprove = async (order_id, status) => {
    try {
      await ordersServices.updateOrderStatus(order_id, status);
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleCancel = async (order_id) => {
    try {
      await ordersServices.updateOrderStatus(order_id, OrdersStatus.CANCELLED);
    } catch (err) {
      console.log(err.message);
    }
  };

  const actionsPanel = (record) => {
    const targetDate = getTimeToCancel(record.createdAt);
    const isOptionsAvailable = record.status === OrdersStatus.PENDING;
    const cancelAvailable = isCancelAvailable(targetDate) || isOptionsAvailable;
    const orderIsSent = record.status === OrdersStatus.SENT;
    const canceled = record.status === OrdersStatus.CANCELLED;

    if (isAdminValidate) {
      return <AdminPanel record={record} isOptionsAvailable={isOptionsAvailable} />
    } else {
      return (
        <>
          {canceled && 'Order Canceled'}
          {!canceled && !orderIsSent && cancelAvailable && (
            <>
              <span>Time To Cancel</span>
              <Timer targetDate={targetDate} />
            </>
          )}
          {orderIsSent && `Arrival Date: ${moment(record?.arrival_date).format('LL')} `}
          {isOptionsAvailable && (
            <Popconfirm title="Sure to cancel?" onConfirm={() => handleCancel(record._id)}>
              <Typography.Link disabled={!cancelAvailable}>Cancel Order</Typography.Link>
            </Popconfirm>
          )}
        </>
      );
    }
  };

  const AdminPanel = ({record, isOptionsAvailable}) => {
    console.log(isOptionsAvailable);

    if (!isOptionsAvailable) {
      return (
        <p>Order {record.status?.toLowerCase()}</p>
      )
    }
    return (
      <Space>
        <Typography.Link onClick={() => handleApprove(record._id, OrdersStatus.SENT)}>Approve</Typography.Link>
        <Popconfirm title="Sure to cancel?" onConfirm={() => handleCancel(record._id)}>
          <Typography.Link type="danger">Cancel</Typography.Link>
        </Popconfirm>
      </Space>
    );
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
      render: actionsPanel
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
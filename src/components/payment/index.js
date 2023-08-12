import { Button, Popconfirm } from "antd";


export const Payment = ({createdOrder, order, onBack}) => {

  console.log(createdOrder, order);

  return (
    <>
    <Popconfirm
      onConfirm={onBack}
    >
      <Button type="link">Back</Button>
    </Popconfirm>
      <p>payment</p>
    </>
  );
};
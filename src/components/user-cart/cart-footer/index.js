import { Button, Col, Modal, Row } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const FooterButtons = {
  KeepShopping: 'KeepShopping',
  Continue: 'Continue',
  Update: 'Update',
  UserCoupon: 'UserCoupon',
}

export const UserCartFooter = (props) => {
  const { order, onCreateOrder, onUpdateOrder } = props;
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleButton = (name) => {
    switch (name) {
      case FooterButtons.KeepShopping:
        navigate('/home');
      break;
      case FooterButtons.UserCoupon:
        setOpen(true);
      break;
      case FooterButtons.Continue:
        onCreateOrder();
      break;
      case FooterButtons.Update:
        onUpdateOrder();
      break;
    }
  };

  const handleModelOkClick = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  return (
    <>
      <Row gutter={[20, 10]} justify={'center'}>
        <Col md={{ span: 6 }} xs={{ span: 12 }}>
          <Button onClick={() => handleButton(FooterButtons.KeepShopping)}>Keep Shopping</Button>
        </Col>

        <Col md={{ span: 12, order: 0 }} xs={{ span: 24, order: 1 }}>
          {order ?
            <Button onClick={() => handleButton(FooterButtons.Update)}>Update Your Last Purchase</Button>
          :
            <Button onClick={() => handleButton(FooterButtons.Continue)}>Continue To Order Payment</Button>
          }
        </Col>

        <Col md={{ span: 6 }} xs={{ span: 12 }}>
          <Button onClick={() => handleButton(FooterButtons.UserCoupon)}>Use Coupon</Button>
        </Col>
      </Row>
      <Modal
        title="Title"
        open={open}
        onOk={handleModelOkClick}
        confirmLoading={confirmLoading}
        onCancel={() => setOpen(false)}
      />
    </>
  );
};
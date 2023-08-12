import { useState } from "react";
import { CreditCard } from "../components/credit-card";
import { Button, DatePicker, Form, Input, Popconfirm } from "antd";
import { CREDIT_CARD_NUMBER_MAX_LENGTH } from "../../utils/helpers";
import "./payment.css";

const Focus = {
  Front: 'Front',
  Back: 'Back'
};

export const Payment = ({createdOrder, order, onBack}) => {
  const [initialValues, setInitialValues] = useState({
    number: '',
    name: '',
    date: '',
    cvc: '',
    focus: Focus.Front
  });

  const handleChange = (value, name) => {

    setInitialValues({
      ...initialValues,
      [name]: value ?? ''
    });
  }

  const onFocus = (name) => {
    if (name === 'cvc') {
      setInitialValues({...initialValues, focus: Focus.Back})
    } else {
      setInitialValues({...initialValues, focus: Focus.Front})
    }
  };

  const onFinish = (values) => {
    console.log(values);
  };

  return (
    <div className="payment-container">
      <p>payment</p>
      <div className="back-btn">
        <Popconfirm
          onConfirm={onBack}
        >
          <Button type="link">Back</Button>
        </Popconfirm>
      </div>

      <CreditCard {...initialValues} />

      <Form
        className="mt-20"
        initialValues={initialValues}
        onFinish={onFinish}
      >
        <Form.Item name={'name'} label="Card Holder Name">
          <Input allowClear type="text" placeholder="Card holder name" onChange={(e) => handleChange(e.target.value, 'name')} onFocus={() => onFocus('name')} />
        </Form.Item>

        <Form.Item name={'number'} label="Card Number">
          <Input allowClear type="tel" placeholder={initialValues.number} maxLength={CREDIT_CARD_NUMBER_MAX_LENGTH} onChange={(e) => handleChange(e.target.value, 'number')} onFocus={() => onFocus('number')} />
        </Form.Item>

        <Form.Item name={'date'} label="Expire-Date">
          <DatePicker picker="month" onChange={(date) => handleChange(date, 'date')} onFocus={() => onFocus('date')} />
        </Form.Item>

        <Form.Item name={'cvc'} label="CVC">
          <Input allowClear type="tel" maxLength={3} onChange={(e) => handleChange(e.target.value, 'cvc')} onFocus={() => onFocus('cvc')} />
        </Form.Item>

      </Form>
    </div>
  );
};
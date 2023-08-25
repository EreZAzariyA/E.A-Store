import { useState } from "react";
import { CreditCard } from "../components/credit-card";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer
} from "@paypal/react-paypal-js";
import { CREDIT_CARD_NUMBER_MAX_LENGTH } from "../../utils/helpers";
import { Button, DatePicker, Form, Input, Popconfirm } from "antd";
import "./payment.css";
import { async } from "q";

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
      setInitialValues({ ...initialValues, focus: Focus.Back })
    } else {
      setInitialValues({ ...initialValues, focus: Focus.Front })
    }
  };

  const onFinish = (values) => {
    console.log(values);
  };
  const style = {"layout":"vertical"};

  async function createOrder() {
    const response = await fetch("https://react-paypal-js-storybook.fly.dev/api/paypal/create-order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      cart: [
        {
          sku: "1blwyeo8",
          quantity: 2,
        },
      ],
    }),
    });
    const order = await response.json();
    console.log(order);
    return order.id;
  }

  async function onApprove(data) {
    return fetch("https://react-paypal-js-storybook.fly.dev/api/paypal/capture-order", {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify({
          orderID: data.orderID,
      }),
    })
      .then((response) => response.json())
      .then((orderData) => {
          // Your code here after capture the order
      });
  }

  const ButtonWrapper = ({ showSpinner }) => {
    const [{ isPending }] = usePayPalScriptReducer();

    return (
      <>
        { (showSpinner && isPending) && <div className="spinner" /> }
        <PayPalButtons
          style={style}
          disabled={false}
          forceReRender={[style]}
          fundingSource={undefined}
          createOrder={createOrder}
          onApprove={onApprove}
        />
      </>
    );
  }

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

      <div style={{ maxWidth: "750px", minHeight: "200px" }}>
        <PayPalScriptProvider
          options={{
            clientId: process.env.REACT_APP_PAYPAL_CLIENT_ID,
            components: "buttons",
            currency: "USD"
          }}
        >
          <ButtonWrapper showSpinner={false} />
        </PayPalScriptProvider>
      </div>

      {/* <CreditCard {...initialValues} /> */}
      {/* <Form
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

      </Form> */}
    </div>
  );
};
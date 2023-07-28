import { Col, Row } from "antd";
import "./dashboardFirst.css";
import { useEffect } from "react";
import { useState } from "react";

const purchases = [
  {price: 120},
  {price: 155},
  {price: 129.9},
  {price: 169.9},
];

export const DashboardFirst = () => {
  const [ todaySales, setTodaySales ] = useState(0);

  const getSum = (list) => {
    let sum = 0;
    list.forEach((p) => {
      sum += p.price ?? 0
    });
    return sum;
  };

  useEffect(() => {
    const total = getSum(purchases);
    setTodaySales(total);
  }, []);

  return (
    <Row
      align={"top"}
      justify={"space-evenly"}
      gutter={[0, 10]}
      className="dashboard-first-container mt-10"
    >
      <Col className="tag total-purchases-tag">
        <Row align={'top'} gutter={[10, 0]}>
          <Col span={18}>
            <Row>
              <Col span={24}>Today’s Sales</Col>

              <Col span={24}>
                <div className="total total-purchases">
                  <p className="bold-text">${todaySales}</p>
                  <p className="percentage">30%</p>
                </div>
              </Col>
            </Row>

          </Col>
          <Col span={6}>
            <div className="symbol-box coin">
              <img src={'https://s3.eu-central-1.amazonaws.com/e.a-store/icons/coin.svg'} alt="coin" />
            </div>
          </Col>
        </Row>
      </Col>

      <Col className="tag total-users-tag">
        <Row align={'top'} gutter={[10, 0]}>
          <Col span={18}>
            <Row>
              <Col span={24}>Total users</Col>

              <Col span={24}>
                <div className="total total-users">
                  <p className="bold-text">${todaySales}</p>
                  <p className="percentage">30%</p>
                </div>
              </Col>
            </Row>

          </Col>
          <Col span={6}>
            <div className="symbol-box users">
              <img src={'https://s3.eu-central-1.amazonaws.com/e.a-store/icons/users.svg'} alt="coin" />
            </div>
          </Col>
        </Row>
      </Col>

      <Col className="tag total-users-tag">
        <Row align={'top'} gutter={[10, 0]}>
          <Col span={18}>
            <Row>
              <Col span={24}>New users</Col>

              <Col span={24}>
                <div className="total new-clients">
                  <p className="bold-text">${todaySales}</p>
                  <p className="percentage">30%</p>
                </div>
              </Col>
            </Row>

          </Col>
          <Col span={6}>
            <div className="symbol-box new-clients">
              <img src={'https://s3.eu-central-1.amazonaws.com/e.a-store/icons/new-clients.svg'} alt="coin" />
            </div>
          </Col>
        </Row>
      </Col>

      <Col className="tag total-users-tag">
        <Row align={'top'} gutter={[10, 0]}>
          <Col span={18}>
            <Row>
              <Col span={24}>Orders</Col>

              <Col span={24}>
                <div className="total orders">
                  <p className="bold-text">${todaySales}</p>
                  <p className="percentage">30%</p>
                </div>
              </Col>
            </Row>

          </Col>
          <Col span={6}>
            <div className="symbol-box orders">
              <img src={'https://s3.eu-central-1.amazonaws.com/e.a-store/icons/orders.svg'} alt="coin" />
            </div>
          </Col>
        </Row>
      </Col>

    </Row>
  );
};
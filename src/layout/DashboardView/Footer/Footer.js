import React from 'react';
import { Layout, Row, Col, Typography, Space, Divider } from 'antd';
import {
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
  LinkedinOutlined,
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined
} from '@ant-design/icons';
import './Footer.css';

const { Footer } = Layout;
const { Title, Text, Link } = Typography;

export const AppFooter = () => {

  const sections = [
    { title: "Quick Links", links: [
      { title: "Home", href: "/" },
      { title: "Categories", href: "/categories" },
      { title: "About Us", href: "/about" },
      { title: "Contact", href: "/contact" },
      { title: "FAQ", href: "/faq" },
    ] },
    { title: "Customer Service", links: [
      { title: "Support Center", href: "/customers-support" },
      { title: "Shipping Info", href: "/shipping" },
      { title: "Returns", href: "/returns" },
      { title: "Warranty", href: "/warranty" },
      { title: "Gift Cards", href: "/gift-card" },
    ] },
  ]

  return (
    <Footer className="app-footer">
      <div className="footer-content">
        <Row gutter={[32, 32]} justify="space-between">
          {/* Company Info */}
          <Col xs={24} sm={12} md={6}>
            <div className="mb-32">
              <Title level={4} className="footer-title">E.A Store</Title>
              <Text className="footer-description">
                Your trusted destination for quality products at unbeatable prices.
                We're committed to providing exceptional customer service and fast delivery.
              </Text>
              <Space className="footer-social" size="large">
                <Link href="#" className="footer-social-link">
                  <FacebookOutlined />
                </Link>
                <Link href="#" className="footer-social-link">
                  <TwitterOutlined />
                </Link>
                <Link href="#" className="footer-social-link">
                  <InstagramOutlined />
                </Link>
                <Link href="#" className="footer-social-link">
                  <LinkedinOutlined />
                </Link>
              </Space>
            </div>
          </Col>

          {sections.map((section, index) => (
            <Col key={index} xs={24} sm={12} md={6}>
              <div className="mb-32">
                <Title level={5} className="footer-section-title">{section.title}</Title>
                <ul className="footer-links">
                  {section.links.map((link, index) => (
                    <li key={index}><Link href={link.href} className="footer-link">{link.title}</Link></li>
                  ))}
                </ul>
              </div>
            </Col>
          ))}

          {/* Contact Info */}
          <Col xs={24} sm={12} md={6}>
            <div className="mb-32">
              <Title level={5} className="footer-section-title">Contact Info</Title>
              <div className="footer-contact">
                <div>
                  <EnvironmentOutlined className="footer-contact-icon" />
                  <Text className="footer-contact-text">
                    123 Business Street<br />
                    City, State 12345
                  </Text>
                </div>
                <div>
                  <PhoneOutlined className="footer-contact-icon" />
                  <Text className="footer-contact-text">+1 (555) 123-4567</Text>
                </div>
                <div>
                  <MailOutlined className="footer-contact-icon" />
                  <Text className="footer-contact-text">support@eastore.com</Text>
                </div>
              </div>
            </div>
          </Col>
        </Row>

        <Divider className="footer-divider" />

        <Row justify="space-between" align="middle" className="footer-bottom">
          <Col xs={24} md={12}>
            <Text className="footer-copyright">
              © 2024 E.A Store. All rights reserved.
            </Text>
          </Col>
          <Col xs={24} md={12}>
            <Space className="footer-legal" size="large">
              <Link href="/privacy" className="footer-link">Privacy Policy</Link>
              <Link href="/terms" className="footer-link">Terms of Service</Link>
              <Link href="/cookies" className="footer-link">Cookies</Link>
            </Space>
          </Col>
        </Row>
      </div>
    </Footer>
  );
};
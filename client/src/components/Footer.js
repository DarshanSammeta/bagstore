import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaCcVisa,
  FaCcMastercard,
  FaGooglePay,
} from "react-icons/fa";

/**
 * Props:
 *  - theme: "dark" | "light"
 *  - isAdmin: true | false
 */
export default function Footer({ theme = "dark", isAdmin = false }) {
  const isLight = theme === "light";

  return (
    <footer className={`footer ${isLight ? "footer-light" : ""}`}>
      <Container>
        <Row className="py-5">
          {/* Brand */}
          <Col md={4} className="mb-4">
            <h5 className="fw-bold">Mini Bag Store</h5>
            <p className="small text-muted">
              Premium bags crafted for daily elegance and comfort.
            </p>
          </Col>

          {/* Links */}
          <Col md={2} className="mb-4">
            <h6 className="fw-semibold mb-3">Shop</h6>
            <ul className="list-unstyled footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/cart">Cart</Link></li>
              <li><Link to="/checkout">Checkout</Link></li>
            </ul>
          </Col>

          {/* Admin Links */}
          {isAdmin && (
            <Col md={2} className="mb-4">
              <h6 className="fw-semibold mb-3">Admin</h6>
              <ul className="list-unstyled footer-links">
                <li><Link to="/admin/dashboard">Dashboard</Link></li>
                <li><Link to="/admin/products">Products</Link></li>
                <li><Link to="/admin/orders">Orders</Link></li>
              </ul>
            </Col>
          )}

          {/* Newsletter */}
          <Col md={4} className="mb-4">
            <h6 className="fw-semibold mb-3">Newsletter</h6>
            <p className="small text-muted">
              Subscribe to receive offers & updates.
            </p>
            <Form className="d-flex gap-2">
              <Form.Control
                type="email"
                placeholder="Enter your email"
              />
              <Button variant={isLight ? "dark" : "primary"}>
                Subscribe
              </Button>
            </Form>
          </Col>
        </Row>

        {/* Payments + Social */}
        <Row className="align-items-center py-3 border-top footer-border">
          <Col md={6} className="mb-3 mb-md-0">
            <div className="payment-icons">
              <FaCcVisa />
              <FaCcMastercard />
              <FaGooglePay />
            </div>
          </Col>

          <Col md={6} className="text-md-end">
            <div className="footer-social">
              <a href="#"><FaFacebookF /></a>
              <a href="#"><FaInstagram /></a>
              <a href="#"><FaTwitter /></a>
              <a href="#"><FaLinkedinIn /></a>
            </div>
          </Col>
        </Row>

        <div className="text-center small text-muted py-3">
          © {new Date().getFullYear()} Mini Bag Store. All rights reserved.
        </div>
      </Container>

      <style>{`
  .footer {
    background: #0f172a; /* deep dark blue/black */
    color: #ffffff;
  }

  /* Headings */
  .footer h5,
  .footer h6 {
    color: #ffffff;
  }

  /* Text */
  .footer p,
  .footer .text-muted {
    color: #cbd5e1 !important;
  }

  /* Links */
  .footer-links a {
    color: #e5e7eb;
    text-decoration: none;
    font-size: 14px;
  }

  .footer-links a:hover {
    color: #38bdf8;
  }

  /* Newsletter input */
  .footer input {
    background: #020617;
    border: 1px solid #334155;
    color: #ffffff;
  }

  .footer input::placeholder {
    color: #94a3b8;
  }

  /* Buttons */
  .footer button {
    background: #38bdf8;
    border: none;
    color: #020617;
    font-weight: 600;
  }

  .footer button:hover {
    background: #0ea5e9;
  }

  /* Payment icons */
  .payment-icons svg {
    font-size: 34px;
    margin-right: 14px;
    color: #e5e7eb;
  }

  /* Social icons */
  .footer-social a {
    margin-left: 14px;
    font-size: 18px;
    color: #e5e7eb;
  }

  .footer-social a:hover {
    color: #38bdf8;
  }

  /* Border */
  .footer-border {
    border-top: 1px solid #1e293b;
  }
`}</style>

    </footer>
  );
}

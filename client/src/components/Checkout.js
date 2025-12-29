// src/components/Checkout.js
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { CartContext } from "../contexts/CartContext";

export default function Checkout() {
  const { cartItems, totalPrice, setCartItems } = useContext(CartContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
  e.preventDefault();

  fetch("http://localhost:5000/checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, address, cartItems, total: totalPrice }),
  })
    .then((res) => res.json())
    .then(async (data) => {
      if (data.message === "Order placed successfully") {
        // Clear cart in frontend
        setCartItems([]);
        localStorage.removeItem("cartItems");

        // Clear cart in backend
        await fetch("http://localhost:5000/cart/clear", {
          method: "DELETE",
        });

        navigate("/order-success");
      } else {
        alert(data.message || "Checkout failed");
      }
    })
    .catch((err) => console.error("Checkout error:", err));
};


  return (
    <Container className="my-5">
      <Row className="g-4">
        {/* Billing Details */}
        <Col lg={7}>
          <Card className="shadow-sm">
            <Card.Body>
              <h4 className="mb-4">Billing Details</h4>

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="john@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Shipping Address</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    placeholder="Street, City, State, ZIP"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                  />
                </Form.Group>

                <Button variant="dark" type="submit" size="lg" className="w-100">
                  Place Order
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        {/* Order Summary */}
        <Col lg={5}>
          <Card className="shadow-sm position-sticky" style={{ top: "90px" }}>
            <Card.Body>
              <h5 className="mb-3">Order Summary</h5>

              {cartItems.length === 0 ? (
                <p>Your cart is empty</p>
              ) : (
                <>
                  {cartItems.map((item) => (
                    <div
                      key={item._id}
                      className="d-flex justify-content-between mb-2"
                    >
                      <span>{item.name} x {item.quantity}</span>
                      <span>₹{item.price * item.quantity}</span>
                    </div>
                  ))}

                  <hr />

                  <div className="d-flex justify-content-between mb-2">
                    <span>Subtotal</span>
                    <span>₹{totalPrice}</span>
                  </div>

                  <div className="d-flex justify-content-between mb-2">
                    <span>Shipping</span>
                    <span className="text-success">Free</span>
                  </div>

                  <hr />

                  <div className="d-flex justify-content-between fw-bold mb-2">
                    <span>Total</span>
                    <span>₹{totalPrice}</span>
                  </div>
                </>
              )}

              <p className="text-muted mt-3 small">
                By placing your order, you agree to our terms and conditions.
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

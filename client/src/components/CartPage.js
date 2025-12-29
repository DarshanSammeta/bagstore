// src/components/CartPage.js
import React, { useContext } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { FaTrash, FaPlus, FaMinus } from "react-icons/fa";
import { CartContext } from "../contexts/CartContext";

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, totalPrice } =
    useContext(CartContext);
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <Container className="text-center my-5">
        <h3 className="mb-3">Your cart is empty</h3>
        <p className="text-muted mb-4">
          Looks like you haven’t added anything yet.
        </p>
        <Button variant="dark" as={Link} to="/">
          Continue Shopping
        </Button>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <Row className="g-4">
        <Col lg={8}>
          <h3 className="mb-4">Shopping Cart</h3>
          {cartItems.map((item) => (
            <Card key={item._id} className="mb-3 shadow-sm">
              <Card.Body>
                <Row className="align-items-center">
                  <Col md={3}>
                    <img
                      src={item.img || "/fallback.png"}
                      alt={item.name}
                      className="img-fluid rounded"
                    />
                  </Col>
                  <Col md={4}>
                    <h6 className="fw-semibold">{item.name}</h6>
                    <p className="text-muted mb-1">₹{item.price}</p>
                  </Col>
                  <Col md={3} className="d-flex align-items-center gap-2">
                    <Button
                      variant="outline-dark"
                      size="sm"
                      onClick={() =>
                        updateQuantity(item._id, item.quantity - 1)
                      }
                    >
                      <FaMinus />
                    </Button>
                    <span className="fw-semibold">{item.quantity}</span>
                    <Button
                      variant="outline-dark"
                      size="sm"
                      onClick={() =>
                        updateQuantity(item._id, item.quantity + 1)
                      }
                    >
                      <FaPlus />
                    </Button>
                  </Col>
                  <Col md={2} className="text-end">
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => removeFromCart(item._id)}
                    >
                      <FaTrash />
                    </Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          ))}
        </Col>

        <Col lg={4}>
          <Card className="shadow-sm position-sticky" style={{ top: "90px" }}>
            <Card.Body>
              <h5 className="mb-3">Order Summary</h5>

              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal</span>
                <span>₹{totalPrice}</span>
              </div>

              <div className="d-flex justify-content-between mb-2">
                <span>Shipping</span>
                <span className="text-success">Free</span>
              </div>

              <hr />

              <div className="d-flex justify-content-between fw-bold mb-3">
                <span>Total</span>
                <span>₹{totalPrice}</span>
              </div>

              <Button
                variant="dark"
                className="w-100"
                size="lg"
                onClick={() => navigate("/checkout")}
              >
                Proceed to Checkout
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

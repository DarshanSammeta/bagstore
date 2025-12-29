// src/components/OrderSuccess.js
import React from "react";
import { Container, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function OrderSuccess() {
  return (
    <Container className="d-flex justify-content-center my-5">
      <Card
        className="text-center shadow-sm"
        style={{ maxWidth: "520px", width: "100%" }}
      >
        <Card.Body className="p-4">
          <h3 className="mb-3">Order Confirmed</h3>

          <p className="text-muted mb-2">
            Thank you for shopping with Mini Bag Store.
          </p>

          <p className="mb-4">
            Your order has been placed successfully and is now being processed.
            A confirmation email will be sent to you shortly.
          </p>

          <div className="d-grid gap-2">
            <Link to="/">
              <Button variant="dark" size="lg">
                Continue Shopping
              </Button>
            </Link>

            <Link to="/cart">
              <Button variant="outline-secondary">
                View Cart
              </Button>
            </Link>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}

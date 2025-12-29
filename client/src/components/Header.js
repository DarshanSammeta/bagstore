// src/components/Header.js
import React, { useEffect, useState } from "react";
import { Navbar, Container, Nav, Badge } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { FaShoppingCart, FaHome, FaCreditCard } from "react-icons/fa";
import '../App.css';

export default function Header() {
  const [cartCount, setCartCount] = useState(0);

  // Fetch cart count from backend
  const fetchCartCount = () => {
    fetch("http://localhost:5000/cart")
      .then((res) => res.json())
      .then((data) => {
        const totalQty = data.reduce((sum, item) => sum + item.quantity, 0);
        setCartCount(totalQty);
      })
      .catch(() => setCartCount(0));
  };

  useEffect(() => {
    fetchCartCount();
    // Optional: refresh cart count every 5 sec for live update
    const interval = setInterval(fetchCartCount, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Navbar
      bg="dark"
      variant="dark"
      expand="lg"
      fixed="top"  
      className="shadow-sm py-3"
    >
      <Container>
        {/* Brand */}
        <LinkContainer to="/">
          <Navbar.Brand className="fw-bold fs-4">Mini Bag Store</Navbar.Brand>
        </LinkContainer>

        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav className="ms-auto align-items-lg-center gap-lg-3">
            {/* Home */}
            <LinkContainer to="/">
              <Nav.Link className="d-flex align-items-center gap-2">
                <FaHome />
                Home
              </Nav.Link>
            </LinkContainer>

            {/* Cart */}
            <LinkContainer to="/cart">
              <Nav.Link className="d-flex align-items-center gap-2 position-relative">
                <FaShoppingCart />
                Cart
                {cartCount > 0 && (
                  <Badge
                    bg="danger"
                    className="position-absolute top-0 start-100 translate-middle p-1 rounded-circle"
                  >
                    {cartCount}
                  </Badge>
                )}
              </Nav.Link>
            </LinkContainer>

            {/* Checkout */}
            <LinkContainer to="/checkout">
              <Nav.Link className="btn d-flex align-items-center gap-2 px-3">
                <FaCreditCard />
                Checkout
              </Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}


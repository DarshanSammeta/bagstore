import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Button, Spinner, Badge, Toast } from "react-bootstrap";
import { FaShoppingCart, FaBolt } from "react-icons/fa";
import { CartContext } from "../contexts/CartContext";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // Notification state
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    fetch(`http://localhost:5000/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Product not found");
        return res.json();
      })
      .then((data) => setProduct(data))
      .catch((err) => {
        alert(err.message);
        navigate("/");
      })
      .finally(() => setLoading(false));
  }, [id, navigate]);

  const notify = (msg) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000); // hide after 2s
  };

  const handleAddToCart = () => {
    if (!product) return;
    addToCart({
      _id: product._id,
      name: product.name,
      price: product.price,
      img: product.image || "/fallback.png",
    });
    notify("Added to Cart!");
    navigate("/cart");
  };

  const handleBuyNow = () => {
    if (!product) return;
    addToCart({
      _id: product._id,
      name: product.name,
      price: product.price,
      img: product.image || "/fallback.png",
    });
    notify("Added to Cart! Redirecting to Checkout...");
    navigate("/checkout");
  };

  if (loading) {
    return (
      <Container className="text-center my-5">
        <Spinner animation="border" />
      </Container>
    );
  }

  if (!product) {
    return (
      <Container className="text-center my-5">
        <h5>Product not found</h5>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <Row className="g-5">
        <Col md={6}>
          <div className="product-image-wrapper shadow-sm">
            <img
              src={product.image || "/fallback.png"}
              alt={product.name}
              className="img-fluid product-image"
            />
          </div>
        </Col>

        <Col md={6}>
          <div className="product-details">
            <Badge bg="secondary" className="mb-2">In Stock</Badge>
            <h2 className="fw-bold mb-3">{product.name}</h2>
            <h3 className="text-primary fw-bold mb-3">₹{product.price}</h3>
            <p className="text-muted mb-4">{product.description}</p>

            <div className="d-grid gap-3">
              <Button variant="dark" size="lg" onClick={handleAddToCart}>
                <FaShoppingCart className="me-2" /> Add to Cart
              </Button>

              <Button variant="outline-dark" size="lg" onClick={handleBuyNow}>
                <FaBolt className="me-2" /> Buy Now
              </Button>
            </div>
          </div>
        </Col>
      </Row>

      {/* Toast Notification */}
      <Toast
        onClose={() => setShowToast(false)}
        show={showToast}
        delay={2000}
        autohide
        style={{
          position: "fixed",
          top: 20,
          right: 20,
          minWidth: "200px",
          zIndex: 9999,
        }}
      >
        <Toast.Body>{toastMessage}</Toast.Body>
      </Toast>

      <style>{`
        .product-image-wrapper {
          overflow: hidden;
          border-radius: 10px;
          background: #fff;
        }
        .product-image {
          transition: transform 0.4s ease;
        }
        .product-image-wrapper:hover .product-image {
          transform: scale(1.08);
        }
        .product-details {
          position: sticky;
          top: 90px;
        }
        @media (max-width: 768px) {
          .product-details {
            position: static;
          }
        }
      `}</style>
    </Container>
  );
}

import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Card, Button, Row, Col, Container, Spinner, Toast } from "react-bootstrap";
import { FaShoppingCart, FaEye } from "react-icons/fa";
import { CartContext } from "../contexts/CartContext";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useContext(CartContext);

  // Toast notification state
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:5000/products");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Show toast helper
  const notify = (msg) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  // Handle add to cart
  const handleAddToCart = (product) => {
    addToCart({
      _id: product._id,
      name: product.name,
      price: product.price,
      img: product.image || "/fallback.png",
    });
    notify("Added to Cart!");
  };

  if (loading) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <Container className="mb-5 mt-5">
      <div className="text-center mb-4">
        <h1 className="fw-bold">Mini Bag Store</h1>
        <p className="text-muted">Premium mini bags for everyday style</p>
      </div>

      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {products.map((product) => (
          <Col key={product._id}>
            <Card className="h-100 border-0 shadow-sm product-card">
              <Link to={`/product/${product._id}`}>
                <Card.Img
                  variant="top"
                  src={product.image || "/fallback.png"}
                  alt={product.name}
                  className="product-img"
                />
              </Link>

              <Card.Body className="d-flex flex-column">
                <Card.Title>{product.name}</Card.Title>
                <Card.Text className="fw-bold text-primary fs-5 mb-3">
                  ₹{product.price}
                </Card.Text>

                <div className="mt-auto d-grid gap-2">
                  <Link to={`/product/${product._id}`}>
                    <Button variant="outline-dark" className="w-100">
                      <FaEye className="me-2" />
                      View Details
                    </Button>
                  </Link>

                  <Button
                    variant="dark"
                    onClick={() => handleAddToCart(product)}
                  >
                    <FaShoppingCart className="me-2" />
                    Add to Cart
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
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
        .product-card {
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .product-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 12px 25px rgba(0,0,0,0.12);
        }
        .product-img {
          height: 220px;
          object-fit: cover;
          transition: transform 0.4s ease;
        }
        .product-card:hover .product-img {
          transform: scale(1.08);
        }
      `}</style>
    </Container>
  );
}

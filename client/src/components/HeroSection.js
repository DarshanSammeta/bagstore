import React from "react";
import { Carousel, Container, Button } from "react-bootstrap";

export default function HeroSection() {
  return (
    <section className="amazon-hero">
      <Carousel fade indicators={false} interval={4500}>
        {/* Slide 1 */}
        <Carousel.Item>
          <div
            className="hero-slide"
            style={{
              backgroundImage:
                "url('https://res.cloudinary.com/dclt3kszt/image/upload/v1766919706/5625710_cutbwi.jpg')",
            }}
          >
            <Container>
              <div className="hero-box">
                <h1>Premium Mini Bags</h1>
                <p>Stylish • Durable • Everyday Use</p>
                <Button className="hero-btn">Shop Now</Button>
              </div>
            </Container>
          </div>
        </Carousel.Item>

        {/* Slide 2 */}
        <Carousel.Item>
          <div
            className="hero-slide"
            style={{
              backgroundImage:
                "url('https://res.cloudinary.com/dclt3kszt/image/upload/v1766919706/black_friday_web_banner_19_xyd3ok.jpg')",
            }}
          >
            <Container>
              <div className="hero-box">
                <h1>Big Sale is Live</h1>
                <p>Up to 50% off on trending bags</p>
                <Button className="hero-btn">Explore Deals</Button>
              </div>
            </Container>
          </div>
        </Carousel.Item>
      </Carousel>

      {/* Styles */}
      <style>{`
        .amazon-hero {
          width: 100%;
        }

        .hero-slide {
          height: 75vh;
          background-size: cover;
          background-position: center;
          display: flex;
          align-items: center;
          position: relative;
        }

        .hero-slide::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to right,
            rgba(0,0,0,0.6),
            rgba(0,0,0,0.1)
          );
        }

        /* LEFT CONTENT BOX */
        .hero-box {
          position: relative;
          z-index: 2;
         
          padding: 30px;
          border-radius: 14px;
          max-width: 420px;
          
        }

        .hero-box h1 {
          font-size: 3rem;
          font-weight: 800;
          margin-bottom: 10px;
          color: #111;
        }

        .hero-box p {
          font-size: 2rem;
          color: #555;
          margin-bottom: 20px;
        }

        /* BUTTON */
        .hero-btn {
          width: 100%;
          height: 48px;
          border-radius: 999px;
          font-weight: 600;
          background-color: #111;
          border: none;
        }

        .hero-btn:hover {
          background-color: #000;
        }

        @media (max-width: 768px) {
          .hero-slide {
            height: 60vh;
          }

          .hero-box {
            max-width: 100%;
            padding: 24px;
          }

          .hero-box h1 {
            font-size: 1.8rem;
          }
        }
      `}</style>
    </section>
  );
}

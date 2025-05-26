import React from "react";
import { Container, Row, Col, Nav, Form, Button } from "react-bootstrap";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4">
      <Container>
        <Row className="text-center text-md-start">
          {/* À Propos */}
          <Col md={3} className="mb-3">
            <h5 className="text-uppercase">À Propos</h5>
            <Nav className="flex-column">
              <Nav.Link href="#" className="text-light">Notre Mission</Nav.Link>
              <Nav.Link href="#" className="text-light">L'Équipe</Nav.Link>
              <Nav.Link href="#" className="text-light">Carrières</Nav.Link>
            </Nav>
          </Col>

          {/* Services */}
          <Col md={3} className="mb-3">
            <h5 className="text-uppercase">Services</h5>
            <Nav className="flex-column">
              <Nav.Link href="#" className="text-light">Analyse du Sol</Nav.Link>
              <Nav.Link href="#" className="text-light">Prévisions</Nav.Link>
              <Nav.Link href="#" className="text-light">Marketplace</Nav.Link>
            </Nav>
          </Col>

          {/* Support */}
          <Col md={3} className="mb-3">
            <h5 className="text-uppercase">Support</h5>
            <Nav className="flex-column">
              <Nav.Link href="#" className="text-light">Centre d'Aide</Nav.Link>
              <Nav.Link href="#" className="text-light">Contact</Nav.Link>
              <Nav.Link href="#" className="text-light">FAQ</Nav.Link>
            </Nav>
          </Col>

          {/* Newsletter */}
          <Col md={3} className="mb-3">
                <h5 className="text-uppercase">Votre Feedback</h5>
                <Form>
                    <Form.Group controlId="feedback">
                    <Form.Control as="textarea" rows={3} placeholder="Donnez-nous votre avis..." className="mb-3" />
                    <Button variant="primary" size="sm" type="submit">Envoyer</Button>
                    </Form.Group>
                </Form>
           </Col>
        </Row>

        {/* Réseaux Sociaux */}
        <Row className="mt-3 text-center">
          <Col>
            <a href="#" className="text-light mx-2"><FaFacebook size={20} /></a>
            <a href="#" className="text-light mx-2"><FaTwitter size={20} /></a>
            <a href="#" className="text-light mx-2"><FaInstagram size={20} /></a>
            <a href="#" className="text-light mx-2"><FaLinkedin size={20} /></a>
          </Col>
        </Row>

        {/* Copyright */}
        <Row className="mt-3 text-center">
          <Col>
            <p className="mb-0">© 2025 AgriTech AI. Tous droits réservés.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;

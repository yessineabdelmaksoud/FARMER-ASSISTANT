import React from "react";
import { Link } from "react-router-dom";
import { FaSeedling, FaTint, FaLeaf, FaBug, FaChartBar, FaRobot, FaCloudSun, FaTable, FaShoppingCart } from "react-icons/fa";
import Footer from "../components/Footer";
import { Container, Row, Col, Button } from "react-bootstrap";
import '../css/services.css';
import '../css/hero.css'; 

const Home = () => {
  return (
    <>
      {/* Section Hero avec image de fond */}
      <section className="hero">
      <Container>
        <Row className="align-items-center">
          <Col md={6}>
            <h1 className="hero-title">
              Intelligence Artificielle au <br /> Service de l'Agriculture
            </h1>
            <p className="hero-text">
              Optimisez vos cultures grâce à nos outils d'analyse avancés et nos 
              recommandations personnalisées basées sur l'IA.
            </p>
            <div className="hero-btn-container">
            <Link to="/get-started" className="hero-btn">
                Commencer maintenant →
            </Link>
            </div>
          </Col>
          
        </Row>
      </Container>
      </section>

      {/* Section Services */}
      <section className="services" style={{ backgroundColor: '#f0f0f0', padding: '40px 0' }}>
      <h1 style={{ textAlign: 'center', fontWeight: 'bold' }}>Nos Services</h1>
      <p style={{ textAlign: 'center', marginBottom: '40px' }}>
        Découvrez nos outils intelligents conçus pour optimiser votre exploitation agricole et
        <br /> maximiser vos rendements.
      </p>
      <div className="service-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
        <ServiceCard
          icon={<img src="\src\image\1.png" alt="Seedling" />}
          title="Analyse du Sol"
          description="Analysez la composition de votre sol et obtenez des recommandations personnalisées."
        />
        <ServiceCard
          icon={<img src="\src\image\2.png" alt="Water" />}
          title="Gestion de l'Irrigation"
          description="Optimisez votre consommation d'eau grâce à nos prévisions intelligentes."
        />
        <ServiceCard
          icon={<img src="\src\image\3.png" alt="Leaf" />}
          title="Recommandation de Cultures"
          description="Découvrez les meilleures cultures adaptées à votre terrain."
        />
        <ServiceCard
          icon={<img src="\src\image\4.png" alt="Bug" />}
          title="Détection des Maladies"
          description="Identifiez rapidement les maladies de vos plantes grâce à l'IA."
        />
        <ServiceCard
          icon={<img src="\src\image\5.png" alt="Chart" />}
          title="Analyse de Données"
          description="Importez et analysez vos données agricoles pour de meilleures décisions."
        />
        <ServiceCard
          icon={<img src="\src\image\6.png" alt="Robot" />}
          title="Assistant IA"
          description="Obtenez des réponses instantanées à vos questions agricoles."
        />
        <ServiceCard
          icon={<img src="\src\image\7.png" alt="Cloud" />}
          title="Prévisions Météo"
          description="Anticipez les conditions météorologiques et leur impact sur vos cultures."
        />
        <ServiceCard
          icon={<img src="\src\image\8.png" alt="Dashboard" />}
          title="Tableau de Bord"
          description="Visualisez et gérez toutes vos données agricoles en un seul endroit."
        />
        <ServiceCard
          icon={<img src="\src\image\9.png" alt="Cart" />}
          title="Marché Agricole"
          description="Achetez et vendez des produits agricoles en toute simplicité."
        />
      </div>
    </section>

      {/* Section CTA */}
      <section className="cta">
        <h2>Prêt à Optimiser Votre Agriculture ?</h2>
        <br />
        <p>Rejoignez des milliers d'agriculteurs qui utilisent déjà notre plateforme pour améliorer <br /> leurs rendements.</p>
        <div className="hero-btn-container1">
        <Link to="/signup" className="hero-btn1">Créer un compte gratuit</Link>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </>
  );
};

const ServiceCard = ({ icon, title, description }) => (
  <div className="service-card">
    <div className="icon">{icon}</div>
    <h3>{title}</h3>
    <p>{description}</p>
  </div>
);

export default Home;

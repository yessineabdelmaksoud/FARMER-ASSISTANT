import React from "react";
import { Link, Outlet } from "react-router-dom";
import { FaChartBar, FaBug, FaRobot, FaShoppingCart, FaCloudSun, FaSeedling, FaMoneyBillWave } from "react-icons/fa";
import "../css/getstarted.css";

const services = [
  { id: "dashboard", name: "Tableau de Bord & Statistiques", icon: <FaChartBar />, path: "/get-started/dashboard" },
  { id: "disease", name: "Détection de Maladie", icon: <FaBug />, path: "/get-started/disease" },
  { id: "assistant", name: "Assistant IA", icon: <FaRobot />, path: "/get-started/assistant" },
  { id: "market", name: "Marché Agricole", icon: <FaShoppingCart />, path: "/get-started/market" },
  { id: "weather", name: "Prévisions Météo", icon: <FaCloudSun />, path: "/get-started/weather" },
  { id: "prediction", name: "Prédiction des Besoins", icon: <FaSeedling />, path: "/get-started/prediction" },
  { id: "economic", name: "Optimisation Économique", icon: <FaMoneyBillWave />, path: "/get-started/economic" }
];

const GetStarted = () => {
  return (
    <div className="get-started-container">
      {/* Sidebar Navigation */}
      <nav className="sidebar">
        <h2 className="sidebar-title">Farm AI Assistant</h2>
        <ul className="sidebar-menu">
          {services.map((service) => (
            <li key={service.id}>
              <Link to={service.path} className="sidebar-link">
                {service.icon} {service.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Contenu dynamique */}
      <div className="main-content">
        <Outlet />
      </div>
    </div>
  );
};

export default GetStarted;

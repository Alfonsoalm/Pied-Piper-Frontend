import React from "react";
import { NavLink } from "react-router-dom";
import { Header } from "./PublicHeader";

export const Home = () => {
  return (
    <div className="home-container">
      {/* Header */}
      <Header className="public-layout__header" />

      {/* Video de fondo */}
      <video className="home-video" autoPlay loop muted>
        <source src="/background-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Capa de superposición para el contraste */}
      <div className="overlay"></div>

      {/* Contenido centrado */}
      <div className="content">
        <h1>Conecta con el Futuro del Trabajo</h1>
        <p>Encuentra el talento que necesitas o tu próxima gran oportunidad.</p>
        <div className="buttons">
          <NavLink to="/registro" className="btn primary-btn">
            Regístrate
          </NavLink>
          <NavLink to="/login" className="btn secondary-btn">
            Iniciar Sesión
          </NavLink>
        </div>
      </div>
    </div>
  );
};

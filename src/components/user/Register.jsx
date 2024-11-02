// Register.jsx
// Register.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import officeBuildingIcon from "../../assets/img/edificio-de-oficinas.png";
import workerIcon from "../../assets/img/worker.png";
import "../../assets/css/register.css"; // Estilos personalizados

export const Register = () => {
  return (
    <div className="register-selection">
      <h1 className="register-selection__title">Selecciona tu tipo de registro</h1>
      <div className="register-selection__options">

        <NavLink to="/registro/profesional" className="register-option">
          <img src={workerIcon} alt="Trabajador" className="register-option__icon" />
          <h2>Profesional</h2>
          <p>Registro para usuarios en busca de oportunidades laborales</p>       
        </NavLink>

        <NavLink to="/registro/empresa" className="register-option">
          <img src={officeBuildingIcon} alt="Empresa" className="register-option__icon" />
          <h2>Empresa</h2>
          <p>Registro para empresas en busca de talentos</p>    
        </NavLink>

      </div>
    </div>
  );
};

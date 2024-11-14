import React from "react";
import { NavLink } from "react-router-dom";

export const Header = () => {
  return (
    <header className="layout__navbar">
      <div className="navbar__header">
        <a href="#" className="navbar__title">
          <i className="fab fa-pied-piper navbar__icon"></i>{" "}
          {/* Ícono de Pied Piper */}
          Pied Piper
        </a>
      </div>

      <nav className="navbar__container-lists">
        <ul className="container-lists__menu-list">
          <li className="menu-list__item">
            <NavLink to="/login" className="menu-list__link">
              <i className="fa-solid fa-house"></i>
              <span className="menu-list__title">Login</span>
            </NavLink>
          </li>

          <li className="menu-list__item">
            <NavLink to="/registro" className="menu-list__link">
              <i className="fa-solid fa-list"></i>
              <span className="menu-list__title">Registro</span>
            </NavLink>
          </li>
        </ul>
      </nav>

    </header>
  );
};

import React from "react";
import { NavLink } from "react-router-dom";

export const Nav = () => {
  return (
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
  );
};

import React from "react";
import { Nav } from "./Nav";

export const Header = () => {
  return (
    <header className="layout__navbar">
      <div className="navbar__header">
        <a href="#" className="navbar__title">
          <i className="fab fa-pied-piper navbar__icon"></i> {/* Ícono de Pied Piper */}
          Pied Piper
        </a>
      </div>
      <Nav />
    </header>
  );
};

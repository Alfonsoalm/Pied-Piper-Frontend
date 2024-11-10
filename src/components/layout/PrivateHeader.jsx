import React from "react";
import { NavLink } from "react-router-dom";
import { Global } from "../../helpers/Global";
import useAuth from "../../hooks/useAuth";

export const Header = () => {
  const { auth } = useAuth();

  return (
    <header className="layout__navbar">
      
      {/* Contenedor del título y slogan */}
      <div className="navbar__header">
        <a href="#" className="navbar__title">
          <i className="fab fa-pied-piper navbar__icon"></i> Pied Piper
        </a>
        <p className="navbar__slogan">Here don't find the job, The job finds you</p>
      </div>

      {/* Contenedor del menú de navegación */}
      <nav className="navbar__container-lists">
        <ul className="container-lists__menu-list">
          <li className="menu-list__item">
            <NavLink to="/social/feed" className="menu-list__link">
              <img className="navbar__icon" src="/home.svg" alt="Inicio icon" />
              <span className="menu-list__title">Inicio</span>
            </NavLink>
          </li>
          <li className="menu-list__item">
            <NavLink to="/social/offers" className="menu-list__link">
              <img className="navbar__icon" src="/file-description.svg" alt="Ofertas icon" />
              <span className="menu-list__title">Ofertas</span>
            </NavLink>
          </li>
          <li className="menu-list__item">
            <NavLink to="/social/sectors" className="menu-list__link">
              <img className="navbar__icon" src="/buildings.svg" alt="Sectores icon" />
              <span className="menu-list__title">Sectores</span>
            </NavLink>
          </li>
          <li className="menu-list__item">
            <NavLink to="/social/profiles" className="menu-list__link">
              <img className="navbar__icon" src="/users.svg" alt="Perfiles icon" />
              <span className="menu-list__title">Perfiles</span>
            </NavLink>
          </li>
          <li className="menu-list__item">
            <NavLink to="/social/gente" className="menu-list__link">
              <img className="navbar__icon" src="/search.svg" alt="Buscar icon" />
              <span className="menu-list__title">Buscar</span>
            </NavLink>
          </li>
        </ul>
      </nav>

      {/* Contenedor del usuario */}
      <ul className="container-lists__list-end">
        <li className="list-end__item">
          <NavLink to={"/social/perfil/" + auth._id} className="list-end__link-image">
            {auth.image && auth.image !== "default.png" ? (
              <img src={Global.url + "user/avatar/" + auth.image} className="list-end__img" alt="Usuario" />
            ) : (
              <img src="/user.png" className="list-end__img" alt="Por defecto" />
            )}
          </NavLink>
        </li>
        <li className="list-end__item">
          <NavLink to={"/social/perfil/" + auth._id} className="list-end__link">
            <span className="list-end__name">{auth.name}</span>
          </NavLink>
        </li>
        <li className="list-end__item">
          <NavLink to="/social/ajustes" className="list-end__link">
            <i className="fa-solid fa-gear"></i>
            <span className="list-end__name">Ajustes</span>
          </NavLink>
        </li>
        <li className="list-end__item">
          <NavLink to="/social/logout" className="list-end__link">
            <i className="fa-solid fa-arrow-right-from-bracket"></i>
            <span className="list-end__name">Cerrar sesión</span>
          </NavLink>
        </li>
      </ul>
    </header>
  );
};

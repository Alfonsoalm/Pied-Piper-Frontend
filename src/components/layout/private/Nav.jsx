import React from "react";
import avatar from '../../../assets/img/user.png';
import { NavLink } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { Global } from "../../../helpers/Global";

export const Nav = () => {
  const { auth } = useAuth();

  return (
    <nav className="navbar__container-lists">
      <ul className="container-lists__menu-list">
        <li className="menu-list__item">
          <NavLink to="/social/feed" className="menu-list__link">
            <img
              className="navbar__icon"
              src="/home.svg"
              alt="ofertas icon"
            ></img>
            <span className="menu-list__title">Inicio</span>
          </NavLink>
        </li>

        <li className="menu-list__item">
          <NavLink to="/social/offers" className="menu-list__link">
            <img
              className="navbar__icon"
              src="/file-description.svg"
              alt="file-description icon"
            ></img>
            <span className="menu-list__title">Ofertas</span>
          </NavLink>
        </li>

        <li className="menu-list__item">
          <NavLink to="/social/sectors" className="menu-list__link">
            <img
              className="navbar__icon"
              src="/buildings.svg"
              alt="buildings icon"
            ></img>
            <span className="menu-list__title">Sectores</span>
          </NavLink>
        </li>

        <li className="menu-list__item">
          <NavLink to="/social/profiles" className="menu-list__link">
            <img
              className="navbar__icon"
              src="/users.svg"
              alt="users icon"
            ></img>
            <span className="menu-list__title">Perfiles</span>
          </NavLink>
        </li>

        <li className="menu-list__item">
          <NavLink to="/social/gente" className="menu-list__link">
            <img
              className="navbar__icon"
              src="/search.svg"
              alt="search icon"
            ></img>
            <span className="menu-list__title">Buscar</span>
          </NavLink>
        </li>
      </ul>

      <ul className="container-lists__list-end">
        <li className="list-end__item">
          <NavLink
            to={"/social/perfil/" + auth._id}
            className="list-end__link-image">

            {auth.image && auth.image !== "default.png" ? (
              <img
                src={Global.url + "user/avatar/" + auth.image}
                className="list-end__img"
                alt="Foto de usuario"/>
            ) : (
              <img
                src="/user.png"
                className="list-end__img"
                alt="Foto por defecto"/>
            )}
            {console.log(Global.url + "user/avatar/" + auth.image)}
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
    </nav>
  );
};

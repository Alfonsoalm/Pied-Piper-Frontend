import React, { useState } from "react";
import { useForm } from "../../hooks/useForm.jsx";
import { Global } from "../../helpers/Global.jsx";
import useAuth from "../../hooks/useAuth.jsx";

export const Login = () => {
  const { form, changed } = useForm({});
  const [saved, setSaved] = useState("not_sended");
  const { setAuth } = useAuth();

  const loginUser = async (e) => {
    e.preventDefault();

    let userToLogin = form;

    const attemptLogin = async (endpoint) => {
      try {
        const response = await fetch(Global.url + endpoint, {
          method: "POST",
          body: JSON.stringify(userToLogin),
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        const data = await response.json();
        return data;
      } catch (error) {
        console.error(`Error intentando loguear en ${endpoint}:`, error);
        return null;
      }
    };

    const companyLogin = await attemptLogin("company/login");
    if (companyLogin && companyLogin.status === "success") {
      localStorage.setItem("token", companyLogin.token);
      localStorage.setItem("user", JSON.stringify(companyLogin.user));
      setSaved("login");
      setAuth(companyLogin.user);
      setTimeout(() => {
        window.location.reload();
      }, 100);
      return;
    }

    const userLogin = await attemptLogin("user/login");
    if (userLogin && userLogin.status === "success") {
      localStorage.setItem("token", userLogin.token);
      localStorage.setItem("user", JSON.stringify(userLogin.user));
      setSaved("login");
      setAuth(userLogin.user);
      setTimeout(() => {
        window.location.reload();
      }, 100);
      return;
    }

    setSaved("error");
  };

  // Función para manejar "¿Olvidaste tu contraseña?"
  const handleForgotPassword = () => {
    console.log("Redirigiendo al proceso de recuperación de contraseña...");
  };

  return (
    <>
      <header className="login-header">
        <h1 className="login-title">Login</h1>
      </header>

      <div className="login-content">
        {saved === "login" && (
          <strong className="login-alert login-alert--success">
            Usuario registrado correctamente!
          </strong>
        )}
        {saved === "error" && (
          <strong className="login-alert login-alert--error">
            Usuario no se ha registrado correctamente
          </strong>
        )}

        <form className="login-form" onSubmit={loginUser}>
          <div className="login-form-group">
            <label htmlFor="email" className="login-form-label">
              Email
            </label>
            <input
              type="text"
              name="email"
              onChange={changed}
              className="login-form-input"
            />
          </div>

          <div className="login-form-group">
            <label htmlFor="password" className="login-form-label">
              Contraseña
            </label>
            <input
              type="password"
              name="password"
              onChange={changed}
              className="login-form-input"
            />
          </div>
          
          {/* Enlace para "¿Olvidaste tu contraseña?" */}
          <div className="login-forgot-password">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault(); // Evitar recarga de página
                handleForgotPassword();
              }}
              className="forgot-password-link">
              ¿Olvidaste tu contraseña?
            </a>
          </div>

          <input
            type="submit"
            value="Identifícate"
            className="login-form-btn"
          />
        </form>
      </div>
    </>
  );
};

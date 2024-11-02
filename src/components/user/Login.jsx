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
    const request = await fetch(Global.url + "user/login", {
      method: "POST",
      body: JSON.stringify(userToLogin),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const data = await request.json();
    console.log(data);
    if (data.status === "success") {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      setSaved("login");
      setAuth(data.user);
      setTimeout(() => {
        window.location.reload();
      }, 100);
    } else {
      setSaved("error");
    }
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

          <input
            type="submit"
            value="Identificate"
            className="login-form-button btn-success"
          />
        </form>
      </div>
    </>
  );
};

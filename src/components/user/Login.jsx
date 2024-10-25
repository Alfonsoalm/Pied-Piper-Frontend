import React, { useState } from "react";
import { useForm } from "../../hooks/useForm";
import { Global } from "../../helpers/Global";
import useAuth from "../../hooks/useAuth";

export const Login = () => {
  const { form, changed } = useForm({});
  const [ saved, setSaved ] =useState("not_sended");
  const {setAuth} = useAuth();

  const loginUser = async(e) => {

    // Prevenir actualizacion de pantalla
    e.preventDefault();

    // recoger datos del formulario
    let userToLogin = form;

    // Peticion de login del usuario en el backend
    const request = await fetch(Global.url + "user/login", {
      method: "POST",
      body: JSON.stringify(userToLogin),
      headers: {
        "Content-Type": "application/json"
      },
      credentials: 'include', // Incluir cookies o credenciales
    });

    // Persistir los datos en el navegador
    

    const data = await request.json();
    console.log(data);
    if (data.status == "success"){
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      setSaved("login");

      //Set datos en el auth
      setAuth(data.user);

      // Redireccion
      setTimeout(() => {
          window.location.reload();
      }, 100);

    }else{
      setSaved("error");
    }

    
  }


  return (
    <>
      <header className="content__header content__header--public">
        <h1 className="content__title">Login</h1>
      </header>

      <div className="content__posts">

      {saved == "login" ?  <strong className="alert alert-success">Usuario registrado correctamente !</strong>: ""}
      {saved == "error" ?  <strong className="alert alert-error"> Usuario no se ha registrado correctamente</strong>: ""}

        <form className="form-login" onSubmit={loginUser}>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="text" name="email" onChange={changed} />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input type="password" name="password" onChange={changed} />
          </div>

          <input type="submit" value="Identificate" className="btn btn-success" />
        </form>
      </div>
    </>
  );
};

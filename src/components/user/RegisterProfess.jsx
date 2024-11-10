import React, { useState } from "react";
import { TagsInput } from "../common/TagsInput.jsx";  // Importamos el componente de etiquetas
import { useForm } from "../../hooks/useForm.jsx";
import { Global } from "../../helpers/Global.jsx";

export const UserRegister = () => {
  const { form, changed } = useForm({});
  const [professions, setProfessions] = useState([]);  // Manejar profesiones como etiquetas
  const [saved, setSaved] = useState("not_sended");
  const [passwords, setPasswords] = useState({ password: '', repeatPassword: '' }); // Estado para las contraseñas
  const [passwordError, setPasswordError] = useState('');  // Estado para el error de contraseñas

  // Función para manejar el cambio de contraseñas
  const handlePasswordChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const saveUser = async (e) => {
    e.preventDefault();

    // Validar que ambas contraseñas sean iguales
    if (passwords.password !== passwords.repeatPassword) {
      setPasswordError('Las contraseñas no coinciden');
      return;
    }

    // Añadir profesiones al formulario
    const newUser = { ...form, professions, password: passwords.password };

    const request = await fetch(Global.url + "user/register", {
      method: "POST",
      body: JSON.stringify(newUser),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await request.json();
    setSaved(data.status === "success" ? "saved" : "error");
  };

  return (
    <div className="register-container">
      <div className="register-form">
        <h1>Registro para Profesional</h1>
        {saved === "saved" && <div className="alert alert-success">Usuario registrado correctamente!</div>}
        {saved === "error" && <div className="alert alert-error">Error al registrar usuario</div>}

        <form onSubmit={saveUser}>
          <div className="form-group">
            <label htmlFor="name">Nombre</label>
            <input type="text" name="name" onChange={changed} required />
          </div>

          <div className="form-group">
            <label htmlFor="surname">Apellidos</label>
            <input type="text" name="surname" onChange={changed} />
          </div>

          <div className="form-group">
            <label htmlFor="email">Correo Electrónico</label>
            <input type="email" name="email" onChange={changed} required />
          </div>

          <div className="form-group">
            <label htmlFor="birth_date">Fecha de Nacimiento</label>
            <input type="date" name="birth_date" onChange={changed} required />
          </div>

          <div className="form-group">
            <label htmlFor="professions">Profesiones</label>
            <TagsInput tags={professions} setTags={setProfessions} placeholder="Añadir profesiones y presionar Enter" />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input type="password" name="password" onChange={handlePasswordChange} required />
          </div>

          <div className="form-group">
            <label htmlFor="repeatPassword">Repetir Contraseña</label>
            <input type="password" name="repeatPassword" onChange={handlePasswordChange} required />
          </div>

          {passwordError && <div className="alert alert-error">{passwordError}</div>} {/* Mostrar error si hay */}

          <button type="submit" className="btn-success">Registrate</button>
        </form>
      </div>
    </div>
  );
};

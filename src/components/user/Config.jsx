import React, { useState } from "react";
import useAuth from "../../hooks/useAuth.jsx";
import { Global } from "../../helpers/Global.jsx";
import avatar from "../../assets/img/user.png";
import { SerializeForm } from "../../helpers/SerializeForm.jsx";
import { TagsInput } from "../common/TagsInput.jsx"; // Importamos el componente TagsInput

export const Config = () => {
  const { auth, setAuth } = useAuth();
  const [saved, setSaved] = useState("not_saved");

  // Para manejar las etiquetas de sectores o profesiones
  const [sectors, setSectors] = useState(auth.sectors || []); // Array para los sectores de la empresa
  const [professions, setProfessions] = useState(auth.professions || []); // Array para las profesiones del usuario

  const updateUserOrCompany = async (e) => {
    e.preventDefault();
  
    // Token de autenticación
    const token = localStorage.getItem("token");
  
    // Recoger datos del formulario, excepto la imagen
    let newData = SerializeForm(e.target);  // Serializamos solo los campos del formulario (excepto la imagen)
  
    // Añadir sectores o profesiones según el tipo de usuario
    if (auth.legal_id) {
      newData.sectors = sectors;
    } else {
      newData.professions = professions;
    }
  
    // Eliminar la propiedad de imagen del objeto serializado
    delete newData.file0;
  
    // Determinar la URL correcta para la actualización
    const url = auth.legal_id
      ? `${Global.url}company/update`
      : `${Global.url}user/update`;
  
    // 1. Actualizar los datos del usuario sin imagen
    const request = await fetch(url, {
      method: "PUT",
      body: JSON.stringify(newData),
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
  
    const data = await request.json();
    if (data.status === "success" && data.user) {
      delete data.user.password;
      if (!data.user.image) {
        data.user.image = "default.png";
      }
      setAuth(data.user);  // Actualizamos el estado auth
      setSaved("updated");
    } else {
      setSaved("error");
    }
  
    // 2. Subir la imagen (si existe un archivo seleccionado)
    const fileInput = document.querySelector("#file");
    if (fileInput.files.length > 0) {
      const formData = new FormData();
      formData.append("file0", fileInput.files[0]);  // Agregamos el archivo al FormData
  
      const uploadUrl = auth.legal_id
        ? `${Global.url}company/upload`
        : `${Global.url}user/upload`;
  
      // Subimos la imagen al servidor
      const uploadRequest = await fetch(uploadUrl, {
        method: "POST",
        body: formData,  // Enviamos el FormData que contiene la imagen
        headers: {
          Authorization: token,
        },
      });
  
      const uploadData = await uploadRequest.json();
      if (uploadData.status === "success" && uploadData.user) {
        setAuth(uploadData.user);  // Actualizamos el estado auth con la nueva imagen
        setSaved("saved");
      } else {
        setSaved("error");
      }
    }
  };
  

  return (
    <>
      {saved === "updated" && (
        <strong className="alert alert-success">
          Datos cambiados correctamente!
        </strong>
      )}
      {saved === "error" && (
        <strong className="alert alert-error">
          Datos no se han cambiado correctamente
        </strong>
      )}

      <header className="content__header content__header--public">
        <h1 className="content__title">Ajustes</h1>
      </header>

      <div className="content__posts">
        <form className="config-form" onSubmit={updateUserOrCompany}>
          <div className="form-group">
            <label htmlFor="name">Nombre</label>
            <input type="text" name="name" defaultValue={auth.name} />
          </div>

          {/* Si es una empresa, mostrar campos adicionales */}
          {auth.legal_id ? (
            <>
              <div className="form-group">
                <label htmlFor="legal_id">Identificación Legal</label>
                <input
                  type="text"
                  name="legal_id"
                  defaultValue={auth.legal_id}
                  disabled
                />
              </div>

              <div className="form-group">
                <label htmlFor="sectors">Sectores</label>
                {/* Usamos el componente TagsInput para manejar los sectores */}
                <TagsInput
                  tags={sectors}
                  setTags={setSectors}
                  placeholder="Añadir sectores y presionar Enter"
                />
              </div>

              <div className="form-group">
                <label htmlFor="location">Ubicación</label>
                <input
                  type="text"
                  name="location"
                  defaultValue={auth.location}
                />
              </div>

              <div className="form-group">
                <label htmlFor="website">Sitio Web</label>
                <input type="text" name="website" defaultValue={auth.website} />
              </div>

              <div className="form-group">
                <label htmlFor="description">Descripción</label>
                <textarea name="description" defaultValue={auth.description} />
              </div>
            </>
          ) : (
            <>
              <div className="form-group">
                <label htmlFor="surname">Apellidos</label>
                <input type="text" name="surname" defaultValue={auth.surname} />
              </div>

              <div className="form-group">
                <label htmlFor="bio">Biografía</label>
                <textarea name="bio" defaultValue={auth.bio} />
              </div>

              <div className="form-group">
                <label htmlFor="professions">Profesiones</label>
                <TagsInput
                  tags={professions}
                  setTags={setProfessions}
                  placeholder="Añadir profesiones y presionar Enter"
                />
              </div>
            </>
          )}

          <div className="form-group">
            <label htmlFor="email">Correo Electrónico</label>
            <input type="email" name="email" defaultValue={auth.email} />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input type="password" name="password" />
          </div>

          <div className="form-group">
            <label htmlFor="image" name="Seleccionar archivo">
              Avatar
            </label>
            <div className="general-info__container-avatar">
              {/* Comprobar que el campo "auth.image" no esté undefined o vacío */}
              {auth.image && auth.image !== "default.png" ? (
                <img
                  src={"../../../public/logo-cetemet.png"}
                  className="container-avatar__img"
                  alt="Foto de perfil"/>
              ) : (
                <img
                  src={avatar}
                  className="container-avatar__img"
                  alt="Foto de perfil"/>
              )}
            </div>
            <br />
            <input type="file" name="file0" id="file" />
          </div>
          <br />
          <input type="submit" value="Actualizar" className="btn btn-success" />
        </form>
        <br />
      </div>
    </>
  );
};

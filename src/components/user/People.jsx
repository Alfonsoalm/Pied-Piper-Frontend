import React, { useEffect, useState } from "react";
import { Global } from "../../helpers/Global.jsx";
import { UserList } from "./UserList.jsx";
import useAuth from "../../hooks/useAuth.jsx";

export const People = () => {

  const [users, setUsers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [more, setMore] = useState(true);

  useEffect(() => {
    getUsers(1);
  }, []);

  const getUsers = async (nextPage = 1) => {
    setLoading(true);
    // Peticion para sacar usuarios
    const request = await fetch(Global.url + "user/list/" + nextPage, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    });

    // Crear un estado para poder listarlos
    const data = await request.json();

    // Crear un estado para poder listarlos
    if (data.users && data.status == "success") {
      let newUsers = data.users;

      if (users.length >= 1) {
        newUsers = [...users, ...data.users];
      }

      setUsers(newUsers);
      setFollowing(data.user_following);
      setLoading(false);
      console.log(data.user_following);
    }

    // Paginacion termina al poner todo los usuario para quitar boton
    if (users.length >= data.total - data.users.length) {
      setMore(false);
    }
  };


  return (
    <>
      <header className="content__header">
        <h1 className="content__title">Gente</h1>
      </header>

      <UserList 
       users ={users}
       getUsers={getUsers} 
       following={following}
       setFollowing={setFollowing}
       setPage={setPage}
       page={page}
       more={more}
       loading={loading}
       />
      <br />
    </>
  );
};

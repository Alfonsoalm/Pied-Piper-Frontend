import React, { useEffect, useState } from "react";
import { Global } from "../../helpers/Global.jsx";
import { UserList } from "../0_common/UserList.jsx";

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
  
    try {
      const request = await fetch(Global.url + "user/list/" + nextPage, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      });
  
      // Inspecciona el estado de la respuesta
      console.log("Request status:", request.status);
      console.log("Request response type:", request.headers.get("Content-Type"));
  
      // Intenta parsear la respuesta solo si es JSON
      if (request.ok && request.headers.get("Content-Type")?.includes("application/json")) {
        const data = await request.json();
  
        if (data.users && data.status === "success") {
          let newUsers = data.users;
  
          if (users.length >= 1) {
            newUsers = [...users, ...data.users];
          }
  
          setUsers(newUsers);
          setFollowing(data.user_following);
          setLoading(false);
          console.log(data.user_following);
        }
  
        // Paginación: termina si ya no hay más usuarios
        if (users.length >= data.total - data.users.length) {
          setMore(false);
        }
      } else {
        console.error("Error al obtener usuarios, respuesta no es JSON:", request);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
      setLoading(false);
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

import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useParams } from "react-router-dom";
import { Global } from "../../helpers/Global";
import { UserList } from "../user/UserList";
import { GetProfile } from "../../helpers/GetProfile";

export const Followers = () => {

  const [users, setUsers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [more, setMore] = useState(true);
  const [userProfile, setUserProfile] = useState({});
  const params = useParams();

  useEffect(() => {
    getUsers(1);
    GetProfile(params.userId, setUserProfile);
  }, []);

  const getUsers = async (nextPage = 1) => {
    setLoading(true);

    // Sacar userId
    const userId = params.userId;

    // Peticion para sacar usuarios
    const request = await fetch(Global.url + "follow/followers/" + userId +"/"+nextPage, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    });

    // Crear un estado para poder listarlos
    const data = await request.json();

    let cleanUsers = [];

    // Recorrer y limpiar follows para quedarme con followed
    data.follows.forEach(follow =>{
      cleanUsers = [...cleanUsers, follow.user]
    });
    data.users = cleanUsers;

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
        <h1 className="content__title">Seguidores de {userProfile.name}</h1>
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

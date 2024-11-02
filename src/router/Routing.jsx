import React from "react";
import { Routes, Route, BrowserRouter, Navigate, Link } from "react-router-dom";
import { PublicLayout } from "../components/layout/public/PublicLayout.jsx";
import { PrivateLayout } from "../components/layout/private/PrivateLayout.jsx";
import { Login } from "../components/user/Login.jsx";
import { Register } from "../components/user/Register.jsx";
import { Feed } from "../components/publication/Feed.jsx";
import { AuthProvider } from "../context/AuthProvider";
import { Logout } from "../components/user/Logout.jsx";
import { People } from "../components/user/People.jsx";
import { Config } from "../components/user/Config.jsx";
import { Following } from "../components/follow/Following.jsx";
import { Followers } from "../components/follow/Followers.jsx";
import { Profile } from "../components/user/Profile.jsx";
import { ProffesionalRegister } from "../components/user/ProffesionalRegister.jsx";
import { CompanyRegister } from "../components/user/CompanyRegister.jsx";

export const Routing = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<PublicLayout />}>
            <Route index element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Register />} />
            <Route path="/registro/profesional" element={<ProffesionalRegister/>} /> 
            <Route path="/registro/empresa" element={<CompanyRegister />} /> 
          </Route>

          <Route path="/social" element={<PrivateLayout />}>
            <Route index element={<Feed />} />
            <Route path="feed" element={<Feed />} />
            <Route path="registro" element={<Register />} />
            <Route path="logout" element={<Logout />} />
            <Route path="gente" element={<People />} />
            <Route path="ajustes" element={<Config />} />
            <Route path="siguiendo/:userId" element={<Following />} />
            <Route path="seguidores/:userId" element={<Followers />} />
            <Route path="perfil/:userId" element={<Profile />} /> 
          </Route>

          <Route path="*" element={
              <>
                <h1>Error 404</h1>
                <Link to="/">Volver al Inicio</Link>
              </>
            }/>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

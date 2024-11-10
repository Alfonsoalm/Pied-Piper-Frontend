import React from "react";
import { Routes, Route, BrowserRouter, Navigate, Link } from "react-router-dom";
import { PublicLayout } from "../components/layout/PublicLayout.jsx";
import { PrivateLayout } from "../components/layout/PrivateLayout.jsx";
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
import { CompanyRegister } from "../components/user/RegisterCompany.jsx";
import { UserRegister } from "../components/user/RegisterProfess.jsx";
import { Sectors } from "../components/user/Sectors.jsx";
import { Profiles } from "../components/user/Profiles.jsx";
import { Offers } from "../components/user/Offers.jsx";
import { CompanyList } from "../components/user/CompanyList.jsx";
import { ProfessList } from "../components/user/ProfessList.jsx";

export const Routing = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<PublicLayout />}>
            <Route index element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Register />} />
            <Route path="/registro/profesional" element={<UserRegister/>} /> 
            <Route path="/registro/empresa" element={<CompanyRegister />} /> 
          </Route>

          <Route path="/social" element={<PrivateLayout />}>
            <Route index element={<Feed />} />
            <Route path="feed" element={<Feed />} />
            <Route path="sectors" element={<Sectors />} />
            <Route path="sectors/:sector" element={<CompanyList />} />
            <Route path="profiles" element={<Profiles />} />
            <Route path="profiles/:profession" element={<ProfessList />} />
            <Route path="offers" element={<Offers />} />
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

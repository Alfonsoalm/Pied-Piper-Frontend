import React from "react";
import { Routes, Route, BrowserRouter, Link } from "react-router-dom";
import { PublicLayout } from "../components/0_layout/PublicLayout.jsx";
import { PrivateLayout } from "../components/0_layout/PrivateLayout.jsx";
import { Login } from "../components/0_common/Login.jsx";
import { Register } from "../components/0_common/Register.jsx";
import { CompanyRegister } from "../components/1_company/CompanyRegister.jsx";
import { ProfessRegister } from "../components/2_professional/ProfessRegister.jsx";
import { Feed } from "../components/4_publication/Feed.jsx";
import { AuthProvider } from "../context/AuthProvider";
import { People } from "../components/0_common/People.jsx";
import { Config } from "../components/0_common/Config.jsx";
import { Following } from "../components/3_follow/Following.jsx";
import { Followers } from "../components/3_follow/Followers.jsx";
import { ProfessProfiles } from "../components/2_professional/ProfessProfiles.jsx";
import { CompanySectors } from "../components/1_company/CompanySectors.jsx";
import { CompanyList } from "../components/1_company/CompanyList.jsx";
import { ProfessList } from "../components/2_professional/ProfessList.jsx";
import { CompanyProfile } from "../components/1_company/CompanyProfile.jsx";
import { ProfessProfile } from "../components/2_professional/ProfessProfile.jsx";
import { Profile } from "../components/0_common/Profile.jsx";
import { Offers } from "../components/0_common/Offers.jsx";
import { Messages } from "../components/0_common/Messages.jsx";
import { Logout } from "../components/0_common/Logout.jsx";

export const Routing = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<PublicLayout />}>
            <Route index element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Register />} />
            <Route path="/registro/profesional" element={<ProfessRegister/>} /> 
            <Route path="/registro/empresa" element={<CompanyRegister />} /> 
          </Route>

          <Route path="/social" element={<PrivateLayout />}>
            <Route index element={<Feed />} />
            <Route path="feed" element={<Feed />} />

            <Route path="sectors" element={<CompanySectors />} />
            <Route path="sectors/:sector" element={<CompanyList />} />

            <Route path="profiles" element={<ProfessProfiles />} />
            <Route path="profiles/:profession" element={<ProfessList />} />

            <Route path="offers" element={<Offers />} />
            <Route path="messages" element={<Messages />} />
            <Route path="gente" element={<People />} />

            <Route path="perfil/:userId" element={<Profile />} /> 
            <Route path="perfil/empresa/:userId" element={<CompanyProfile />} /> 
            <Route path="perfil/profesional/:userId" element={<ProfessProfile />} /> 

            <Route path="ajustes" element={<Config />} />
            <Route path="siguiendo/:userId" element={<Following />} />
            <Route path="seguidores/:userId" element={<Followers />} />
            <Route path="logout" element={<Logout />} />
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

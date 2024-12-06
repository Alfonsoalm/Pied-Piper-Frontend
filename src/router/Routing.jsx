import * as Imports from './imports';
const { React, BrowserRouter, AuthProvider, Routes, Route, Link, PublicLayout, Login, ForgotPassword, ResetPassword,
  Home, Register,  ProfessRegister, CompanyRegister, VerifiedSuccess, PrivateLayout, Feed, Offers,
  CompanySectors, CompanyList, ProfessProfiles, ProfessList, Messages, MyOffers, People, 
  Profile, CompanyProfile, ProfessProfile, Config, Following, Followers, Logout
 } = Imports;


export const Routing = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<PublicLayout />}>
            <Route index element={<Login />} />
            <Route path="/home" element={<Home />} />◘
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Register />} />
            <Route path="/registro/profesional" element={<ProfessRegister/>} /> 
            <Route path="/registro/empresa" element={<CompanyRegister />} /> 
            <Route path="/verified-success" element={<VerifiedSuccess />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
          </Route>

          <Route path="/social" element={<PrivateLayout />}>
            <Route index element={<Feed />} />
            <Route path="feed" element={<Feed />} />
            <Route path="offers" element={<Offers />} />
            <Route path="sectors" element={<CompanySectors />} />
            <Route path="sectors/:sector" element={<CompanyList />} />
            <Route path="profiles" element={<ProfessProfiles />} />
            <Route path="profiles/:profession" element={<ProfessList />} />
            <Route path="messages" element={<Messages />} />
            <Route path="myOffers" element={<MyOffers />} />
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

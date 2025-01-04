
// Importaciones obligatorias de react
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

// Importar assets 
import './assets/fonts/fontawesome-free-6.1.2-web/css/all.css';
import './assets/css/commons/responsive.css';
import './assets/css/commons/normalize.css';
import './assets/css/commons/layout.css';
import './assets/css/commons/content.css';
import './assets/css/commons/header.css';
import './assets/css/commons/config.css';
import './assets/css/commons/home.css';
import './assets/css/commons/login.css'; 
import './assets/css/commons/messages.css';
import './assets/css/commons/filterSidebar.css';
import "./assets/css/register.css";
import './assets/css/publicLayout.css';
import './assets/css/privateLayout.css';
import './assets/css/sidebar.css';
import './assets/css/profiles.css';
import './assets/css/sectors.css';
import './assets/css/professList.css';
import './assets/css/companyList.css';
import './assets/css/professProfile.css';
import './assets/css/companyProfile.css';
import './assets/css/myOffers.css';

// Cargar configuracion react time ago
import TimeAgo from 'javascript-time-ago'
import es from 'javascript-time-ago/locale/es'

TimeAgo.addDefaultLocale(es);
TimeAgo.addLocale(es);

createRoot(document.getElementById('root')).render(
    <App />
)

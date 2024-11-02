
// Importaciones obligatorias de react
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

// Importar assets 
import './assets/fonts/fontawesome-free-6.1.2-web/css/all.css';
import './assets/css/formRegister.css';
import './assets/css/normalize.css';
import './assets/css/layout.css';
import './assets/css/login.css';
import './assets/css/layoutRegister.css';
import './assets/css/publicLayout.css';
import './assets/css/privateLayout.css';
import './assets/css/content.css';
import './assets/css/header.css';
import './assets/css/navbarPrivate.css';
import './assets/css/navbarPublic.css';
import './assets/css/sidebar&profile.css';

// Cargar configuracion react time ago
import TimeAgo from 'javascript-time-ago'
import es from 'javascript-time-ago/locale/es'

TimeAgo.addDefaultLocale(es);
TimeAgo.addLocale(es);


createRoot(document.getElementById('root')).render(
    <App />
)

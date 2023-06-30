import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import interceptorsService from './services/InterceptorsService';
import './index.css';
import './styles/global.css';
import './styles/dashboardView.css';

interceptorsService.createInterceptors();

const root = ReactDOM.createRoot(document.getElementById('root'));
const isAdmin = process.env.REACT_APP_IS_ADMIN;

if (isAdmin) {
  import("./routes/admin-router").then(({ AdminRouter }) => {
    root.render(<AdminRouter />)
  });
} else {
  import("./routes/user-router").then(({ UserRouter }) => {
    root.render(<UserRouter />)
  });
};

reportWebVitals();

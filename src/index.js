import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import AdminRouter from './routes/AdminRouter';
import UserRouter from './routes/UserRouter';
import { interceptorsService } from './services/InterceptorsService';
import './index.css';
import './styles/global.css';
import './styles/main.css';
import './styles/dashboardView.css';

interceptorsService.createInterceptors();
const root = ReactDOM.createRoot(document.getElementById('root'));
const isAdmin = JSON.parse(process.env.REACT_APP_IS_ADMIN);

if (isAdmin) {
  root.render(<AdminRouter />);
} else {
  root.render(<UserRouter />);
}

reportWebVitals();

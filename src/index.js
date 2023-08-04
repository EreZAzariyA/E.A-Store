import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';
import store from './redux/store';
import { interceptorsService } from './services/InterceptorsService';
import { socketServices } from './services/socket-services';
import './index.css';
import './styles/global.css';
import './styles/main.css';
import './styles/dashboardView.css';

interceptorsService.createInterceptors();
await socketServices.connect();

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

reportWebVitals();

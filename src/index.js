import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { interceptorsService } from './services/InterceptorsService';
import './styles/style.css';
import './styles/global.css';
import './styles/main.css';
import './styles/dashboardView.css';
import socketIo from './services/socket';

interceptorsService.createInterceptors();
socketIo.initSocket();
const root = ReactDOM.createRoot(document.getElementById('root'));
const isAdmin = JSON.parse(process.env?.REACT_APP_IS_ADMIN || "false");


if (isAdmin) {
  import("./routes/AdminRouter").then((AdminRouter) => {
    root.render(AdminRouter.default());
  });
} else {
  import("./routes/UserRouter").then((UserRouter) => {
    root.render(UserRouter.default());
  });
}

reportWebVitals();

import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { interceptorsService } from './services/InterceptorsService';
import './index.css';
import './styles/global.css';
import './styles/main.css';
import './styles/dashboardView.css';

interceptorsService.createInterceptors();
const root = ReactDOM.createRoot(document.getElementById('root'));
const isAdmin = JSON.parse(process.env.REACT_APP_IS_ADMIN);

if (isAdmin) {
  import("./routes/AdminRouter").then(( AdminRouter ) => {
    root.render(AdminRouter.default());
  });
} else {
  import("./routes/UserRouter").then(( UserRouter ) => {
    root.render(UserRouter.default());
  });
}

reportWebVitals();

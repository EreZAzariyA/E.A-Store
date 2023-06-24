import { Navigate, Route, Routes } from "react-router-dom";
import { CategoryPage } from "../../components/category-page";
import { Dashboard } from "../../components/home-page";
import PrivateRoute from "../PrivateRoute";
import { Login } from "../../layout/AuthView/login";
import { Register } from "../../layout/AuthView/register";
import { AuthView } from "../../layout/AuthView";
import { DashboardView } from "../../layout/DashboardView";

export const UserRouter = () => (
  <Routes>

    <Route path="/auth/*" element={<AuthView />}>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="*" element={<Navigate to={'login'} replace />} />
    </Route>

    <Route path="/" element={<PrivateRoute>
        <DashboardView />
      </PrivateRoute>
    }>
      <Route path="/" element={<Dashboard />} />
      <Route path="categories/:category_id/*" element={<CategoryPage />} />
      <Route path="*" element={<Navigate to={'/'} replace />} />
    </Route>
  </Routes>
);

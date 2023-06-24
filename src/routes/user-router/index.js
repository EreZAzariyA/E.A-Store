import { Navigate, Route, Routes } from "react-router-dom";
import { CategoryPage } from "../../components/category-page";
import { Dashboard } from "../../components/home-page";
import { Logout } from "../../layout/AuthView/logout";

export const UserRouter = () => (
  <Routes>
    <Route path="auth/login" element={<Navigate to={{pathname: '/'}} replace />} />

    <Route path="/" element={<Dashboard />} />
    <Route path="categories/:category_id/*" element={<CategoryPage />} />

    <Route path="/logout" element={<Logout />} />
    <Route path="*" element={<p>Page not found</p>} />
  </Routes>
);

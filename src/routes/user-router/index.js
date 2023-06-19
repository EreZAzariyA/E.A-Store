import { Navigate, Route, Routes } from "react-router-dom";
import { CategoryPage } from "../../components/category-page";
import { Dashboard } from "../../components/home-page";

export const UserRouter = () => (
  <Routes>
    <Route path="/auth/login" element={<Navigate to="/home" replace />} />
    
    <Route path="home" element={<Dashboard />} />
    <Route path="categories/:category_id/*" element={<CategoryPage />} />

    <Route path="/" element={<Navigate to="/home" replace />} />
    <Route path="*" element={<p>Page not found</p>} />
  </Routes>
);

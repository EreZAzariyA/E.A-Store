import { Navigate, Route, Routes } from "react-router-dom";
import { CategoryPage } from "../../components/category-page";
import { Dashboard } from "../../components/home-page";
import { DashboardView } from "../../layout/DashboardView";
import { PageNotFound } from "../../components/PageNotFound";

export const UserRouter = () => (
  <Routes>
    <Route path="/" element={<Navigate to={'/home'} replace />} />

    <Route path="/" element={<DashboardView />}>
      <Route path="/home" element={<Dashboard />} />
      <Route path="categories/:category_id/*" element={<CategoryPage />} />

      <Route path="*" element={<PageNotFound />} />
    </Route>
  </Routes>
);

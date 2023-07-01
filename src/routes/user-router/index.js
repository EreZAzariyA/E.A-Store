import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { CategoryPage } from "../../components/category-page";
import { Dashboard } from "../../components/home-page";
import { DashboardView } from "../../layout/DashboardView";
import { PageNotFound } from "../../components/PageNotFound";
import { Provider } from "react-redux";
import { AuthView } from "../../layout/AuthView";
import { UserRoute } from "../UserRoute";
import store from "../../redux/store";

const UserRouter = () => (
  <Routes>
    <Route path="/" element={<Navigate to={'home'} replace />} />

    <Route path="/" element={
      <UserRoute>
        <DashboardView />
      </UserRoute>}
    >
      <Route path="/home" element={<Dashboard />} />
      <Route path="categories/:category_id/*" element={<CategoryPage />} />

      <Route path="page-not-found" element={<PageNotFound />} />
      <Route path="*" element={<Navigate to={'/page-not-found'} />} />
    </Route>

    {/* <Route path="*" element={<Navigate to={'/auth/login'} />} /> */}
  </Routes>
);

export default UserRouter;
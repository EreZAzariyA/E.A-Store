import { Navigate, Route, Routes } from "react-router-dom";
import { AdminLayout } from "../../components/admin/AdminLayout";
import { ProductsList } from "../../components/admin/products-list";
import { AdminDashboard } from "../../components/admin/adminDashboard";
import { CategoriesList } from "../../components/admin/categories-list";
import { AdminInsert } from "../../components/admin/insertDoc";
import { AuthView } from "../../layout/AuthView";
import { AdminRoute } from "../AdminRoute";
import { PageNotFound } from "../../components/PageNotFound";

const AdminRouter = () => (
  <Routes>
    <Route path="/" element={<Navigate to={'/admin/dashboard'} />} />

    <Route path="/admin" element={<AdminRoute>
        <AdminLayout />
      </AdminRoute>}
    >
      <Route path="dashboard" element={<AdminDashboard />} />
      <Route path="all-products" element={<ProductsList />} />
      <Route path="all-categories/*" element={<CategoriesList />} />
      <Route path="insert-doc" element={<AdminInsert />} />
      <Route path="page-not-found" element={<PageNotFound />} />

      <Route path="/admin" element={<Navigate to={'dashboard'} replace />} />
      <Route path="*" element={<Navigate to={'page-not-found'} replace />} />
    </Route>

    <Route path="auth/*" element={<AuthView />} />
    <Route path="*" element={<Navigate to={'/auth/login'} />} />
  </Routes>
);

export default AdminRouter;
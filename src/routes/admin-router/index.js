import { Navigate, Route, Routes } from "react-router-dom";
import { AdminLayout } from "../../components/admin/AdminLayout";
import { ProductsList } from "../../components/admin/products-list";
import { AdminDashboard } from "../../components/admin/adminDashboard";
import { CategoriesList } from "../../components/admin/categories-list";
import { AdminInsert } from "../../components/admin/insertDoc";

export const AdminRouter = () => (
  <Routes>
    <Route path="/" element={<Navigate to={'/admin/dashboard'} replace />} />

    <Route path="/*" element={<AdminLayout />}>
      <Route path="dashboard" element={<AdminDashboard />} />
      <Route path="all-products" element={<ProductsList />} />
      <Route path="all-categories/*" element={<CategoriesList />} />
      {/* <Route path="all-categories/:category_id" element={<CategoriesList  />} /> */}
      <Route path="insert-doc" element={<AdminInsert />} />

      <Route path="*" element={<p>Page not found</p>} />
    </Route>

    
  </Routes>
);

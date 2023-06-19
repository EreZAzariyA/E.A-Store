import { Navigate, Route, Routes } from "react-router-dom";
import { AdminLayout } from "../../components/admin/AdminLayout";
import { ProductsList } from "../../components/admin/products-list";
import { Logout } from "../../components/auth/logout";
import { AdminDashboard } from "../../components/admin/AdminDashboard";
import { CategoriesList } from "../../components/admin/categories-list";
import { AdminInsert } from "../../components/admin/insertDoc";

export const AdminRouter = () => (
  <Routes>
    <Route path="admin/*" element={<AdminLayout />}/>

    <Route path="dashboard" element={<AdminDashboard />} />
    <Route path="all-products" element={<ProductsList />} />
    <Route path="all-categories/*" element={<CategoriesList />} />
    <Route path="insert-doc" element={<AdminInsert />} />
    
    <Route path="logout" element={<Logout />} />
    <Route path="/" element={<Navigate to={'/admin'} replace />} />
    <Route path="*" element={<p>Page not found</p>} />
  </Routes>
);

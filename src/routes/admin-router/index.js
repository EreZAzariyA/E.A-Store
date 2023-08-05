import { Navigate, Route, Routes } from "react-router-dom";
import { AdminLayout } from "../../components/admin/AdminLayout";
import { AdminDashboard } from "../../components/admin/admin-dashboard";
import { PageNotFound } from "../../components/components/PageNotFound";
import { ProductsTable } from "../../components/admin/admin-products";
import { CategoriesTable } from "../../components/admin/admin-categories";
import { SubCategoriesTable } from "../../components/admin/admin-subCategories";
import { UploadImage } from "../../components/admin/components/UploadImage";

const AdminRouter = () => (
  <Routes>
    <Route path="/" element={<Navigate to={'/admin/dashboard'} replace />} />

    <Route path="/" element={<AdminLayout />}>
      <Route path="dashboard" element={<AdminDashboard />} />
      <Route path="products" element={<ProductsTable />} />
      <Route path="categories" element={<CategoriesTable />} />
      <Route path="sub-categories" element={<SubCategoriesTable />} />
      <Route path="upload-image" element={<UploadImage />} />

      <Route path="page-not-found" element={<PageNotFound />} />
      <Route path="*" element={<Navigate to={'page-not-found'} replace />} />
    </Route>
  </Routes>
);

export default AdminRouter;
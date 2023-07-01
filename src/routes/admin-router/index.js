import { Navigate, Route, Routes } from "react-router-dom";
import { AdminLayout } from "../../components/admin/AdminLayout";
import { AdminDashboard } from "../../components/admin/adminDashboard";
import { AdminInsert } from "../../components/admin/insertDoc";
import { PageNotFound } from "../../components/PageNotFound";
import { AdminTables } from "../../components/admin/adminTables";

const AdminRouter = () => (
  <Routes>
    <Route path="/" element={<Navigate to={'/admin/dashboard'} replace />} />

    <Route path="/" element={<AdminLayout />}>
      <Route path="dashboard" element={<AdminDashboard />} />
      <Route path="tables" element={<AdminTables />} />
      {/* <Route path="all-products" element={<ProductsList />} />
      <Route path="all-categories/*" element={<CategoriesList />} /> */}
      <Route path="insert-doc" element={<AdminInsert />} />
      <Route path="page-not-found" element={<PageNotFound />} />

      <Route path="*" element={<Navigate to={'page-not-found'} replace />} />
    </Route>
  </Routes>
);

export default AdminRouter;
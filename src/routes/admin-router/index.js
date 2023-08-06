import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AdminLayout } from "../../components/admin/AdminLayout";
import { AdminDashboard } from "../../components/admin/admin-dashboard";
import { PageNotFound } from "../../components/components/PageNotFound";
import { ProductsTable } from "../../components/admin/admin-products";
import { CategoriesTable } from "../../components/admin/admin-categories";
import { SubCategoriesTable } from "../../components/admin/admin-subCategories";
import { UploadImage } from "../../components/admin/components/UploadImage";
import { Provider } from "react-redux";
import { PublicRoute } from "../PublicRoute";
import { AuthView } from "../../layout/AuthView";
import { Login } from "../../layout/AuthView/login";
import { Register } from "../../layout/AuthView/register";
import store from "../../redux/store";
import { AdminRoute } from "../AdminRoute";

const AdminRouter = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<Navigate to={'/admin'} replace />} />

          <Route path="admin" element={<AdminRoute><AdminLayout /></AdminRoute>}>
            <Route path="/admin" element={<Navigate to={'dashboard'} replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="products" element={<ProductsTable />} />
            <Route path="categories" element={<CategoriesTable />} />
            <Route path="sub-categories" element={<SubCategoriesTable />} />
            <Route path="upload-image" element={<UploadImage />} />
            <Route path="page-not-found" element={<PageNotFound />} />
            <Route path="*" element={<Navigate to={'page-not-found'} replace />} />
          </Route>

          <Route path="/auth" element={<PublicRoute><AuthView /></PublicRoute>}>
            <Route path="/auth" element={<Navigate to={'login'} replace />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="page-not-found" element={<PageNotFound />} />
            <Route path="*" element={<Navigate to={'page-not-found'} replace />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default AdminRouter;
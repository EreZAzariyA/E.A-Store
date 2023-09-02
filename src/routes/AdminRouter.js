import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { AdminRoute } from "./admin-router";
import { AdminLayout } from "../components/admin/AdminLayout";
import { AdminDashboard } from "../components/admin/admin-dashboard";
import { ProductsTable } from "../components/admin/admin-products";
import { CategoriesTable } from "../components/admin/admin-categories";
import { SubCategoriesTable } from "../components/admin/admin-subCategories";
import { UploadImage } from "../components/admin/components/UploadImage";
import { PageNotFound } from "../components/components/PageNotFound";

import { PublicRoute } from "./public-router";
import { AuthView } from "../layout/AuthView";
import { Login } from "../layout/AuthView/login";
import { Register } from "../layout/AuthView/register";
import store from "../redux/store";
import { Orders } from "../components/admin/orders";

const AdminRouter = () => (
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
          <Route path="orders" element={<Orders />} />
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

export default AdminRouter;
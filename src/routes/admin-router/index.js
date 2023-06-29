import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AdminLayout } from "../../components/admin/AdminLayout";
import { ProductsList } from "../../components/admin/products-list";
import { AdminDashboard } from "../../components/admin/adminDashboard";
import { CategoriesList } from "../../components/admin/categories-list";
import { AdminInsert } from "../../components/admin/insertDoc";
import { Provider } from "react-redux";
import { Login } from "../../layout/AuthView/login";
import { AuthView } from "../../layout/AuthView";
import { Register } from "../../layout/AuthView/register";
import { AdminRoute } from "../AdminRoute";
import { PageNotFound } from "../../components/PageNotFound";
import store from "../../redux/store";

export const AdminRouter = () => (
  <BrowserRouter>
    <Provider store={store}>
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

        <Route path="/auth" element={<AuthView />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="page-not-found" element={<PageNotFound />} />

          <Route path="/auth" element={<Navigate to={'login'} />} />
          <Route path="*" element={<Navigate to={'page-not-found'} />} />
        </Route>

        <Route path="*" element={<Navigate to={'/auth/login'} />} />
      </Routes>
    </Provider>
  </BrowserRouter>
);
;

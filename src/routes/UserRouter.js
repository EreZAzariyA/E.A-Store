import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { Dashboard } from "../components/home-page";
import { DashboardView } from "../layout/DashboardView";
import { UserCart } from "../components/user-cart";
import { Favorites } from "../components/favorites";
import { ProductPage } from "../components/product-page";
import { CategoryPage } from "../components/categories/category-page";
import { CategoriesPage } from "../components/categories";
import { SubCategoryPage } from "../components/subCategory-page";

import { PublicRoute } from "./public-router";
import { AuthView } from "../layout/AuthView";
import { Login } from "../layout/AuthView/login";
import { Register } from "../layout/AuthView/register";
import { PageNotFound } from "../components/components/PageNotFound";
import store from "../redux/store";
import { UserRoute } from "./user-router/index.js";
import { UserOrders } from "../components/user-orders/index.js";

const UserRouter = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Routes>

        <Route element={<DashboardView />}>
          <Route path="/" element={<Navigate to={'home'} replace />} />
          <Route path="home" element={<Dashboard />} />
          <Route path="my-favorites" element={<Favorites />} />
          <Route path="categories" element={<CategoriesPage />} />
          <Route path="categories/:category_id" element={<CategoryPage />} />
          <Route path="categories/:category_id/sub-category" element={<p>SubCategoryPage</p>} />
          <Route path="categories/:category_id/sub-category/:subCategoryId" element={<SubCategoryPage /> } />
          <Route path="categories/:category_id/sub-category/:subCategoryId/product/:product_id" element={<ProductPage /> } />

          <Route path="my-cart" element={<UserRoute><UserCart /></UserRoute>} />
          <Route path="my-orders" element={<UserRoute><UserOrders /></UserRoute>} />

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

export default UserRouter;
import { Navigate, Route, Routes } from "react-router-dom";
import { CategoryPage } from "../../components/category-page";
import { Dashboard } from "../../components/home-page";
import { UserCart } from "../../components/user-cart";
import { Favorites } from "../../components/favorites";
import { DashboardView } from "../../layout/DashboardView";
import { PageNotFound } from "../../components/PageNotFound";
import { ProductPage } from "../../components/product-page";
import { SubCategoryPage } from "../../components/subCategory-page";

const UserRouter = () => (
  <Routes>
    <Route path="/" element={<Navigate to={'home'} replace />} />

    <Route path="/" element={<DashboardView />}>
      <Route path="home" element={<Dashboard />} />
      <Route path="my-favorites" element={<Favorites />} />
      <Route path="my-cart" element={<UserCart />} />
      <Route path="categories" element={<p>categories</p>} />
      <Route path="categories/:category_id" element={<CategoryPage />} />
      <Route path="categories/:category_id/sub-category" element={<p>SubCategoryPage</p>} />
      <Route path="categories/:category_id/sub-category/:subCategoryId" element={<SubCategoryPage /> } />
      <Route path="categories/:category_id/sub-category/:subCategoryId/product/:product_id" element={<ProductPage /> } />

      <Route path="page-not-found" element={<PageNotFound />} />
      <Route path="*" element={<Navigate to={'/page-not-found'} />} />
    </Route>

  </Routes>
);

export default UserRouter;
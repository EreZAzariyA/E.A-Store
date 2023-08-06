import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { CategoryPage } from "../../components/categories/category-page";
import { Dashboard } from "../../components/home-page";
import { UserCart } from "../../components/user-cart";
import { Favorites } from "../../components/favorites";
import { DashboardView } from "../../layout/DashboardView";
import { ProductPage } from "../../components/product-page";
import { SubCategoryPage } from "../../components/subCategory-page";
import { CategoriesPage } from "../../components/categories";
import { Provider, useSelector } from "react-redux";
import { PageNotFound } from "../../components/components/PageNotFound";
import store from "../../redux/store";
import { useEffect, useState } from "react";
import { UserRoute } from "../UserRoute";
import { AuthView } from "../../layout/AuthView";
import { Login } from "../../layout/AuthView/login";
import { Register } from "../../layout/AuthView/register";
import { PublicRoute } from "../PublicRoute";

const UserRouter = () => {
  const [ user, setUser ] = useState(null);

  useEffect(() => {
    const user = store.getState().auth?.user;
    if (user) {
      setUser(user);
    }

    const unsubscribe = store.subscribe(() => {
      const user = store.getState().auth?.user;
      if (user) {
        setUser(user);
      }
    });

    return () => unsubscribe();
  }, []);


  return (
    <Provider store={store}>
      <BrowserRouter>

        <Routes>

          <Route path="/" element={<UserRoute><DashboardView /></UserRoute>}>
            <Route path="*" element={<Navigate to={'home'} replace />} />

            <Route path="home" element={<Dashboard />} />
            <Route path="my-favorites" element={<Favorites />} />
            <Route path="my-cart" element={<UserCart />} />
            <Route path="categories" element={<CategoriesPage />} />
            <Route path="categories/:category_id" element={<CategoryPage />} />
            <Route path="categories/:category_id/sub-category" element={<p>SubCategoryPage</p>} />
            <Route path="categories/:category_id/sub-category/:subCategoryId" element={<SubCategoryPage /> } />
            <Route path="categories/:category_id/sub-category/:subCategoryId/product/:product_id" element={<ProductPage /> } />
          </Route>


          <Route path="/auth" element={<PublicRoute><AuthView /></PublicRoute>}>
            <Route path="*" element={<Navigate to={'login'} replace />} />

            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />

          </Route>


            <Route path="*" element={<Navigate to={'page-not-found'} />} />
          <Route path="page-not-found" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default UserRouter;
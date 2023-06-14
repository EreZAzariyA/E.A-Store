import { Route, Routes } from "react-router-dom";
import { CategoryPage } from "../components/categoryPage";
import { Home } from "../components/home";
import { AddProduct } from "../components/admin/add-product";
import { AddCategory } from "../components/admin/add-category";

export const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="categories/:category_id/*" element={<CategoryPage />}/>
      <Route path="/add-product" element={<AddProduct />}/>
      <Route path="/add-category" element={<AddCategory />}/>
    </Routes>
  )
};
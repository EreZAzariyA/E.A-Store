import { Navigate, Route, Routes } from "react-router-dom";
import { Login } from "./login";
import { Register } from "./register";
import { PageNotFound } from "../../components/PageNotFound";


export const AuthRoutes = () => (
  <Routes>
    <Route path="login" element={<Login />} />
    <Route path="register" element={<Register />} />
    <Route path="page-not-found" element={<PageNotFound />} />

    <Route path="/auth" element={<Navigate to={'/login'} />} />
    <Route path="*" element={<Navigate to={'page-not-found'} />} />
  </Routes>
);
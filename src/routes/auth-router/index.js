import { Routes, Route, Navigate } from "react-router-dom";
import { Login } from "../../components/auth/login";
import { Register } from "../../components/auth/register";


export const AuthRouter = () => (
  <Routes>
    <Route path="auth/login" element={<Login />} />
    <Route path="auth/register" element={<Register />} />
  
    <Route path="/" element={<Navigate to={'/auth'} />} />
    <Route path="*" element={<Navigate to={'/auth/login'} />} />
  </Routes>
);
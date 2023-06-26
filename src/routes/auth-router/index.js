import { Navigate, Route, Routes } from "react-router-dom";
import { Login } from "../../layout/AuthView/login";
import { Register } from "../../layout/AuthView/register";
import { AuthView } from "../../layout/AuthView";
import { PageNotFound } from "../../components/PageNotFound";

export const AuthRouter = () => (
  <Routes>
    <Route path="/" element={<AuthView />}>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="auth/" element={<Navigate to={'login'} replace />} />
      <Route path="*" element={<PageNotFound />} />
    </Route>
  </Routes>
);

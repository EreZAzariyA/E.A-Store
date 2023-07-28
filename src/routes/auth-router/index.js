import { Navigate, Route, Routes } from "react-router-dom";
import { Login } from "../../layout/AuthView/login";
import { Register } from "../../layout/AuthView/register";
import { AuthView } from "../../layout/AuthView";
import { PageNotFound } from "../../components/PageNotFound";

const AuthRouter = () => (
  <Routes>
    <Route path="/" element={<Navigate to={'auth/login'} replace />} />

    <Route path="/" element={<AuthView />}>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />

      <Route path="page-not-found" element={<PageNotFound />} />
      <Route path="*" element={<Navigate to={'page-not-found'} />} />
    </Route>

    <Route path="*" element={<Navigate to={'auth/login'} />} />
  </Routes>
);

export default AuthRouter;
import { Route, Routes } from "react-router";
import { UserRoute } from "./routes/UserRoute";
import { AdminRoute } from "./routes/AdminRoute";
import { PublicRoute } from "./routes/PublicRoute";
import UserRouter from "./routes/user-router";
import AdminRouter from "./routes/admin-router";
import AuthRouter from "./routes/auth-router";

export const App = () => {
  return (
    <Routes>
      <Route path="/*" element={
        <UserRoute>
          <UserRouter />
        </UserRoute>
      }/>

      <Route path="admin/*" element={
        <AdminRoute>
          <AdminRouter />
        </AdminRoute>
      }/>

      <Route path="auth/*" element={
        <PublicRoute>
          <AuthRouter />
        </PublicRoute>
      }/>
    </Routes>
  );
};


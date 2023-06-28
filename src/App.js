import { AdminRouter } from "./routes/admin-router";
import { Route, Routes } from "react-router-dom";
import { UserRouter } from "./routes/user-router";
import AdminRoute from "./routes/AdminRoute";
import { AuthRouter } from "./routes/auth-router";
import PrivateRoute from "./routes/PrivateRoute";
import { PublicRoute } from "./routes/PublicRoute";

export const App = () => {
  return (
    <Routes>
      <Route path="/*" element={
        <PrivateRoute>
          <UserRouter />
        </PrivateRoute>
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

import { useSelector } from "react-redux";
import { isAdmin } from "./utils/helpers";
import { Suspense, lazy } from "react";
import { Spin } from "antd";

export const App = () => {
  const user = useSelector((state) => state.auth?.user);

  if (user) {

    if (isAdmin(user)) {
      const AdminRouter = lazy(() => import('./routes/admin-router'));
      return (
        <Suspense fallback={<Spin />}>
          <AdminRouter />
        </Suspense>
      );
    };

    const UserRouter = lazy(() => import('./routes/user-router'));
    return (
      <Suspense fallback={<Spin />}>
        <UserRouter />
      </Suspense>
    );
  };

  const AuthRouter = lazy(() => import('./routes/auth-router'));
  return (
    <Suspense fallback={<Spin />}>
      <AuthRouter />
    </Suspense>
  );
};

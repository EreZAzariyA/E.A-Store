import { useSelector } from "react-redux";
import { AdminRouter } from "./routes/admin-router";
import { isAdmin } from "./utils/helpers";
import { DashboardView } from "./layout/DashboardView";
import { AuthView } from "./layout/AuthView";

export const App = () => {
  const user = useSelector((state) => (state.authReducer?.user));

  if (user) {
    if (isAdmin(user)) {
      return <AdminRouter />;
    };
    return <DashboardView />;
  };
  return <AuthView />;
};

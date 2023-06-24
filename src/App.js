import { AdminRouter } from "./routes/admin-router";
import { Route, Routes } from "react-router-dom";
import { UserRouter } from "./routes/user-router";
import AdminRoute from "./routes/AdminRoute";

export const App = () => {
  return (
    <Routes>
      <Route path="/*" element={<UserRouter />}/>

      <Route path="/admin/*" element={
        <AdminRoute>
          <AdminRouter />
        </AdminRoute> 
      }/>
    </Routes>
  );
};

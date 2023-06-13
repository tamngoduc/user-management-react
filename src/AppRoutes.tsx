import { Routes, Route } from "react-router-dom";
import MainTemplate from "./template/MainTemplate";
import UserList from "./pages/UserList";
import UserDetail from "./pages/UserDetail";
import AuthTemplate from "./template/AuthTemplate";
import Login from "./pages/Login";
import Register from "./pages/Register";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainTemplate />}>
        <Route index element={<UserList />} />
        <Route path=":userId" element={<UserDetail />} />
      </Route>

      <Route element={<AuthTemplate />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;

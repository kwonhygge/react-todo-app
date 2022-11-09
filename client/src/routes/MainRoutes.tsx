import { Route, Routes } from "react-router-dom";
import { TodoList, Login, SignUp, Main, Logout } from "@/pages/index";

function MainRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/todo/list" element={<TodoList />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/signup" element={<SignUp />} />
        <Route path="/auth/logout" element={<Logout />} />
      </Routes>
    </>
  );
}

export default MainRoutes;

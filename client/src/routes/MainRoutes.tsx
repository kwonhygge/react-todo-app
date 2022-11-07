import { Route, Routes } from "react-router-dom";
import { TodoList, TodoDetail, Login, SignUp, Main } from "@/pages/index";

function MainRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/todo/list" element={<TodoList />} />
        <Route path="/todo/list/:id" element={<TodoDetail />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/signup" element={<SignUp />} />
      </Routes>
    </>
  );
}

export default MainRoutes;

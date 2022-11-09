import { Route, Routes } from "react-router-dom";
import { TodoList, Login, SignUp, Main, Logout } from "@/pages/index";
import {
  LOGIN_URL,
  LOGOUT_URL,
  MAIN_URL,
  SIGN_UP_URL,
  TODO_LIST_URL,
} from "@/constants/index";

function MainRoutes() {
  return (
    <>
      <Routes>
        <Route path={MAIN_URL} element={<Main />} />
        <Route path={TODO_LIST_URL} element={<TodoList />} />
        <Route path={LOGIN_URL} element={<Login />} />
        <Route path={SIGN_UP_URL} element={<SignUp />} />
        <Route path={LOGOUT_URL} element={<Logout />} />
      </Routes>
    </>
  );
}

export default MainRoutes;

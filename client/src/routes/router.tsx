import { createBrowserRouter } from "react-router-dom";
import { TodoList, Login, SignUp, ErrorPage } from "@/pages/index";
import {
  LOGIN_URL,
  LOGOUT_URL,
  MAIN_URL,
  SIGN_UP_URL,
  TODO_DETAIL_URL,
  TODO_EDIT_DETAIL_URL,
  TODO_LIST_URL,
} from "@/constants/index";
import Detail from "@/pages/todo/Detail";
import { todoListLoader, logoutLoader, mainLoader } from "@/routes/index";
import Edit from "@/pages/todo/Edit";
import Root from "@/pages/Root";

const router = createBrowserRouter([
  {
    path: MAIN_URL,
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, loader: mainLoader },
      {
        path: LOGOUT_URL,
        loader: logoutLoader,
      },
      {
        path: LOGIN_URL,
        element: <Login />,
      },
      {
        path: SIGN_UP_URL,
        element: <SignUp />,
      },
      {
        path: TODO_LIST_URL,
        element: <TodoList />,
        loader: todoListLoader,
        children: [
          {
            path: TODO_DETAIL_URL,
            element: <Detail />,
          },
          {
            path: TODO_EDIT_DETAIL_URL,
            element: <Edit />,
          },
        ],
      },
    ],
  },
]);

export default router;

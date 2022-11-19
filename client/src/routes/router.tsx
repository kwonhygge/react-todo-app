import { createBrowserRouter } from "react-router-dom";
import {
  TodoList,
  Login,
  SignUp,
  ErrorPage,
  Edit,
  Detail,
  Delete,
  Root,
} from "@/pages/index";
import {
  LOGIN_URL,
  LOGOUT_URL,
  MAIN_URL,
  SIGN_UP_URL,
  TODO_DELETE_DETAIL_URL,
  TODO_DETAIL_URL,
  TODO_EDIT_DETAIL_URL,
  TODO_LIST_URL,
} from "@/constants/index";
import { todoListLoader, logoutLoader, mainLoader } from "@/routes/index";

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
            children: [
              {
                path: TODO_DELETE_DETAIL_URL,
                element: <Delete />,
              },
            ],
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

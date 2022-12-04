import { createBrowserRouter } from "react-router-dom";
import { Login, SignUp, ErrorPage, Root, TodoIndex } from "@/pages/index";
import { Create, Edit, Detail, Delete } from "@/components/index";
import {
  LOGIN_URL,
  LOGOUT_URL,
  MAIN_URL,
  SIGN_UP_URL,
  TODO_CREATE_URL,
  TODO_DELETE_DETAIL_URL,
  TODO_DETAIL_URL,
  TODO_EDIT_DETAIL_URL,
  TODO_LIST_URL,
} from "@/constants/index";
import { todoListLoader, logoutLoader, mainLoader } from "@/routes/index";
import { Skeleton } from "@mui/material";
import React from "react";

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
        element: <TodoIndex />,
        loader: todoListLoader,
        children: [
          { path: TODO_CREATE_URL, element: <Create /> },
          {
            path: TODO_DETAIL_URL,
            element: (
              <React.Suspense
                fallback={
                  <Skeleton variant="rectangular" width={300} height={220} />
                }
              >
                <Detail />
              </React.Suspense>
            ),
            children: [
              {
                path: TODO_DELETE_DETAIL_URL,
                element: <Delete />,
              },
              {
                path: TODO_EDIT_DETAIL_URL,
                element: <Edit />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

export default router;

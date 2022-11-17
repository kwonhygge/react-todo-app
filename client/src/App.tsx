import React from "react";
import GlobalStyle from "@/styles/GlobalStyle";
import { Snackbar } from "@mui/material";
import { useRecoilState } from "recoil";
import { snackbarProps } from "@/atoms/snackbar";
import { RouterProvider } from "react-router-dom";
import router from "@/routes/router";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

function App() {
  const [snackbarPropsState, setSnackbarProps] = useRecoilState(snackbarProps);

  return (
    <>
      <GlobalStyle />
      <Snackbar
        {...snackbarPropsState}
        autoHideDuration={4000}
        onClose={() => setSnackbarProps((prev) => ({ ...prev, open: false }))}
      />
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} position={"bottom-right"} />
    </>
  );
}

export default App;

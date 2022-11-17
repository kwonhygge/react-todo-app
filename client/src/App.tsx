import React from "react";
import MainRoutes from "@/routes/MainRoutes";
import GlobalStyle from "@/styles/GlobalStyle";
import { Snackbar } from "@mui/material";
import { useRecoilState } from "recoil";
import { snackbarProps } from "@/atoms/snackbar";

function App() {
  const [snackbarPropsState, setSnackbarProps] = useRecoilState(snackbarProps);

  return (
    <>
      <GlobalStyle />
      <MainRoutes />
      <Snackbar
        {...snackbarPropsState}
        autoHideDuration={4000}
        onClose={() => setSnackbarProps((prev) => ({ ...prev, open: false }))}
      />
    </>
  );
}

export default App;

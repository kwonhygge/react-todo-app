import { atom } from "recoil";
import { SnackbarProps } from "@mui/material";

export const snackbarProps = atom<SnackbarProps>({
  key: "snackbarProps",
  default: {},
});

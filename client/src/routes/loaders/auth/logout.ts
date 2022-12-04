import { TOKEN } from "@/constants/common";
import { redirect } from "react-router-dom";
import { MAIN_URL } from "@/constants/url";

export const logoutLoader = () => {
  const token = localStorage.getItem(TOKEN);

  if (!!token) {
    localStorage.removeItem(TOKEN);
  }

  return redirect(MAIN_URL);
};

import { TOKEN } from "@/constants/common";
import { redirect } from "react-router-dom";
import { LOGIN_URL } from "@/constants/url";

export const todoListLoader = () => {
  const token = localStorage.getItem(TOKEN);

  if (!token) {
    return redirect(LOGIN_URL);
  }
};

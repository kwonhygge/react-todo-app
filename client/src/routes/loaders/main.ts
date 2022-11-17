import { TOKEN } from "@/constants/common";
import { LOGIN_URL, TODO_LIST_URL } from "@/constants/url";
import { redirect } from "react-router-dom";

export const mainLoader = () => {
  const token = localStorage.getItem(TOKEN);

  if (!token) {
    return redirect(LOGIN_URL);
  } else {
    return redirect(TODO_LIST_URL);
  }
};

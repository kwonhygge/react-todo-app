import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { TOKEN } from "@/constants/common";
import { LOGIN_URL, TODO_LIST_URL } from "@/constants/index";

function Main() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem(TOKEN);

    if (!token) {
      navigate(LOGIN_URL);
    } else {
      navigate(TODO_LIST_URL);
    }
  }, []);

  return <></>;
}

export default Main;

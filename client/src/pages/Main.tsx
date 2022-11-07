import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { TOKEN } from "@/constants/common";

function Main() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem(TOKEN);

    if (!token) {
      navigate("/auth/login");
    } else {
      navigate("/todo/list");
    }
  }, []);

  return <></>;
}

export default Main;

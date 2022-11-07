import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { TOKEN } from "@/constants/common";

function Detail() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem(TOKEN);

    if (!token) {
      navigate("/auth/login");
    }
  }, []);

  return <>detail</>;
}

export default Detail;

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TOKEN } from "@/constants/common";

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem(TOKEN);

    if (!!token) {
      localStorage.removeItem(TOKEN);
      navigate("/");
    }
  }, []);

  return <></>;
}

export default Logout;
